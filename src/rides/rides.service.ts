import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MapsService } from '../maps/maps.service';
import { RideTypesService } from '../ride-types/ride-types.service';
import { PaymentsService } from '../payments/payments.service';
import { IdempotencyService } from '../common/services/idempotency.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RideGateway } from './rides.gateway';
import { CreateRideDto } from './dto/create-ride.dto';
import { AcceptRideDto } from './dto/accept-ride.dto';
import { RejectRideDto } from './dto/reject-ride.dto';
import { ArrivedDto } from './dto/arrived.dto';
import { StartRideDto } from './dto/start-ride.dto';
import { CompleteRideDto } from './dto/complete-ride.dto';
import { CancelRideDto } from './dto/cancel-ride.dto';
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
    private readonly paymentsService: PaymentsService,
    private readonly idempotency: IdempotencyService,
    @Inject(forwardRef(() => RideGateway))
    private readonly rideGateway: RideGateway,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
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
    idempotencyKey?: string,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      const exec = async () => {
        const usingToken = Boolean(createRideDto.confirmationToken);
        const tokenData = usingToken
          ? this.confirmationTokens.get(createRideDto.confirmationToken!)
          : null;
        if (usingToken) {
          if (!tokenData) {
            throw new BadRequestException(
              'Token de confirmação inválido ou expirado',
            );
          }
          if (new Date() > tokenData.expires) {
            this.confirmationTokens.delete(createRideDto.confirmationToken!);
            throw new BadRequestException('Token de confirmação expirado');
          }
        }

        const passenger = await this.prisma.passenger.findUnique({
          where: { userId },
          include: { user: true },
        });

        if (!passenger) {
          throw new NotFoundException('Perfil de passageiro não encontrado');
        }

        let selectedDriver: any = null;
        if (
          createRideDto.selectedDriverId ||
          (tokenData && tokenData.data.selectedDriver)
        ) {
          const driverId =
            createRideDto.selectedDriverId || tokenData!.data.selectedDriver.id;
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

        // Validar presença de origem/destino
        if (!createRideDto.origin || !createRideDto.destination) {
          throw new BadRequestException('Origem e destino são obrigatórios');
        }

        // Calcular preço final do sistema
        const finalPricing = await this.rideTypesService.calculateRidePrice({
          rideTypeId: createRideDto.rideTypeId,
          distance: createRideDto.estimatedDistance,
          duration: createRideDto.estimatedDuration,
          surgeMultiplier: tokenData?.data?.pricing?.surgeMultiplier || 1.0,
          isPremiumTime: this.isPremiumTime(),
        });

        // Verificar se o passageiro já tem uma corrida pendente
        const existingRide = await this.prisma.ride.findFirst({
          where: {
            passengerId: passenger.id,
            status: {
              in: [
                RideStatus.REQUESTED,
                RideStatus.ACCEPTED,
                RideStatus.IN_PROGRESS,
              ],
            },
          },
        });

        if (existingRide) {
          this.logger.warn(
            `Passageiro ${passenger.id} já tem corrida ativa: ${existingRide.id}`,
          );
          throw new BadRequestException('Você já tem uma corrida em andamento');
        }

        // Garantir preço estimado positivo (fallback se enviado)
        const effectiveEstimated =
          createRideDto.estimatedPrice ?? finalPricing.finalPrice;
        if (!effectiveEstimated || effectiveEstimated <= 0) {
          throw new BadRequestException('Preço estimado inválido');
        }

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

        if (usingToken) {
          this.confirmationTokens.delete(createRideDto.confirmationToken!);
        }

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
          try {
            await this.notifyNearbyDrivers(ride);
          } catch (notifyError) {
            this.logger.warn(
              'Erro ao notificar motoristas próximos:',
              notifyError,
            );
            // Não falha a criação da corrida se notificação falhar
          }
        }

        // NOVO: Incluir informações de pagamento na resposta
        const paymentMethods =
          await this.paymentsService.getPaymentMethods(userId);
        const walletBalance =
          await this.paymentsService.getWalletBalance(userId);

        return {
          success: true,
          data: {
            id: ride.id,
            status: ride.status,
            createdAt: ride.createdAt,
          },
          message: selectedDriver
            ? 'Corrida criada e aceita pelo motorista'
            : 'Corrida criada, buscando motorista disponível',
        };
      };

      if (idempotencyKey) {
        return await this.idempotency.getOrSet(
          `rides:create:${userId}:${idempotencyKey}`,
          10 * 60 * 1000,
          exec,
        );
      }

      return await exec();
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

  async getRideByIdForUser(rideId: string, userId: string) {
    const ride = await this.prisma.ride.findFirst({
      where: {
        id: rideId,
        OR: [{ passenger: { userId } }, { driver: { userId } }],
      },
      include: {
        passenger: { include: { user: true } },
        driver: { include: { user: true, vehicle: true } },
        RideTypeConfig: true,
      },
    });

    if (!ride) {
      throw new NotFoundException('Corrida não encontrada ou acesso negado');
    }

    return {
      success: true,
      data: {
        id: ride.id,
        status: ride.status,
        passenger: {
          id: ride.passenger.id,
          user: {
            firstName: ride.passenger.user.firstName,
            lastName: ride.passenger.user.lastName,
            phone: ride.passenger.user.phone,
            profileImage: ride.passenger.user.profileImage,
          },
          averageRating: ride.passenger.averageRating,
          totalRides: ride.passenger.totalRides,
        },
        driver: ride.driver
          ? {
              id: ride.driver.id,
              user: {
                firstName: ride.driver.user.firstName,
                lastName: ride.driver.user.lastName,
                phone: ride.driver.user.phone,
                profileImage: ride.driver.user.profileImage,
              },
              averageRating: ride.driver.averageRating,
              totalRides: ride.driver.totalRides,
              vehicle: ride.driver.vehicle
                ? {
                    model: ride.driver.vehicle.model,
                    color: ride.driver.vehicle.color,
                    licensePlate: ride.driver.vehicle.licensePlate,
                    carImageUrl: ride.driver.vehicle.carImageUrl || undefined,
                  }
                : null,
            }
          : null,
        originAddress: ride.originAddress,
        originLatitude: ride.originLatitude,
        originLongitude: ride.originLongitude,
        destinationAddress: ride.destinationAddress,
        destinationLatitude: ride.destinationLatitude,
        destinationLongitude: ride.destinationLongitude,
        estimatedArrival: ride.acceptTime
          ? new Date(ride.acceptTime.getTime() + 8 * 60 * 1000)
          : null,
        estimatedDuration: ride.estimatedDuration,
        distanceToDestination: ride.actualDistance || null,
        createdAt: ride.createdAt,
        acceptedAt: ride.acceptTime,
        startedAt: ride.pickupTime,
        completedAt: ride.dropOffTime,
        estimatedPrice: ride.finalPrice || ride.basePrice,
        finalPrice: ride.finalPrice || null,
        rideType: ride.RideTypeConfig
          ? {
              id: ride.RideTypeConfig.id,
              name: ride.RideTypeConfig.name,
              icon: ride.RideTypeConfig.icon,
            }
          : null,
        specialRequirements: ride.specialRequirements,
        hasPets: ride.hasPets,
        rating: null,
      },
    };
  }

  async getRideStatus(rideId: string, userId: string) {
    const ride = await this.prisma.ride.findFirst({
      where: {
        id: rideId,
        OR: [{ passenger: { userId } }, { driver: { userId } }],
      },
      include: { driver: true },
    });
    if (!ride) throw new NotFoundException('Corrida não encontrada');

    let driverLocation: { latitude: number; longitude: number } | undefined;
    if (ride.driverId) {
      const loc = await this.mapsService.getDriverLocationFromDatabase(
        ride.driverId,
      );
      if (loc)
        driverLocation = {
          latitude: loc.latitude,
          longitude: loc.longitude,
        } as any;
    }

    const estimatedArrival = ride.acceptTime
      ? new Date(ride.acceptTime.getTime() + 7 * 60 * 1000)
      : null;

    return {
      success: true,
      data: {
        status: ride.status,
        driverLocation,
        estimatedArrival,
      },
    };
  }

  async rateRide(
    rideId: string,
    userId: string,
    body: { rating: number; review?: string; isPassengerRating?: boolean },
  ) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Corrida não encontrada');

    const isPassengerRating = body.isPassengerRating !== false;
    const passenger = await this.prisma.passenger.findUnique({
      where: { id: ride.passengerId },
    });
    const driver = ride.driverId
      ? await this.prisma.driver.findUnique({ where: { id: ride.driverId } })
      : null;

    const ratedUserId = isPassengerRating ? driver?.userId : passenger?.userId;
    if (!ratedUserId) throw new BadRequestException('Parte avaliada inválida');

    const rating = await this.prisma.rating.create({
      data: {
        rideId,
        ratedByUserId: userId,
        ratedUserId,
        rating: body.rating,
        review: body.review,
      },
    });

    return { success: true, data: { ratingId: rating.id } };
  }

  async reportRide(
    rideId: string,
    userId: string,
    body: {
      issue: string;
      description?: string;
      reportedBy: 'passenger' | 'driver';
    },
  ) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new NotFoundException('Corrida não encontrada');

    const actorIsPassenger = body.reportedBy === 'passenger';
    const actorValid = actorIsPassenger
      ? await this.prisma.passenger.findFirst({
          where: { userId, id: ride.passengerId },
        })
      : await this.prisma.driver.findFirst({
          where: { userId, id: ride.driverId || '' },
        });
    if (!actorValid) throw new ForbiddenException('Acesso negado');

    const record = await this.prisma.rideStatusHistory.create({
      data: {
        rideId,
        driverId:
          ride.driverId ||
          (await this.prisma.driver.findFirst({ where: { userId } }))?.id ||
          userId,
        previousStatus: ride.status,
        newStatus: 'REPORTED',
        notes: JSON.stringify({
          issue: body.issue,
          description: body.description,
          by: body.reportedBy,
        }),
      },
    });
    return { success: true, data: { id: record.id } };
  }

  async sendRideMessage(
    rideId: string,
    userId: string,
    body: { message: string; to: 'driver' | 'passenger' },
  ) {
    const ride = await this.prisma.ride.findFirst({
      where: {
        id: rideId,
        OR: [{ passenger: { userId } }, { driver: { userId } }],
      },
      include: {
        passenger: { include: { user: true } },
        driver: { include: { user: true } },
      },
    });
    if (!ride) throw new NotFoundException('Corrida não encontrada');

    await this.prisma.rideStatusHistory.create({
      data: {
        rideId,
        driverId:
          ride.driverId ||
          (await this.prisma.driver.findFirst({ where: { userId } }))?.id ||
          userId,
        previousStatus: ride.status,
        newStatus: 'MESSAGE',
        notes: JSON.stringify({ message: body.message, to: body.to }),
      },
    });
    return { success: true };
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

      const formattedRides = rides.map((ride) =>
        this.formatRideResponseDetailed(ride),
      );

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

  private formatRideResponseDetailed(ride: any): any {
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

      if (nearbyDrivers.length > 0) {
        // Preparar dados da corrida para os motoristas
        const rideRequestData = {
          id: ride.id,
          passengerId: ride.passengerId,
          passengerName: ride.passenger?.user?.firstName || 'Passageiro',
          originAddress: ride.originAddress,
          destinationAddress: ride.destinationAddress,
          originLatitude: ride.originLatitude,
          originLongitude: ride.originLongitude,
          destinationLatitude: ride.destinationLatitude,
          destinationLongitude: ride.destinationLongitude,
          estimatedDistance: ride.estimatedDistance,
          estimatedDuration: ride.estimatedDuration,
          estimatedPrice: ride.estimatedPrice,
          rideTypeId: ride.rideTypeConfigId,
          rideTypeName: ride.RideTypeConfig?.name || 'Normal',
          specialRequirements: ride.specialRequirements,
          hasPets: ride.hasPets,
          petDescription: ride.petDescription,
          createdAt: ride.createdAt,
          expiresAt: new Date(Date.now() + 60000), // 1 minuto para aceitar
        };

        // Extrair IDs dos motoristas para notificar
        const driverUserIds = nearbyDrivers
          .map((driver) => driver.userId)
          .filter(Boolean);

        // Enviar via WebSocket através do RideGateway
        if (this.rideGateway && driverUserIds.length > 0) {
          this.rideGateway.broadcastRideRequest(rideRequestData, driverUserIds);
          this.logger.log(
            `✅ Corrida ${ride.id} enviada via WebSocket para ${driverUserIds.length} motoristas`,
          );
        } else {
          this.logger.warn(
            `⚠️ RideGateway não disponível ou nenhum motorista conectado`,
          );
        }

        // Também enviar notificação push se disponível
        try {
          if (this.notificationsService) {
            await this.notificationsService.notifyMultipleDrivers(
              driverUserIds,
              'Nova corrida disponível!',
              `Corrida de ${rideRequestData.originAddress} para ${rideRequestData.destinationAddress}`,
              {
                type: 'NEW_RIDE_REQUEST',
                rideId: ride.id,
                data: rideRequestData,
              },
            );
          }
        } catch (notifError) {
          this.logger.warn(
            'Erro ao enviar notificação push:',
            notifError?.message || 'Erro desconhecido',
          );
        }
      } else {
        this.logger.warn(
          `⚠️ Nenhum motorista disponível para corrida ${ride.id}`,
        );
      }
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

  // ==================== NOVAS FUNCIONALIDADES OBRIGATÓRIAS ====================

  async getPendingRidesForDriver(driverId: string, limit = 10) {
    try {
      const driver = await this.prisma.driver.findUnique({
        where: { id: driverId },
      });

      if (!driver) {
        throw new NotFoundException(
          `Motorista com ID ${driverId} não encontrado`,
        );
      }

      // Buscar corridas reais pendentes (status REQUESTED) da tabela Ride
      const pendingRides = await this.prisma.ride.findMany({
        where: {
          status: RideStatus.REQUESTED, // Corridas que ainda não foram aceitas
          driverId: null, // Ainda não foram atribuídas a um motorista
        },
        include: {
          passenger: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profileImage: true,
                  phone: true,
                },
              },
            },
          },
          RideTypeConfig: true,
        },
        orderBy: { requestTime: 'desc' },
        take: limit,
      });

      this.logger.log(
        `Encontradas ${pendingRides.length} corridas pendentes para motorista ${driverId}`,
      );

      return {
        success: true,
        data: pendingRides.map((ride) => this.formatRideResponse(ride)),
      };
    } catch (error) {
      this.logger.error(
        `Error getting pending rides for driver ${driverId}:`,
        error,
      );
      return {
        success: false,
        data: [],
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar corridas pendentes',
      };
    }
  }

  async acceptRide(
    driverId: string,
    rideId: string,
    acceptData: AcceptRideDto,
  ) {
    try {
      const ride = await this.prisma.ride.findUnique({
        where: { id: rideId },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
        },
      });

      if (!ride) {
        throw new NotFoundException('Corrida não encontrada');
      }

      if (ride.status !== 'REQUESTED') {
        throw new BadRequestException(
          'Corrida não está mais disponível para aceitação',
        );
      }

      if (ride.driverId && ride.driverId !== driverId) {
        throw new BadRequestException(
          'Esta corrida já foi aceita por outro motorista',
        );
      }

      const driver = await this.prisma.driver.findUnique({
        where: {
          id: driverId,
          isOnline: true,
          isAvailable: true,
          accountStatus: 'APPROVED',
        },
        include: { user: true, vehicle: true },
      });

      if (!driver) {
        throw new BadRequestException('Motorista não está disponível');
      }

      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          driverId,
          vehicleId: driver.vehicle?.id,
          status: RideStatus.ACCEPTED,
          acceptTime: new Date(),
        },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true, vehicle: true } },
        },
      });

      await this.prisma.driver.update({
        where: { id: driverId },
        data: {
          isAvailable: false,
          isActiveTrip: true,
        },
      });

      await this.createRideStatusHistory(
        rideId,
        driverId,
        'REQUESTED',
        'ACCEPTED',
        {
          latitude: acceptData.currentLocation.latitude,
          longitude: acceptData.currentLocation.longitude,
        },
      );

      this.logger.log(`Ride ${rideId} accepted by driver ${driverId}`);

      return {
        success: true,
        data: {
          rideId: updatedRide.id,
          status: 'accepted',
          acceptedAt: updatedRide.acceptTime,
          estimatedPickupTime: acceptData.estimatedPickupTime,
        },
      };
    } catch (error) {
      this.logger.error(`Error accepting ride ${rideId}:`, error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao aceitar corrida',
      };
    }
  }

  async rejectRide(
    driverId: string,
    rideId: string,
    rejectData: RejectRideDto,
  ) {
    try {
      const ride = await this.prisma.ride.findUnique({
        where: { id: rideId },
      });

      if (!ride) {
        throw new NotFoundException('Corrida não encontrada');
      }

      this.logger.log(
        `Ride ${rideId} rejected by driver ${driverId}: ${rejectData.reason}`,
      );

      return {
        success: true,
        message: 'Corrida rejeitada com sucesso',
      };
    } catch (error) {
      this.logger.error(`Error rejecting ride ${rideId}:`, error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao rejeitar corrida',
      };
    }
  }

  async markDriverArrived(
    driverId: string,
    rideId: string,
    arrivedData: ArrivedDto,
  ) {
    try {
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: rideId,
          driverId,
          status: RideStatus.ACCEPTED,
        },
      });

      if (!ride) {
        throw new NotFoundException(
          'Corrida não encontrada ou não está no status correto',
        );
      }

      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          status: 'ACCEPTED',
        },
      });

      await this.createRideStatusHistory(
        rideId,
        driverId,
        'ACCEPTED',
        'DRIVER_ARRIVED',
        {
          latitude: arrivedData.currentLocation.lat,
          longitude: arrivedData.currentLocation.lng,
        },
      );

      this.logger.log(
        `Driver ${driverId} arrived at pickup location for ride ${rideId}`,
      );

      return {
        success: true,
        data: {
          status: 'driver_arrived',
          arrivedAt: arrivedData.arrivedAt,
          waitingStartedAt: new Date(),
        },
      };
    } catch (error) {
      this.logger.error(
        `Error marking driver arrived for ride ${rideId}:`,
        error,
      );
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao marcar chegada',
      };
    }
  }

  async startRide(driverId: string, rideId: string, startData: StartRideDto) {
    try {
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: rideId,
          driverId,
          status: RideStatus.ACCEPTED,
        },
      });

      if (!ride) {
        throw new NotFoundException(
          'Corrida não encontrada ou não está no status correto',
        );
      }

      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          status: RideStatus.IN_PROGRESS,
          pickupTime: startData.startedAt,
        },
      });

      await this.createRideStatusHistory(
        rideId,
        driverId,
        'ACCEPTED',
        'IN_PROGRESS',
        {
          latitude: startData.currentLocation.lat,
          longitude: startData.currentLocation.lng,
        },
      );

      this.logger.log(`Ride ${rideId} started by driver ${driverId}`);

      return {
        success: true,
        data: {
          status: 'in_progress',
          startedAt: startData.startedAt,
          route: startData.route,
        },
      };
    } catch (error) {
      this.logger.error(`Error starting ride ${rideId}:`, error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao iniciar corrida',
      };
    }
  }

  async completeRideNew(
    driverId: string,
    rideId: string,
    completeData: CompleteRideDto,
  ) {
    try {
      const ride = await this.prisma.ride.findFirst({
        where: {
          id: rideId,
          driverId,
          status: RideStatus.IN_PROGRESS,
        },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
          payment: true,
        },
      });

      if (!ride) {
        throw new NotFoundException(
          'Corrida não encontrada ou não está em progresso',
        );
      }

      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          status: RideStatus.COMPLETED,
          dropOffTime: completeData.completedAt,
          actualDistance: completeData.actualDistance,
          actualDuration: completeData.actualDuration,
        },
      });

      await this.prisma.driver.update({
        where: { id: driverId },
        data: {
          isAvailable: true,
          isActiveTrip: false,
          totalRides: { increment: 1 },
        },
      });

      await this.prisma.passenger.update({
        where: { id: ride.passengerId },
        data: {
          totalRides: { increment: 1 },
        },
      });

      await this.createRideStatusHistory(
        rideId,
        driverId,
        'IN_PROGRESS',
        'COMPLETED',
        {
          latitude: completeData.finalLocation.latitude,
          longitude: completeData.finalLocation.longitude,
        },
      );

      const driverEarnings = (ride.finalPrice || 0) * 0.9;

      this.logger.log(
        `Ride ${rideId} completed by driver ${driverId}. Earnings: ${driverEarnings}`,
      );

      return {
        success: true,
        data: {
          status: 'completed',
          completedAt: completeData.completedAt,
          finalPrice: ride.finalPrice,
          earnings: driverEarnings,
          summary: {
            distance: completeData.actualDistance,
            duration: completeData.actualDuration,
            finalLocation: completeData.finalLocation,
          },
        },
      };
    } catch (error) {
      this.logger.error(`Error completing ride ${rideId}:`, error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao finalizar corrida',
      };
    }
  }

  async cancelRideNew(
    driverId: string,
    rideId: string,
    cancelData: CancelRideDto,
  ) {
    try {
      const ride = await this.prisma.ride.findUnique({
        where: { id: rideId },
        include: {
          passenger: { include: { user: true } },
          driver: { include: { user: true } },
          payment: true,
        },
      });

      if (!ride) {
        throw new NotFoundException('Corrida não encontrada');
      }

      if (cancelData.isDriver && ride.driverId !== driverId) {
        throw new BadRequestException('Você não pode cancelar esta corrida');
      }

      if (!['REQUESTED', 'ACCEPTED', 'IN_PROGRESS'].includes(ride.status)) {
        throw new BadRequestException(
          'Corrida não pode ser cancelada neste status',
        );
      }

      let cancellationFee = 0;
      let refundAmount = 0;

      if (ride.status === 'ACCEPTED' && !cancelData.isDriver) {
        cancellationFee = Math.min((ride.finalPrice || 0) * 0.3, 10);
      } else if (ride.status === 'IN_PROGRESS') {
        cancellationFee = Math.min((ride.finalPrice || 0) * 0.5, 20);
      } else if (ride.payment?.status === PaymentStatus.PAID) {
        refundAmount = (ride.finalPrice || 0) - cancellationFee;
      }

      const updatedRide = await this.prisma.ride.update({
        where: { id: rideId },
        data: {
          status: RideStatus.CANCELLED,
          cancellationReason: cancelData.reason,
          cancellationTime: cancelData.cancelledAt,
          cancellationFee,
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

      await this.createRideStatusHistory(
        rideId,
        driverId,
        ride.status,
        'CANCELLED',
      );

      this.logger.log(
        `Ride ${rideId} cancelled. Reason: ${cancelData.reason}. Fee: ${cancellationFee}`,
      );

      return {
        success: true,
        data: {
          status: 'cancelled',
          cancelledAt: cancelData.cancelledAt,
          cancellationFee,
          refundAmount,
        },
      };
    } catch (error) {
      this.logger.error(`Error cancelling ride ${rideId}:`, error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro ao cancelar corrida',
      };
    }
  }

  async getDriverRides(
    driverId: string,
    limit = 20,
    offset = 0,
    status?: string,
  ) {
    try {
      const driver = await this.prisma.driver.findUnique({
        where: { id: driverId },
      });

      if (!driver) {
        throw new NotFoundException(
          `Motorista com ID ${driverId} não encontrado`,
        );
      }

      const whereClause: any = { driverId };
      if (status) {
        whereClause.status = status;
      }

      const [rides, total] = await Promise.all([
        this.prisma.ride.findMany({
          where: whereClause,
          include: {
            passenger: { include: { user: true } },
            driver: { include: { user: true, vehicle: true } },
            RideTypeConfig: true,
            payment: true,
            ratings: true,
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        }),
        this.prisma.ride.count({ where: whereClause }),
      ]);

      const completedRides = rides.filter(
        (ride) => ride.status === 'COMPLETED',
      );
      const totalEarnings = completedRides.reduce(
        (sum, ride) => sum + (ride.finalPrice || 0) * 0.8,
        0,
      );

      return {
        success: true,
        data: {
          rides: rides.map((ride) => this.formatRideResponseDetailed(ride)),
          summary: {
            total: total,
            completed: completedRides.length,
            totalEarnings,
            averageRating: driver.averageRating,
          },
          pagination: {
            total,
            limit,
            offset,
            pages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      this.logger.error(`Error getting driver rides:`, error);
      return {
        success: false,
        data: { rides: [], summary: {}, pagination: {} },
        message:
          error instanceof Error ? error.message : 'Erro ao buscar corridas',
      };
    }
  }

  private async createRideStatusHistory(
    rideId: string,
    driverId: string,
    previousStatus: string,
    newStatus: string,
    location?: { latitude: number; longitude: number },
    notes?: string,
  ) {
    try {
      await this.prisma.rideStatusHistory.create({
        data: {
          rideId,
          driverId,
          previousStatus,
          newStatus,
          locationLatitude: location?.latitude,
          locationLongitude: location?.longitude,
          notes,
        },
      });
    } catch (error) {
      this.logger.error(`Error creating ride status history:`, error);
    }
  }

  private formatRideRequestResponse(request: any) {
    return {
      id: request.id,
      passengerId: request.passengerId,
      passengerName: `${request.passenger.user.firstName} ${request.passenger.user.lastName}`,
      passengerRating: request.passenger.averageRating,
      pickupAddress: request.pickupAddress,
      pickupLocation: {
        latitude: Number(request.pickupLatitude),
        longitude: Number(request.pickupLongitude),
      },
      destinationAddress: request.destinationAddress,
      destinationLocation: {
        latitude: Number(request.destinationLatitude),
        longitude: Number(request.destinationLongitude),
      },
      rideType: {
        name: request.rideType.name,
        icon: request.rideType.icon,
      },
      estimatedPrice: Number(request.estimatedPrice),
      estimatedDistance: request.estimatedDistance,
      estimatedDuration: request.estimatedDuration,
      requestedAt: request.requestedAt,
      expiresAt: request.expiresAt,
    };
  }

  private formatRideResponse(ride: any) {
    return {
      id: ride.id,
      passengerId: ride.passengerId,
      passengerName: `${ride.passenger.user.firstName} ${ride.passenger.user.lastName}`,
      passengerRating: ride.passenger.averageRating || 5.0,
      passengerPhone: ride.passenger.user.phone,
      passengerProfileImage: ride.passenger.user.profileImage,
      pickupAddress: ride.originAddress,
      pickupLocation: {
        latitude: ride.originLatitude,
        longitude: ride.originLongitude,
      },
      destinationAddress: ride.destinationAddress,
      destinationLocation: {
        latitude: ride.destinationLatitude,
        longitude: ride.destinationLongitude,
      },
      rideType: {
        name: ride.RideTypeConfig?.name || 'Normal',
        icon: ride.RideTypeConfig?.icon || '🚗',
      },
      estimatedPrice: ride.finalPrice || ride.basePrice,
      estimatedDistance: ride.estimatedDistance,
      estimatedDuration: ride.estimatedDuration,
      requestedAt: ride.requestTime,
      status: ride.status,
      currency: ride.currency,
      isFemaleOnlyRide: ride.isFemaleOnlyRide,
      hasPets: ride.hasPets,
      petDescription: ride.petDescription,
      specialRequirements: ride.specialRequirements,
      baggageQuantity: ride.baggageQuantity,
      scheduledTime: ride.scheduledTime,
    };
  }
}
