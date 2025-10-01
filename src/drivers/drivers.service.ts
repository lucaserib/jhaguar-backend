import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Status, RideStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { UpdateDriverLocationDto } from './dto/update-driver-location.dto';
import { LocationUpdateDto } from './dto/location-update.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { DriverStatsResponseDto, StatsPeriod } from './dto/driver-stats.dto';
import { RedisService } from '../common/redis/redis.service';

@Injectable()
export class DriversService {
  private readonly logger = new Logger(DriversService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private redisService: RedisService,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createDriverDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${createDriverDto.userId} não encontrado`,
      );
    }

    const defaultExpiryDate = new Date();
    defaultExpiryDate.setFullYear(defaultExpiryDate.getFullYear() + 1);

    const licenseExpiryDate = createDriverDto.licenseExpiryDate
      ? new Date(createDriverDto.licenseExpiryDate)
      : defaultExpiryDate;

    const existingDriver = await this.prisma.driver.findUnique({
      where: { userId: createDriverDto.userId },
    });

    if (existingDriver) {
      return this.prisma.driver.update({
        where: { userId: createDriverDto.userId },
        data: {
          licenseNumber: createDriverDto.licenseNumber,
          licenseExpiryDate: new Date(createDriverDto.licenseExpiryDate),
          bankAccount: createDriverDto.bankAccount,
        },
        include: { User: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      });
    }

    const newDriver = await this.prisma.driver.create({
      data: {
        userId: createDriverDto.userId,
        licenseNumber: createDriverDto.licenseNumber || 'TEMP',
        licenseExpiryDate: licenseExpiryDate,
        bankAccount: createDriverDto.bankAccount,
        accountStatus: Status.PENDING,
        backgroundCheckStatus: Status.PENDING,
      },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    await this.notificationsService.sendDriverApplicationNotification(
      newDriver,
    );

    return newDriver;
  }

  async findAll() {
    return this.prisma.driver.findMany({
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
        Vehicle: true,
      },
    });
  }

  async findOne(id: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
        Vehicle: true,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    return driver;
  }

  async findByUserId(userId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
        Vehicle: true,
      },
    });

    if (!driver) {
      return null;
    }

    return driver;
  }

  async updateStatus(id: string, status: Status) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!driver) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id },
      data: { accountStatus: status },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    await this.notificationsService.sendDriverStatusUpdateNotification(
      updatedDriver,
      status,
    );

    return {
      id: updatedDriver.id,
      userId: updatedDriver.userId,
      status: updatedDriver.accountStatus,
      user: updatedDriver.User,
      message: `Status do motorista atualizado para ${status}`,
    };
  }

  async updateDocuments(id: string, documentData: any) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
    });

    if (!driver) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }

    return this.prisma.driver.update({
      where: { id },
      data: {
        backgroundCheckStatus: Status.PENDING,
        backgroundCheckDate: new Date(),
      },
    });
  }

  async updateLocation(
    driverId: string,
    updateLocationDto: UpdateDriverLocationDto,
  ) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        currentLatitude: updateLocationDto.latitude,
        currentLongitude: updateLocationDto.longitude,
        isAvailable: updateLocationDto.isAvailable ?? driver.isAvailable,
        isOnline: updateLocationDto.isOnline ?? driver.isOnline,
      },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
        Vehicle: true,
      },
    });

    return {
      id: updatedDriver.id,
      latitude: updatedDriver.currentLatitude,
      longitude: updatedDriver.currentLongitude,
      isAvailable: updatedDriver.isAvailable,
      isOnline: updatedDriver.isOnline,
      user: updatedDriver.User,
      vehicle: updatedDriver.Vehicle,
    };
  }

  async findOnlineDrivers() {
    return this.prisma.driver.findMany({
      where: {
        isOnline: true,
        accountStatus: 'APPROVED',
        currentLatitude: { not: null },
        currentLongitude: { not: null },
      },
      include: { User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImage: true,
          },
        },
        Vehicle: true,
      },
    });
  }

  async toggleAvailability(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        isAvailable: !driver.isAvailable,
      },
    });

    return {
      id: updatedDriver.id,
      isAvailable: updatedDriver.isAvailable,
      message: `Motorista ${updatedDriver.isAvailable ? 'disponível' : 'indisponível'} para corridas`,
    };
  }

  // Novas funcionalidades obrigatórias

  async updateDriverStatus(driverId: string, status: Status) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { User: true },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        accountStatus: status,
      },
      include: { User: true },
    });

    // Log de auditoria
    this.logger.log(
      `Driver status updated: ${driverId} from ${driver.accountStatus} to ${status}`,
    );

    return {
      success: true,
      data: {
        id: updatedDriver.id,
        status: updatedDriver.accountStatus,
        updatedAt: new Date(),
      },
    };
  }

  async updateAvailability(
    driverId: string,
    updateData: UpdateAvailabilityDto,
  ) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const updateFields: any = {
      isOnline: updateData.isOnline,
      isAvailable: updateData.isAvailable,
    };

    // Atualizar localização se fornecida
    if (updateData.currentLocation) {
      updateFields.currentLatitude = updateData.currentLocation.latitude;
      updateFields.currentLongitude = updateData.currentLocation.longitude;
      updateFields.lastLocationUpdate = new Date();
    }

    // Definir timestamps de online/offline
    if (updateData.isOnline && !driver.isOnline) {
      // Motorista ficou online
      this.logger.log(`Driver ${driverId} went online`);
    } else if (!updateData.isOnline && driver.isOnline) {
      // Motorista ficou offline
      this.logger.log(`Driver ${driverId} went offline`);
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { id: driverId },
      data: updateFields,
    });

    // Atualizar cache do Redis se localização foi fornecida
    if (updateData.currentLocation) {
      await this.updateLocationCache(driverId, {
        latitude: updateData.currentLocation.latitude,
        longitude: updateData.currentLocation.longitude,
        isOnline: updateData.isOnline,
        isAvailable: updateData.isAvailable,
        updatedAt: new Date(),
      });
    }

    return {
      success: true,
      data: {
        isOnline: updatedDriver.isOnline,
        isAvailable: updatedDriver.isAvailable,
        onlineAt: updateData.isOnline ? new Date() : null,
        offlineAt: !updateData.isOnline ? new Date() : null,
      },
    };
  }

  async updateLocationWithCache(
    driverId: string,
    locationData: LocationUpdateDto,
  ) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    // Rate limiting check via Redis
    const updateCount =
      await this.redisService.incrementDriverLocationUpdates(driverId);
    if (updateCount > 1) {
      throw new BadRequestException(
        'Rate limit exceeded: maximum 1 location update per second',
      );
    }

    // Atualizar no banco de dados
    await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        currentLatitude: locationData.latitude,
        currentLongitude: locationData.longitude,
        isOnline: locationData.isOnline,
        isAvailable: locationData.isAvailable,
        lastLocationUpdate: new Date(),
      },
    });

    // Salvar na tabela DriverLocation
    await this.prisma.driverLocation.create({
      data: {
        driverId,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        heading: locationData.heading,
        speed: locationData.speed,
        accuracy: locationData.accuracy,
        isOnline: locationData.isOnline,
        isAvailable: locationData.isAvailable,
      },
    });

    // Atualizar cache do Redis
    await this.updateLocationCache(driverId, {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      isOnline: locationData.isOnline,
      isAvailable: locationData.isAvailable,
      heading: locationData.heading,
      speed: locationData.speed,
      accuracy: locationData.accuracy,
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: 'Localização atualizada com sucesso',
    };
  }

  async getDriverStats(
    driverId: string,
    period?: StatsPeriod,
  ): Promise<DriverStatsResponseDto> {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const startDate = this.getStartDateForPeriod(period || StatsPeriod.TODAY);
    const endDate = new Date();

    // Buscar corridas do período
    const rides = await this.prisma.ride.findMany({
      where: {
        driverId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        Rating: true,
        Payment: true,
      },
    });

    const completedRides = rides.filter((ride) => ride.status === 'COMPLETED');
    const cancelledRides = rides.filter((ride) => ride.status === 'CANCELLED');

    // Calcular estatísticas
    const totalEarnings = completedRides.reduce(
      (sum, ride) => sum + (ride.finalPrice || 0),
      0,
    );
    const totalDistance = completedRides.reduce(
      (sum, ride) => sum + (ride.actualDistance || 0),
      0,
    );

    const ratings = rides.flatMap((ride) => ride.Rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          ratings.length
        : 0;

    // Calcular taxa de aceitação (seria necessário ter dados de solicitações rejeitadas)
    const acceptanceRate =
      rides.length > 0 ? (completedRides.length / rides.length) * 100 : 0;

    return {
      earnings: {
        total: totalEarnings,
        count: completedRides.length,
        average:
          completedRides.length > 0 ? totalEarnings / completedRides.length : 0,
      },
      rides: {
        completed: completedRides.length,
        cancelled: cancelledRides.length,
        acceptance_rate: acceptanceRate,
      },
      Rating: {
        average: avgRating,
        count: ratings.length,
      },
      distance: {
        total_km: totalDistance,
        average_per_ride:
          completedRides.length > 0 ? totalDistance / completedRides.length : 0,
      },
      onlineTime: {
        total_hours: 0, // Seria calculado com base em logs de online/offline
        productive_hours: 0, // Tempo em corridas ativas
      },
    };
  }

  private async updateLocationCache(driverId: string, locationData: any) {
    try {
      await this.redisService.setDriverLocation(driverId, locationData);
    } catch (error) {
      this.logger.error(
        `Error updating location cache for driver ${driverId}: ${error.message}`,
      );
    }
  }

  private getStartDateForPeriod(period: StatsPeriod): Date {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    switch (period) {
      case StatsPeriod.TODAY:
        return startOfDay;
      case StatsPeriod.WEEK:
        const startOfWeek = new Date(startOfDay);
        startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
        return startOfWeek;
      case StatsPeriod.MONTH:
        return new Date(now.getFullYear(), now.getMonth(), 1);
      default:
        return startOfDay;
    }
  }

  async getDriverLocationFromCache(driverId: string) {
    try {
      const cachedLocation =
        await this.redisService.getDriverLocation(driverId);

      if (cachedLocation) {
        return cachedLocation;
      }

      // Fallback para banco de dados
      const dbLocation = await this.prisma.driverLocation.findFirst({
        where: { driverId },
        orderBy: { createdAt: 'desc' },
      });

      if (dbLocation) {
        // Atualizar cache imediatamente
        await this.updateLocationCache(driverId, {
          latitude: Number(dbLocation.latitude),
          longitude: Number(dbLocation.longitude),
          isOnline: dbLocation.isOnline,
          isAvailable: dbLocation.isAvailable,
          heading: Number(dbLocation.heading),
          speed: Number(dbLocation.speed),
          accuracy: Number(dbLocation.accuracy),
          updatedAt: dbLocation.updatedAt,
        });

        return {
          latitude: Number(dbLocation.latitude),
          longitude: Number(dbLocation.longitude),
          isOnline: dbLocation.isOnline,
          isAvailable: dbLocation.isAvailable,
          heading: Number(dbLocation.heading),
          speed: Number(dbLocation.speed),
          accuracy: Number(dbLocation.accuracy),
          updatedAt: dbLocation.updatedAt,
        };
      }

      return null;
    } catch (error) {
      this.logger.error(`Error getting driver location: ${error.message}`);
      return null;
    }
  }

  // Método para aceitar solicitação de corrida
  async acceptRideRequest(
    driverId: string,
    rideId: string,
    acceptData: {
      currentLocation: { latitude: number; longitude: number };
      estimatedPickupTime: number;
    },
  ) {
    try {
      this.logger.log(`Driver ${driverId} attempting to accept ride ${rideId}`);

      const driver = await this.prisma.driver.findUnique({
        where: {
          id: driverId,
          isOnline: true,
          isAvailable: true,
          accountStatus: 'APPROVED',
        },
        include: { User: true, Vehicle: true },
      });

      if (!driver) {
        throw new BadRequestException(
          'Motorista não encontrado ou não está disponível',
        );
      }

      // Verificar se a corrida existe e está pendente
      const ride = await this.prisma.ride.findUnique({
        where: {
          id: rideId,
          status: RideStatus.REQUESTED,
          driverId: null, // Ainda não foi aceita por ninguém
        },
        include: { Passenger: { include: { User: true } },
          RideTypeConfig: true,
        },
      });

      if (!ride) {
        throw new BadRequestException(
          'Corrida não encontrada ou já foi aceita',
        );
      }

      // Atualizar a corrida e o motorista em uma transação
      const result = await this.prisma.$transaction(
        async (tx) => {
          // Aceitar a corrida
          const updatedRide = await tx.ride.update({
            where: { id: rideId },
            data: {
              driverId,
              vehicleId: driver.Vehicle ?.id,
              status: RideStatus.ACCEPTED,
              acceptTime: new Date(),
            },
            include: { Passenger: { include: { User: true } },
              Driver: { include: { User: true, Vehicle: true } },
              RideTypeConfig: true,
            },
          });

          // Marcar motorista como ocupado
          await tx.driver.update({
            where: { id: driverId },
            data: {
              isAvailable: false,
              isActiveTrip: true,
            },
          });

          // Criar histórico de status
          await tx.rideStatusHistory.create({
            data: {
              rideId,
              driverId,
              previousStatus: 'REQUESTED',
              newStatus: 'ACCEPTED',
              locationLatitude: acceptData.currentLocation.latitude,
              locationLongitude: acceptData.currentLocation.longitude,
              notes: `Aceita pelo motorista ${driver.User.firstName}`,
            },
          });

          return updatedRide;
        },
        {
          timeout: 10000, // Quick ride acceptance
          isolationLevel: 'ReadCommitted',
        },
      );

      this.logger.log(
        `✅ Ride ${rideId} successfully accepted by driver ${driverId}`,
      );

      return {
        success: true,
        data: {
          rideId: result.id,
          status: 'accepted',
          acceptedAt: result.acceptTime,
          estimatedPickupTime: acceptData.estimatedPickupTime,
          Driver: {
            id: driver.id,
            name: `${driver.User.firstName} ${driver.User.lastName}`,
            phone: driver.User.phone,
            rating: driver.averageRating,
            vehicle: driver.Vehicle ? {
                  model: driver.Vehicle.model,
                  color: driver.Vehicle.color,
                  licensePlate: driver.Vehicle.licensePlate,
                }
              : null,
          },
        },
        message: 'Corrida aceita com sucesso',
      };
    } catch (error) {
      this.logger.error(`Error accepting ride ${rideId}:`, error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao aceitar corrida',
      };
    }
  }

  async debugOnlineStatus() {
    try {
      // Buscar todos os motoristas com informações relevantes
      const allDrivers = await this.prisma.driver.findMany({
        include: { User: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          DriverRideType: {
            where: { isActive: true },
            include: { RideTypeConfig: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      // Calcular estatísticas
      const totalDrivers = allDrivers.length;
      const onlineDrivers = allDrivers.filter((d) => d.isOnline).length;
      const availableDrivers = allDrivers.filter((d) => d.isOnline && d.isAvailable).length;
      const approvedDrivers = allDrivers.filter((d) => d.accountStatus === 'APPROVED').length;

      // Mapear dados detalhados dos motoristas
      const driversData = allDrivers.map((driver) => ({
        id: driver.id,
        name: `${driver.User?.firstName || 'N/A'} ${driver.User?.lastName || ''}`,
        isOnline: driver.isOnline,
        isAvailable: driver.isAvailable,
        accountStatus: driver.accountStatus,
        hasLocation: !!(driver.currentLatitude && driver.currentLongitude),
        location: driver.currentLatitude && driver.currentLongitude
          ? [driver.currentLatitude, driver.currentLongitude]
          : null,
        rideTypes: driver.DriverRideType.map((rt) => rt.RideTypeConfig.name),
      }));

      this.logger.log(`📊 Debug Online Status: ${onlineDrivers}/${totalDrivers} motoristas online`);

      return {
        success: true,
        data: {
          totalDrivers,
          onlineDrivers,
          availableDrivers,
          approvedDrivers,
          onlineAndAvailable: availableDrivers,
          drivers: driversData,
          timestamp: new Date(),
        },
        message: `${onlineDrivers} de ${totalDrivers} motoristas estão online (${availableDrivers} disponíveis)`,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar status de motoristas:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Erro interno',
      };
    }
  }
}
