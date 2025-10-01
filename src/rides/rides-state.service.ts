import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RideStatus } from '@prisma/client';

export interface UserRideState {
  hasActiveRide: boolean;
  activeRideId?: string;
  rideStatus?: RideStatus;
  lastActivity: Date;
  // Driver-specific fields (when user is a driver)
  isOnline?: boolean;
  isAvailable?: boolean;
  isActiveTrip?: boolean;
  currentLatitude?: number;
  currentLongitude?: number;
  lastLocationUpdate?: Date;
  userType?: 'passenger' | 'driver' | 'both';
}

@Injectable()
export class RidesStateService {
  private readonly logger = new Logger(RidesStateService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get comprehensive ride state for a user (passenger or driver)
   * Automatically triggers cleanup for old rides
   */
  async getUserRideState(userId: string): Promise<UserRideState> {
    // Auto-cleanup on every state check - proactive approach
    await this.cleanupOrphanedRides(userId);
    try {
      // Find passenger
      const passenger = await this.prisma.passenger.findUnique({
        where: { userId },
      });

      // Find driver
      const driver = await this.prisma.driver.findUnique({
        where: { userId },
      });

      let activeRide: any = null;

      // Check passenger rides
      if (passenger) {
        activeRide = await this.prisma.ride.findFirst({
          where: {
            passengerId: passenger.id,
            status: {
              in: [RideStatus.REQUESTED, RideStatus.ACCEPTED, RideStatus.IN_PROGRESS],
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      }

      // Check driver rides if no passenger ride found
      if (!activeRide && driver) {
        activeRide = await this.prisma.ride.findFirst({
          where: {
            driverId: driver.id,
            status: {
              in: [RideStatus.ACCEPTED, RideStatus.IN_PROGRESS],
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      }

      // Determine user type
      let userType: 'passenger' | 'driver' | 'both' = 'passenger';
      if (driver && passenger) {
        userType = 'both';
      } else if (driver) {
        userType = 'driver';
      }

      // Base response
      const response: UserRideState = {
        hasActiveRide: !!activeRide,
        activeRideId: activeRide?.id,
        rideStatus: activeRide?.status,
        lastActivity: activeRide?.createdAt || new Date(),
        userType,
      };

      // Add driver-specific fields if user is a driver
      if (driver) {
        response.isOnline = driver.isOnline;
        response.isAvailable = driver.isAvailable;
        response.isActiveTrip = driver.isActiveTrip;
        response.currentLatitude = driver.currentLatitude || undefined;
        response.currentLongitude = driver.currentLongitude || undefined;
        response.lastLocationUpdate = driver.lastLocationUpdate || undefined;
      }

      return response;
    } catch (error) {
      this.logger.error('Error getting user ride state:', error);
      return {
        hasActiveRide: false,
        lastActivity: new Date(),
        userType: 'passenger',
      };
    }
  }

  /**
   * Cleanup orphaned rides with proper cascade deletion
   */
  async cleanupOrphanedRides(userId: string): Promise<{
    cleaned: number;
    details: string[];
  }> {
    try {
      const passenger = await this.prisma.passenger.findUnique({
        where: { userId },
      });

      const driver = await this.prisma.driver.findUnique({
        where: { userId },
      });

      if (!passenger && !driver) {
        return { cleaned: 0, details: ['User is neither a passenger nor a driver'] };
      }

      const now = new Date();
      const requestedCutoff = new Date(now.getTime() - 15 * 60 * 1000); // 15 minutos - tempo adequado para drivers responderem
      const acceptedCutoff = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes - more aggressive

      // Find orphaned rides for both passenger and driver
      const orphanedRidesConditions: any[] = [];

      if (passenger) {
        orphanedRidesConditions.push({
          passengerId: passenger.id,
          OR: [
            {
              status: RideStatus.REQUESTED,
              createdAt: { lt: requestedCutoff },
            },
            {
              status: RideStatus.ACCEPTED,
              createdAt: { lt: acceptedCutoff },
            },
          ],
        });
      }

      if (driver) {
        orphanedRidesConditions.push({
          driverId: driver.id,
          status: RideStatus.ACCEPTED,
          createdAt: { lt: acceptedCutoff },
        });
      }

      const orphanedRides = orphanedRidesConditions.length > 0
        ? await this.prisma.ride.findMany({
            where: { OR: orphanedRidesConditions },
          })
        : [];

      if (orphanedRides.length === 0) {
        return { cleaned: 0, details: ['No orphaned rides found'] };
      }

      const details: string[] = [];
      let cleaned = 0;

      // Clean up each ride in transaction
      for (const ride of orphanedRides) {
        try {
          // CORREÇÃO: Tentar primeira abordagem com transação completa
          let transactionSuccess = false;
          try {
            await this.prisma.$transaction(async (tx) => {
              const rideId = ride.id;

              // Delete payments first (these always exist)
              await tx.payment.deleteMany({
                where: { rideId },
              });

              // Delete ride status history
              await tx.rideStatusHistory.deleteMany({
                where: { rideId },
              });

              // Delete the ride
              await tx.ride.delete({
                where: { id: rideId },
              });
            });
            transactionSuccess = true;
          } catch (transactionError: any) {
            this.logger.warn(`Transaction approach failed for ride ${ride.id}, trying direct deletion:`, transactionError.message);

            // FALLBACK: Tentar deletar diretamente sem transação
            try {
              // Delete payments first
              await this.prisma.payment.deleteMany({
                where: { rideId: ride.id },
              });

              // Delete ride status history
              await this.prisma.rideStatusHistory.deleteMany({
                where: { rideId: ride.id },
              });

              // Delete the ride
              await this.prisma.ride.delete({
                where: { id: ride.id },
              });

              transactionSuccess = true;
            } catch (directError: any) {
              throw new Error(`Both transaction and direct deletion failed: ${directError.message}`);
            }
          }

          if (transactionSuccess) {
            cleaned++;
            details.push(
              `Cleaned ride ${ride.id} (${ride.status}, age: ${Math.floor(
                (now.getTime() - ride.createdAt.getTime()) / 60000,
              )}min)`,
            );
          }
        } catch (error) {
          this.logger.error(`Error cleaning ride ${ride.id}:`, error);
          details.push(`Failed to clean ride ${ride.id}: ${error.message}`);
        }
      }

      this.logger.log(`Cleaned ${cleaned} orphaned rides for user ${userId}`);
      return { cleaned, details };
    } catch (error) {
      this.logger.error('Error in cleanup process:', error);
      return { cleaned: 0, details: [`Cleanup failed: ${error.message}`] };
    }
  }

  /**
   * Force reset user ride state (emergency cleanup)
   */
  async forceResetUserState(userId: string): Promise<{
    success: boolean;
    message: string;
    cleaned: number;
  }> {
    try {
      this.logger.warn(`Force resetting ride state for user: ${userId}`);

      const passenger = await this.prisma.passenger.findUnique({
        where: { userId },
      });

      const driver = await this.prisma.driver.findUnique({
        where: { userId },
      });

      let totalCleaned = 0;

      // Reset passenger rides
      if (passenger) {
        const passengerRides = await this.prisma.ride.findMany({
          where: {
            passengerId: passenger.id,
            status: {
              in: [RideStatus.REQUESTED, RideStatus.ACCEPTED, RideStatus.IN_PROGRESS],
            },
          },
        });

        for (const ride of passengerRides) {
          await this.cleanupRideCompletely(ride.id);
          totalCleaned++;
        }
      }

      // Reset driver rides
      if (driver) {
        const driverRides = await this.prisma.ride.findMany({
          where: {
            driverId: driver.id,
            status: {
              in: [RideStatus.ACCEPTED, RideStatus.IN_PROGRESS],
            },
          },
        });

        for (const ride of driverRides) {
          await this.cleanupRideCompletely(ride.id);
          totalCleaned++;
        }

        // Reset driver availability
        await this.prisma.driver.update({
          where: { id: driver.id },
          data: {
            isAvailable: true,
            isActiveTrip: false,
          },
        });
      }

      return {
        success: true,
        message: `Successfully reset user state`,
        cleaned: totalCleaned,
      };
    } catch (error) {
      this.logger.error('Error in force reset:', error);
      return {
        success: false,
        message: `Reset failed: ${error.message}`,
        cleaned: 0,
      };
    }
  }

  private async cleanupRideCompletely(rideId: string): Promise<void> {
    // CORREÇÃO: Usar abordagem mais robusta sem dependência de chat tables
    try {
      await this.prisma.$transaction(async (tx) => {
        // Delete payments first
        await tx.payment.deleteMany({
          where: { rideId },
        });

        // Delete ride status history
        await tx.rideStatusHistory.deleteMany({
          where: { rideId },
        });

        // Delete the ride
        await tx.ride.delete({
          where: { id: rideId },
        });
      });
    } catch (transactionError) {
      // FALLBACK: Tentar deletar diretamente
      try {
        await this.prisma.payment.deleteMany({
          where: { rideId },
        });

        await this.prisma.rideStatusHistory.deleteMany({
          where: { rideId },
        });

        await this.prisma.ride.delete({
          where: { id: rideId },
        });
      } catch (directError) {
        throw new Error(`Failed to cleanup ride ${rideId}: ${directError.message}`);
      }
    }
  }
}