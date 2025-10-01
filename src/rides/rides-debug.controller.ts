import { Controller, Get, Query, Delete, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('debug/rides')
export class RidesDebugController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('active')
  async getActiveRides() {
    const rides = await this.prisma.ride.findMany({
      where: {
        status: {
          in: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS'],
        },
      },
      include: { Passenger: {
          include: { User: true },
        },
        Driver: {
          include: { User: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return {
      success: true,
      data: rides.map(ride => ({
        id: ride.id,
        status: ride.status,
        passengerId: ride.passengerId,
        driverId: ride.driverId,
        passengerName: ride.Passenger?.User?.firstName || 'Unknown',
        driverName: ride.Driver?.User?.firstName || null,
        createdAt: ride.createdAt,
        timeSinceCreated: Math.floor((Date.now() - ride.createdAt.getTime()) / 1000 / 60), // minutes
        originAddress: ride.originAddress,
        destinationAddress: ride.destinationAddress,
      })),
      count: rides.length,
    };
  }

  @Get('user/:userId')
  async getUserRides(@Param('userId') userId: string) {
    // Find passenger
    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
    });

    // Find driver
    const driver = await this.prisma.driver.findUnique({
      where: { userId },
    });

    const passengerRides = passenger ? await this.prisma.ride.findMany({
      where: {
        passengerId: passenger.id,
        status: { in: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS'] }
      },
      orderBy: { createdAt: 'desc' },
    }) : [];

    const driverRides = driver ? await this.prisma.ride.findMany({
      where: {
        driverId: driver.id,
        status: { in: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS'] }
      },
      orderBy: { createdAt: 'desc' },
    }) : [];

    return {
      success: true,
      data: {
        userId,
        passengerId: passenger?.id || null,
        driverId: driver?.id || null,
        passengerRides: passengerRides.map(r => ({
          id: r.id,
          status: r.status,
          createdAt: r.createdAt,
          timeSinceCreated: Math.floor((Date.now() - r.createdAt.getTime()) / 1000 / 60),
        })),
        driverRides: driverRides.map(r => ({
          id: r.id,
          status: r.status,
          createdAt: r.createdAt,
          timeSinceCreated: Math.floor((Date.now() - r.createdAt.getTime()) / 1000 / 60),
        })),
      },
    };
  }

  @Delete('orphaned')
  async cleanupOrphanedRides(@Query('force') force?: string) {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago

    // Find truly orphaned rides
    const orphanedRides = await this.prisma.ride.findMany({
      where: {
        AND: [
          {
            OR: [
              { status: 'REQUESTED', createdAt: { lt: cutoff } },
              { status: 'ACCEPTED', createdAt: { lt: cutoff } },
            ],
          },
        ],
      },
    });

    if (force === 'true') {
      // Force cleanup - delete related records first
      for (const ride of orphanedRides) {
        // Delete payments
        await this.prisma.payment.deleteMany({
          where: { rideId: ride.id },
        });

        // Delete ride status history
        await this.prisma.rideStatusHistory.deleteMany({
          where: { rideId: ride.id },
        });

        // Finally delete the ride
        await this.prisma.ride.delete({
          where: { id: ride.id },
        });
      }

      return {
        success: true,
        message: `Forcefully cleaned up ${orphanedRides.length} orphaned rides`,
        deletedRides: orphanedRides.map(r => ({
          id: r.id,
          status: r.status,
          createdAt: r.createdAt,
        })),
      };
    }

    return {
      success: true,
      message: `Found ${orphanedRides.length} orphaned rides (use ?force=true to delete)`,
      orphanedRides: orphanedRides.map(r => ({
        id: r.id,
        status: r.status,
        createdAt: r.createdAt,
        age: Math.floor((now.getTime() - r.createdAt.getTime()) / 1000 / 60),
      })),
    };
  }
}