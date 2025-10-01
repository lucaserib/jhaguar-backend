import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RidesStateService } from './rides-state.service';
import { RideStatus } from '@prisma/client';

export interface RideValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  canProceed: boolean;
  recommendations: string[];
}

export interface RideFlowValidation {
  userId: string;
  userType: 'passenger' | 'driver';
  action: 'create' | 'accept' | 'start' | 'complete' | 'cancel';
  rideId?: string;
  additionalData?: any;
}

/**
 * Production-ready ride flow validation service
 * Ensures all ride operations follow business rules and maintain data consistency
 */
@Injectable()
export class RidesValidationService {
  private readonly logger = new Logger(RidesValidationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ridesStateService: RidesStateService,
  ) {}

  /**
   * Comprehensive ride flow validation
   */
  async validateRideFlow(params: RideFlowValidation): Promise<RideValidationResult> {
    const { userId, userType, action, rideId, additionalData } = params;
    const result: RideValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      canProceed: true,
      recommendations: [],
    };

    try {
      this.logger.log(`🔍 Validating ${action} for ${userType} ${userId}`);

      // Get current user state
      const userState = await this.ridesStateService.getUserRideState(userId);

      // Validate based on action
      switch (action) {
        case 'create':
          await this.validateRideCreation(userId, userState, result, additionalData);
          break;

        case 'accept':
          await this.validateRideAcceptance(userId, rideId!, userState, result, additionalData);
          break;

        case 'start':
          await this.validateRideStart(userId, rideId!, userState, result);
          break;

        case 'complete':
          await this.validateRideCompletion(userId, rideId!, userState, result);
          break;

        case 'cancel':
          await this.validateRideCancellation(userId, rideId!, userState, result, additionalData);
          break;

        default:
          result.errors.push(`Unknown action: ${action}`);
          result.isValid = false;
      }

      // Determine if operation can proceed
      result.canProceed = result.isValid && result.errors.length === 0;

      this.logger.log(`✅ Validation result for ${action}:`, {
        isValid: result.isValid,
        canProceed: result.canProceed,
        errorsCount: result.errors.length,
        warningsCount: result.warnings.length,
      });

      return result;

    } catch (error) {
      this.logger.error('❌ Validation error:', error);
      result.isValid = false;
      result.canProceed = false;
      result.errors.push(`Validation failed: ${error.message}`);
      return result;
    }
  }

  /**
   * Validate ride creation
   */
  private async validateRideCreation(
    userId: string,
    userState: any,
    result: RideValidationResult,
    rideData: any
  ): Promise<void> {
    // Check if user already has active ride
    if (userState.hasActiveRide) {
      const existingRide = await this.prisma.ride.findUnique({
        where: { id: userState.activeRideId },
        include: { Passenger: true, Driver: true },
      });

      if (existingRide) {
        const ageMinutes = Math.floor(
          (Date.now() - existingRide.createdAt.getTime()) / (1000 * 60)
        );

        // If ride is very old, suggest cleanup
        if (ageMinutes > 15) {
          result.warnings.push(`Existing ride is ${ageMinutes} minutes old`);
          result.recommendations.push('Consider running cleanup for orphaned rides');
        }

        result.errors.push('User already has an active ride');
        result.isValid = false;
        return;
      }
    }

    // Validate passenger exists
    const passenger = await this.prisma.passenger.findUnique({
      where: { userId },
      include: { User: true },
    });

    if (!passenger) {
      result.errors.push('Passenger profile not found');
      result.isValid = false;
      return;
    }

    // Validate ride data
    if (!rideData.origin || !rideData.destination) {
      result.errors.push('Origin and destination are required');
      result.isValid = false;
    }

    if (!rideData.rideTypeId) {
      result.errors.push('Ride type is required');
      result.isValid = false;
    }

    // Validate ride type exists
    if (rideData.rideTypeId) {
      const rideType = await this.prisma.rideTypeConfig.findUnique({
        where: { id: rideData.rideTypeId },
      });

      if (!rideType || !rideType.isActive) {
        result.errors.push('Invalid or inactive ride type');
        result.isValid = false;
      }
    }

    // Validate distance and duration
    if (rideData.estimatedDistance <= 0) {
      result.errors.push('Invalid estimated distance');
      result.isValid = false;
    }

    if (rideData.estimatedDuration <= 0) {
      result.errors.push('Invalid estimated duration');
      result.isValid = false;
    }

    // Business rule validations
    if (rideData.estimatedDistance > 100) {
      result.warnings.push('Very long distance ride (>100km)');
      result.recommendations.push('Consider splitting into multiple rides');
    }

    if (rideData.estimatedDuration > 180) {
      result.warnings.push('Very long duration ride (>3 hours)');
    }
  }

  /**
   * Validate ride acceptance
   */
  private async validateRideAcceptance(
    userId: string,
    rideId: string,
    userState: any,
    result: RideValidationResult,
    acceptanceData: any
  ): Promise<void> {
    // Check if driver already has active ride
    if (userState.hasActiveRide && userState.activeRideId !== rideId) {
      result.errors.push('Driver already has an active ride');
      result.isValid = false;
      return;
    }

    // Get ride details
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { Passenger: { include: { User: true } },
        Driver: { include: { User: true } },
        RideTypeConfig: true,
      },
    });

    if (!ride) {
      result.errors.push('Ride not found');
      result.isValid = false;
      return;
    }

    // Validate ride status
    if (ride.status !== RideStatus.REQUESTED) {
      result.errors.push(`Cannot accept ride with status: ${ride.status}`);
      result.isValid = false;
      return;
    }

    // Check if ride is already accepted by another driver
    if (ride.driverId && ride.driverId !== acceptanceData?.driverId) {
      result.errors.push('Ride already accepted by another driver');
      result.isValid = false;
      return;
    }

    // Validate driver exists and is available
    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      include: { User: true, Vehicle: true },
    });

    if (!driver) {
      result.errors.push('Driver profile not found');
      result.isValid = false;
      return;
    }

    if (!driver.isOnline || !driver.isAvailable) {
      result.errors.push('Driver is not available');
      result.isValid = false;
      return;
    }

    if (driver.accountStatus !== 'APPROVED') {
      result.errors.push('Driver account not approved');
      result.isValid = false;
      return;
    }

    // Check vehicle
    if (!driver.Vehicle) {
      result.errors.push('Driver has no vehicle registered');
      result.isValid = false;
      return;
    }

    // Check ride age
    const rideAge = Date.now() - ride.createdAt.getTime();
    const maxAge = 10 * 60 * 1000; // 10 minutes

    if (rideAge > maxAge) {
      result.warnings.push('Ride request is quite old');
      result.recommendations.push('Passenger may have given up waiting');
    }

    // Female-only ride validation
    if (ride.isFemaleOnlyRide && driver.User.gender !== 'FEMALE') {
      result.errors.push('Only female drivers can accept female-only rides');
      result.isValid = false;
    }
  }

  /**
   * Validate ride start
   */
  private async validateRideStart(
    userId: string,
    rideId: string,
    userState: any,
    result: RideValidationResult
  ): Promise<void> {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { Driver: true, Passenger: true },
    });

    if (!ride) {
      result.errors.push('Ride not found');
      result.isValid = false;
      return;
    }

    if (ride.status !== RideStatus.ACCEPTED) {
      result.errors.push(`Cannot start ride with status: ${ride.status}`);
      result.isValid = false;
      return;
    }

    if (ride.Driver?.userId !== userId) {
      result.errors.push('Only the assigned driver can start this ride');
      result.isValid = false;
      return;
    }

    // Check if driver arrived at pickup location (optional validation)
    const timeSinceAcceptance = Date.now() - (ride.acceptTime?.getTime() || 0);
    if (timeSinceAcceptance < 30000) { // Less than 30 seconds
      result.warnings.push('Starting ride very quickly after acceptance');
      result.recommendations.push('Ensure driver has reached passenger location');
    }
  }

  /**
   * Validate ride completion
   */
  private async validateRideCompletion(
    userId: string,
    rideId: string,
    userState: any,
    result: RideValidationResult
  ): Promise<void> {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { Driver: true, Passenger: true, Payment: true },
    });

    if (!ride) {
      result.errors.push('Ride not found');
      result.isValid = false;
      return;
    }

    if (ride.status !== RideStatus.IN_PROGRESS) {
      result.errors.push(`Cannot complete ride with status: ${ride.status}`);
      result.isValid = false;
      return;
    }

    if (ride.Driver?.userId !== userId) {
      result.errors.push('Only the assigned driver can complete this ride');
      result.isValid = false;
      return;
    }

    // Check minimum ride duration
    const rideDuration = Date.now() - (ride.pickupTime?.getTime() || 0);
    if (rideDuration < 60000) { // Less than 1 minute
      result.warnings.push('Very short ride duration');
      result.recommendations.push('Verify ride was actually completed');
    }

    // Check payment status
    if (ride.Payment) {
      if (ride.Payment.status === 'PENDING') {
        result.warnings.push('Ride has pending payment');
        result.recommendations.push('Ensure payment is processed before completion');
      }
    }
  }

  /**
   * Validate ride cancellation
   */
  private async validateRideCancellation(
    userId: string,
    rideId: string,
    userState: any,
    result: RideValidationResult,
    cancellationData: any
  ): Promise<void> {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { Driver: true, Passenger: true },
    });

    if (!ride) {
      result.errors.push('Ride not found');
      result.isValid = false;
      return;
    }

    if (ride.status === RideStatus.COMPLETED || ride.status === RideStatus.CANCELLED) {
      result.errors.push(`Cannot cancel ride with status: ${ride.status}`);
      result.isValid = false;
      return;
    }

    // Check if user is authorized to cancel
    const isPassenger = ride.Passenger ?.userId === userId;
    const isDriver = ride.Driver?.userId === userId;

    if (!isPassenger && !isDriver) {
      result.errors.push('User not authorized to cancel this ride');
      result.isValid = false;
      return;
    }

    // Check cancellation reason
    if (!cancellationData?.reason) {
      result.warnings.push('No cancellation reason provided');
      result.recommendations.push('Provide cancellation reason for better service');
    }

    // Check timing for cancellation fees
    if (ride.status === RideStatus.IN_PROGRESS) {
      result.warnings.push('Cancelling ride in progress');
      result.recommendations.push('May incur cancellation fees');
    }

    const timeSinceAcceptance = Date.now() - (ride.acceptTime?.getTime() || ride.createdAt.getTime());
    if (timeSinceAcceptance > 5 * 60 * 1000 && isPassenger) { // 5 minutes
      result.warnings.push('Late cancellation by passenger');
      result.recommendations.push('May incur cancellation fees');
    }
  }

  /**
   * Quick validation for emergency resets
   */
  async validateEmergencyReset(userId: string): Promise<RideValidationResult> {
    const result: RideValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      canProceed: true,
      recommendations: [],
    };

    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        result.errors.push('User not found');
        result.isValid = false;
        result.canProceed = false;
        return result;
      }

      // Get current state
      const userState = await this.ridesStateService.getUserRideState(userId);

      if (!userState.hasActiveRide) {
        result.warnings.push('No active rides found to reset');
        result.recommendations.push('Emergency reset may not be necessary');
      }

      result.warnings.push('Emergency reset will permanently delete ride data');
      result.recommendations.push('Use only when normal cleanup fails');

      return result;

    } catch (error) {
      this.logger.error('❌ Emergency reset validation error:', error);
      result.isValid = false;
      result.canProceed = false;
      result.errors.push(`Validation failed: ${error.message}`);
      return result;
    }
  }

  /**
   * Validate system health for ride operations
   */
  async validateSystemHealth(): Promise<RideValidationResult> {
    const result: RideValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      canProceed: true,
      recommendations: [],
    };

    try {
      // Check database connectivity
      await this.prisma.$queryRaw`SELECT 1`;

      // Check for stuck rides
      const stuckRides = await this.prisma.ride.count({
        where: {
          status: {
            in: [RideStatus.REQUESTED, RideStatus.ACCEPTED],
          },
          createdAt: {
            lt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          },
        },
      });

      if (stuckRides > 0) {
        result.warnings.push(`Found ${stuckRides} potentially stuck rides`);
        result.recommendations.push('Consider running cleanup for orphaned rides');
      }

      // Check active ride count
      const activeRides = await this.prisma.ride.count({
        where: {
          status: {
            in: [RideStatus.REQUESTED, RideStatus.ACCEPTED, RideStatus.IN_PROGRESS],
          },
        },
      });

      if (activeRides > 100) {
        result.warnings.push(`High number of active rides: ${activeRides}`);
        result.recommendations.push('Monitor system performance');
      }

      this.logger.log(`✅ System health check completed: ${activeRides} active rides, ${stuckRides} stuck rides`);

      return result;

    } catch (error) {
      this.logger.error('❌ System health check failed:', error);
      result.isValid = false;
      result.canProceed = false;
      result.errors.push(`System health check failed: ${error.message}`);
      return result;
    }
  }
}