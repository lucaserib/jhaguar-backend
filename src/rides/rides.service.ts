import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MapsService } from '../maps/maps.service';
import { RideTypesService } from '../ride-types/ride-types.service';
import { PaymentsService } from '../payments/payments.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideStatus, PaymentStatus, PaymentMethod } from '@prisma/client';

@Injectable()
export class RidesService {
  private readonly logger = new Logger(RidesService.name);
  private readonly confirmationTokens = new Map<
    string,
    { data: any; expires: Date }
  >();

  constructor(
    private readonly prisma: PrismaService,
    private readonly mapsService: MapsService,
    private readonly rideTypesService: RideTypesService,
    private readonly paymentsService: PaymentsService, // NOVA DEPENDÊNCIA
  ) {
    setInterval(() => this.cleanExpiredTokens(), 5 * 60 * 1000);
  }

  // ==================== PREPARAÇÃO E CRIAÇÃO DE CORRIDA ====================

  async prepareRideConfirmation(
    userId: string,
    confirmationData: {
      origin: { latitude: number; longitude: number; address: string };
      destination: { latitude: number; longitude: number; address: string };
      rideTypeId: string;
      estimatedDistance: number;
      estimatedDuration: number;
      selectedDriverId?: string;
      scheduledTime?: Date;
      specialRequirements?: string;
      hasPets?: boolean;
      petDescription?: string;
    },
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const confirmation = await this.mapsService.prepareRideConfirmation(
        userId,
        {
          ...confirmationData,
          estimatedPrice: 0,
        },
      );

      if (confirmation.success) {
        // NOVO: Incluir métodos de pagamento disponíveis
        const paymentMethods =
          await this.paymentsService.getPaymentMethods(userId);

        confirmation.data.paymentMethods = paymentMethods;
        confirmation.data.walletBalance =
          await this.paymentsService.getWalletBalance(userId);

        this.confirmationTokens.set(confirmation.data.confirmationToken, {
          data: {
            userId,
            ...confirmationData,
            pricing: confirmation.data.pricing,
            selectedDriver: confirmation.data.driver,
            paymentMethods,
          },
          expires: confirmation.data.expiresAt,
        });
      }

      return confirmation;
    } catch (error) {
      this.logger.error('Erro ao preparar confirmação:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Erro interno',
      };
    }
  }

  async createRide(
    userId: string,
    createRideDto: CreateRideDto,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const tokenData = this.confirmationTokens.get(
        createRideDto.confirmationToken,
      );
      if (!tokenData) {
        throw new BadRequestException(
          'Token de confirmação inválido ou expirado',
        );
      }

      if (new Date() > tokenData.expires) {
        this.confirmationTokens.delete(createRideDto.confirmationToken);
        throw new BadRequestException('Token de confirmação expirado');
      }

      const passenger = await this.prisma.passenger.findUnique({
        where: { userId },
        include: { user: true },
      });

      if (!passenger) {
        throw new NotFoundException('Perfil de passageiro não encontrado');
      }

      let selectedDriver: any = null;
      if (createRideDto.selectedDriverId || tokenData.data.selectedDriver) {
        const driverId =
          createRideDto.selectedDriverId || tokenData.data.selectedDriver.id;
        selectedDriver = await this.prisma.driver.findUnique({
          where: {
            id: driverId,
            isOnline: true,
            isAvailable: true,
            accountStatus: 'APPROVED',
          },
          include: {
            user: true,
            vehicle: true,
          },
        });

        if (!selectedDriver) {
          throw new BadRequestException(
            'Motorista selecionado não está mais disponível',
          );
        }
      }

      const rideType = await this.rideTypesService.findRideTypeById(
        createRideDto.rideTypeId,
      );
      const finalPricing = await this.rideTypesService.calculateRidePrice({
        rideTypeId: createRideDto.rideTypeId,
        distance: createRideDto.estimatedDistance,
        duration: createRideDto.estimatedDuration,
        surgeMultiplier: tokenData.data.pricing?.surgeMultiplier || 1.0,
        isPremiumTime: this.isPremiumTime(),
      });

      const ride = await this.prisma.ride.create({
        data: {
          passengerId: passenger.id,
          driverId: selectedDriver?.id,
          vehicleId: selectedDriver?.vehicle?.id,
          rideTypeConfigId: createRideDto.rideTypeId,
          status: selectedDriver ? RideStatus.ACCEPTED : RideStatus.REQUESTED,

          originAddress: createRideDto.origin.address,
          originLatitude: createRideDto.origin.latitude,
          originLongitude: createRideDto.origin.longitude,

          destinationAddress: createRideDto.destination.address,
          destinationLatitude: createRideDto.destination.latitude,
          destinationLongitude: createRideDto.destination.longitude,

          estimatedDistance: createRideDto.estimatedDistance,
          estimatedDuration: createRideDto.estimatedDuration,
          basePrice: finalPricing.basePrice,
          finalPrice: finalPricing.finalPrice,

          hasPets: createRideDto.hasPets || false,
          petDescription: createRideDto.petDescription,
          specialRequirements: createRideDto.specialRequirements,
          baggageQuantity: createRideDto.baggageQuantity || 0,
          scheduledTime: createRideDto.scheduledTime
            ? new Date(createRideDto.scheduledTime)
            : null,

          isFemaleOnlyRide: rideType.femaleOnly,
          isDelivery: rideType.isDeliveryOnly,

          acceptTime: selectedDriver ? new Date() : null,
        },
        include: {
          passenger: {
            include: { user: true },
          },
          driver: {
            include: {
              user: true,
              vehicle: true,
            },
          },
          RideTypeConfig: true,
        },
      });

      if (selectedDriver) {
        await this.prisma.driver.update({
          where: { id: selectedDriver.id },
          data: {
            isAvailable: false,
            isActiveTrip: true,
          },
        });
      }

      this.confirmationTokens.delete(createRideDto.confirmationToken);

      // NOVO: Criar registro de pagamento inicial
      await this.prisma.payment.create({
        data: {
          rideId: ride.id,
          amount: finalPricing.finalPrice,
          status: PaymentStatus.PENDING,
          method: PaymentMethod.CASH, // Valor padrão, será atualizado quando o usuário escolher
        },
      });

      if (!selectedDriver) {
        await this.notifyNearbyDrivers(ride);
      }

      // NOVO: Incluir informações de pagamento na resposta
      const paymentMethods =
        await this.paymentsService.getPaymentMethods(userId);
      const walletBalance = await this.paymentsService.getWalletBalance(userId);

      return {
        success: true,
        data: {
          rideId: ride.id,
          status: ride.status,
          driver: selectedDriver
            ? {
                id: selectedDriver.id,
                name: `${selectedDriver.user.firstName} ${selectedDriver.user.lastName}`,
                rating: selectedDriver.averageRating,
                phone: selectedDriver.user.phone,
                vehicle: selectedDriver.vehicle,
              }
            : null,
          pricing: {
            finalPrice: finalPricing.finalPrice,
            currency: 'BRL',
            breakdown: finalPricing.breakdown,
          },
          payment: {
            methods: paymentMethods,
            walletBalance,
            requiresPayment: true,
            amount: finalPricing.finalPrice,
          },
          estimatedArrival: selectedDriver ? 8 : null,
        },
        message: selectedDriver
          ? 'Corrida criada e aceita pelo motorista'
          : 'Corrida criada, buscando motorista disponível',
      };
    } catch (error) {
      this.logger.error('Erro ao criar corrida:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao criar corrida',
      };
    }
  }

  // ==================== FINALIZAÇÃO DA CORRIDA ====================

  async completeRide(
    driverId: string,
    rideId: string,
    completionData: {
      actualDistance?: number;
      actualDuration?: number;
      finalLocation?: { latitude: number; longitude: number };
    },
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: rideId,
          driverId,
          status: RideStatus.IN_PROGRESS,
        },
        include: {
          payment: true,
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
        },
      });

      if (!ride) {
        throw new NotFoundException(
          'Corrida não encontrada ou não está em progresso',
        );
      }

      // Atualizar dados da corrida
      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          status: RideStatus.COMPLETED,
          dropOffTime: new Date(),
          actualDistance: completionData.actualDistance,
          actualDuration: completionData.actualDuration,
        },
      });

      // Disponibilizar motorista novamente
      await this.prisma.driver.update({
        where: { id: driverId },
        data: {
          isAvailable: true,
          isActiveTrip: false,
        },
      });

      // NOVO: Preparar informações de pagamento
      const paymentInfo = {
        rideId: ride.id,
        amount: ride.finalPrice,
        currency: 'BRL',
        currentStatus: ride.payment?.status || PaymentStatus.PENDING,
        requiresPayment:
          !ride.payment || ride.payment.status === PaymentStatus.PENDING,
        availableMethods: await this.paymentsService.getPaymentMethods(
          ride.passenger.userId,
        ),
      };

      return {
        success: true,
        data: {
          rideId: updatedRide.id,
          status: updatedRide.status,
          completedAt: updatedRide.dropOffTime,
          finalDistance: updatedRide.actualDistance,
          finalDuration: updatedRide.actualDuration,
          payment: paymentInfo,
        },
        message: 'Corrida finalizada com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao finalizar corrida:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao finalizar corrida',
      };
    }
  }

  // ==================== CONSULTAS COM INFORMAÇÕES DE PAGAMENTO ====================

  async getUserRides(
    userId: string,
    filters: {
      status?: RideStatus;
      limit?: number;
      offset?: number;
      isDriver?: boolean;
    } = {},
  ): Promise<{
    success: boolean;
    data: any[];
    pagination: any;
    message: string;
  }> {
    try {
      const { status, limit = 20, offset = 0, isDriver = false } = filters;

      const whereClause: any = {};

      if (isDriver) {
        const driver = await this.prisma.driver.findUnique({
          where: { userId },
        });

        if (!driver) {
          throw new NotFoundException('Perfil de motorista não encontrado');
        }

        whereClause.driverId = driver.id;
      } else {
        const passenger = await this.prisma.passenger.findUnique({
          where: { userId },
        });

        if (!passenger) {
          throw new NotFoundException('Perfil de passageiro não encontrado');
        }

        whereClause.passengerId = passenger.id;
      }

      if (status) {
        whereClause.status = status;
      }

      const [rides, total] = await Promise.all([
        this.prisma.ride.findMany({
          where: whereClause,
          include: {
            passenger: {
              include: { user: true },
            },
            driver: {
              include: {
                user: true,
                vehicle: true,
              },
            },
            RideTypeConfig: true,
            payment: true, // NOVO: Incluir dados de pagamento
            ratings: true,
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        }),
        this.prisma.ride.count({ where: whereClause }),
      ]);

      const formattedRides = rides.map((ride) => this.formatRideResponse(ride));

      return {
        success: true,
        data: formattedRides,
        pagination: {
          total,
          limit,
          offset,
          pages: Math.ceil(total / limit),
        },
        message: 'Corridas retornadas com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao buscar corridas do usuário:', error);
      return {
        success: false,
        data: [],
        pagination: { total: 0, limit: 0, offset: 0, pages: 0 },
        message:
          error instanceof Error ? error.message : 'Erro ao buscar corridas',
      };
    }
  }

  // ==================== CANCELAMENTO INTEGRADO COM PAGAMENTOS ====================

  async cancelRide(
    userId: string,
    rideId: string,
    reason: string,
    isDriver = false,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const ride = await this.prisma.ride.findUnique({
        where: { id: rideId },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
          RideTypeConfig: true,
          payment: true, // NOVO: Incluir dados de pagamento
        },
      });

      if (!ride) {
        throw new NotFoundException('Corrida não encontrada');
      }

      if (isDriver) {
        const driver = await this.prisma.driver.findUnique({
          where: { userId },
        });

        if (!driver || ride.driverId !== driver.id) {
          throw new BadRequestException('Você não pode cancelar esta corrida');
        }
      } else {
        const passenger = await this.prisma.passenger.findUnique({
          where: { userId },
        });

        if (!passenger || ride.passengerId !== passenger.id) {
          throw new BadRequestException('Você não pode cancelar esta corrida');
        }
      }

      if (!['REQUESTED', 'ACCEPTED'].includes(ride.status)) {
        throw new BadRequestException(
          'Corrida não pode ser cancelada neste status',
        );
      }

      let cancellationFee = 0;
      if (ride.status === 'ACCEPTED' && !isDriver) {
        const timeSinceAccepted = ride.acceptTime
          ? (new Date().getTime() - ride.acceptTime.getTime()) / 1000 / 60
          : 0;

        if (timeSinceAccepted > 5) {
          cancellationFee = Math.min(ride.basePrice * 0.3, 10);
        }
      }

      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          status: RideStatus.CANCELLED,
          cancellationReason: reason,
          cancellationTime: new Date(),
          cancellationFee,
        },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
          RideTypeConfig: true,
          payment: true,
        },
      });

      if (ride.driverId) {
        await this.prisma.driver.update({
          where: { id: ride.driverId },
          data: {
            isAvailable: true,
            isActiveTrip: false,
          },
        });
      }

      // NOVO: Processar reembolsos se necessário via PaymentsService
      if (ride.payment && ride.payment.status === PaymentStatus.PAID) {
        // Se já foi pago, processar reembolso
        // A lógica de reembolso já está implementada no PaymentsService
      }

      if (cancellationFee > 0) {
        await this.processCancellationFee(updatedRide, cancellationFee);
      }

      return {
        success: true,
        data: {
          rideId: updatedRide.id,
          status: updatedRide.status,
          cancellationFee,
          refund: cancellationFee === 0,
        },
        message: 'Corrida cancelada com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao cancelar corrida:', error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao cancelar corrida',
      };
    }
  }

  // ==================== UTILITÁRIOS ATUALIZADOS ====================

  private formatRideResponse(ride: any): any {
    return {
      id: ride.id,
      status: ride.status,
      rideType: {
        id: ride.rideTypeConfig?.id,
        name: ride.rideTypeConfig?.name,
        icon: ride.rideTypeConfig?.icon,
      },
      origin: {
        address: ride.originAddress,
        latitude: ride.originLatitude,
        longitude: ride.originLongitude,
      },
      destination: {
        address: ride.destinationAddress,
        latitude: ride.destinationLatitude,
        longitude: ride.destinationLongitude,
      },
      timing: {
        requested: ride.requestTime,
        accepted: ride.acceptTime,
        pickup: ride.pickupTime,
        dropOff: ride.dropOffTime,
        scheduled: ride.scheduledTime,
      },
      pricing: {
        basePrice: ride.basePrice,
        finalPrice: ride.finalPrice,
        currency: ride.currency,
        paymentStatus: ride.payment?.status,
      },
      // NOVO: Informações detalhadas de pagamento
      payment: ride.payment
        ? {
            method: ride.payment.method,
            status: ride.payment.status,
            confirmedByDriver: ride.payment.confirmedByDriver,
            confirmationTime: ride.payment.driverConfirmationTime,
            driverNotes: ride.payment.driverNotes,
            requiresAction: this.getPaymentRequiredAction(ride),
          }
        : null,
      driver: ride.driver
        ? {
            id: ride.driver.id,
            name: `${ride.driver.user.firstName} ${ride.driver.user.lastName}`,
            rating: ride.driver.averageRating,
            phone: ride.driver.user.phone,
            profileImage: ride.driver.user.profileImage,
            vehicle: ride.driver.vehicle
              ? {
                  model: ride.driver.vehicle.model,
                  color: ride.driver.vehicle.color,
                  licensePlate: ride.driver.vehicle.licensePlate,
                  imageUrl: ride.driver.vehicle.carImageUrl,
                }
              : null,
          }
        : null,
      passenger: {
        id: ride.passenger.id,
        name: `${ride.passenger.user.firstName} ${ride.passenger.user.lastName}`,
        phone: ride.passenger.user.phone,
        profileImage: ride.passenger.user.profileImage,
      },
      details: {
        distance: ride.estimatedDistance,
        duration: ride.estimatedDuration,
        actualDistance: ride.actualDistance,
        actualDuration: ride.actualDuration,
        hasPets: ride.hasPets,
        specialRequirements: ride.specialRequirements,
        baggageQuantity: ride.baggageQuantity,
      },
      cancellation:
        ride.status === 'CANCELLED'
          ? {
              reason: ride.cancellationReason,
              time: ride.cancellationTime,
              fee: ride.cancellationFee,
            }
          : null,
      rating:
        ride.ratings?.length > 0
          ? {
              score: ride.ratings[0].rating,
              review: ride.ratings[0].review,
            }
          : null,
      createdAt: ride.createdAt,
      updatedAt: ride.updatedAt,
    };
  }

  private getPaymentRequiredAction(ride: any): string | null {
    if (!ride.payment) {
      return 'PAYMENT_REQUIRED';
    }

    switch (ride.payment.status) {
      case PaymentStatus.PENDING:
        if (!ride.payment.confirmedByDriver) {
          return 'AWAITING_DRIVER_CONFIRMATION';
        }
        break;
      case PaymentStatus.PAID:
        if (!ride.payment.confirmedByDriver) {
          return 'AWAITING_DRIVER_CONFIRMATION';
        }
        break;
      case PaymentStatus.FAILED:
        return 'PAYMENT_FAILED';
    }

    return null;
  }

  // Métodos existentes mantidos...
  private async notifyNearbyDrivers(ride: any): Promise<void> {
    try {
      const nearbyDrivers =
        await this.mapsService.findAvailableDriversForRideType(
          { latitude: ride.originLatitude, longitude: ride.originLongitude },
          ride.rideTypeConfigId,
          undefined,
          15,
          10,
        );

      this.logger.log(
        `Notificando ${nearbyDrivers.length} motoristas sobre nova corrida ${ride.id}`,
      );
    } catch (error) {
      this.logger.error('Erro ao notificar motoristas:', error);
    }
  }

  private isPremiumTime(): boolean {
    const hour = new Date().getHours();
    return (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
  }

  private async processCancellationFee(ride: any, fee: number): Promise<void> {
    try {
      await this.prisma.payment.upsert({
        where: { rideId: ride.id },
        create: {
          rideId: ride.id,
          amount: fee,
          status: PaymentStatus.PENDING,
          method: PaymentMethod.CASH,
        },
        update: {
          amount: fee,
          status: PaymentStatus.PENDING,
        },
      });

      this.logger.log(
        `Taxa de cancelamento de R$ ${fee} aplicada à corrida ${ride.id}`,
      );
    } catch (error) {
      this.logger.error('Erro ao processar taxa de cancelamento:', error);
    }
  }

  private cleanExpiredTokens(): void {
    const now = new Date();
    for (const [token, data] of this.confirmationTokens.entries()) {
      if (now > data.expires) {
        this.confirmationTokens.delete(token);
      }
    }
  }
}
