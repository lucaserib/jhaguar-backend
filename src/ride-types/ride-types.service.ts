import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRideTypeDto,
  UpdateRideTypeDto,
  GetAvailableRideTypesDto,
  CalculateRidePriceDto,
  AddDriverRideTypeDto,
  UpdateDriverRideTypesDto,
  RidePriceCalculationResponse,
  AvailableDriversResponse,
} from './dto';
import { RideTypeEnum, Gender, VehicleType } from '@prisma/client';

@Injectable()
export class RideTypesService {
  private readonly logger = new Logger(RideTypesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createRideType(createRideTypeDto: CreateRideTypeDto) {
    const existingType = await this.prisma.rideTypeConfig.findUnique({
      where: { type: createRideTypeDto.type },
    });

    if (existingType) {
      throw new BadRequestException(
        `Tipo de corrida ${createRideTypeDto.type} já existe`,
      );
    }

    return this.prisma.rideTypeConfig.create({
      data: {
        type: createRideTypeDto.type,
        name: createRideTypeDto.name,
        description: createRideTypeDto.description,
        icon: createRideTypeDto.icon,
        isActive: createRideTypeDto.isActive ?? true,
        femaleOnly: createRideTypeDto.femaleOnly ?? false,
        requiresArmored: createRideTypeDto.requiresArmored ?? false,
        vehicleTypes: createRideTypeDto.vehicleTypes,
        basePrice: createRideTypeDto.basePrice,
        pricePerKm: createRideTypeDto.pricePerKm,
        pricePerMinute: createRideTypeDto.pricePerMinute,
        surgeMultiplier: createRideTypeDto.surgeMultiplier ?? 1.0,
        minimumPrice: createRideTypeDto.minimumPrice,
      },
    });
  }

  async findAllRideTypes() {
    return this.prisma.rideTypeConfig.findMany({
      orderBy: [{ type: 'asc' }],
    });
  }

  async findAvailableRideTypes(query: GetAvailableRideTypesDto) {
    const { userGender, activeOnly = true, includeDelivery = false } = query;

    const whereConditions: any = {};

    if (activeOnly) {
      whereConditions.isActive = true;
    }

    if (userGender !== Gender.FEMALE) {
      whereConditions.femaleOnly = false;
    }

    if (!includeDelivery) {
      whereConditions.NOT = {
        type: RideTypeEnum.DELIVERY,
      };
    }

    const rideTypes = await this.prisma.rideTypeConfig.findMany({
      where: whereConditions,
      orderBy: [{ basePrice: 'asc' }],
    });

    const rideTypesWithAvailability = await Promise.all(
      rideTypes.map(async (rideType) => {
        const availability = await this.checkDriverAvailability(
          rideType.id,
          userGender,
        );
        return {
          ...rideType,
          availability,
        };
      }),
    );

    return rideTypesWithAvailability;
  }

  async findRideTypeById(id: string) {
    const rideType = await this.prisma.rideTypeConfig.findUnique({
      where: { id },
    });

    if (!rideType) {
      throw new NotFoundException(
        `Tipo de corrida com ID ${id} não encontrado`,
      );
    }

    return rideType;
  }

  async findRideTypeByType(type: RideTypeEnum) {
    const rideType = await this.prisma.rideTypeConfig.findUnique({
      where: { type },
    });

    if (!rideType) {
      throw new NotFoundException(`Tipo de corrida ${type} não encontrado`);
    }

    return rideType;
  }

  async updateRideType(id: string, updateRideTypeDto: UpdateRideTypeDto) {
    const existingType = await this.findRideTypeById(id);

    return this.prisma.rideTypeConfig.update({
      where: { id },
      data: updateRideTypeDto,
    });
  }

  async deleteRideType(id: string) {
    const existingType = await this.findRideTypeById(id);

    const ridesUsingType = await this.prisma.ride.count({
      where: { rideTypeConfigId: id },
    });

    if (ridesUsingType > 0) {
      throw new BadRequestException(
        'Não é possível excluir tipo de corrida que possui corridas associadas',
      );
    }

    return this.prisma.rideTypeConfig.delete({
      where: { id },
    });
  }

  async calculateRidePrice(
    calculateDto: CalculateRidePriceDto,
  ): Promise<RidePriceCalculationResponse> {
    const rideType = await this.findRideTypeById(calculateDto.rideTypeId);

    const {
      distance,
      duration,
      surgeMultiplier = 1.0,
      isPremiumTime = false,
    } = calculateDto;

    const distanceKm = distance / 1000;
    const durationMinutes = duration / 60;

    const baseCost = rideType.basePrice;
    const distanceCost = distanceKm * rideType.pricePerKm;
    const timeCost = durationMinutes * rideType.pricePerMinute;

    let subtotal = baseCost + distanceCost + timeCost;

    const appliedSurge = Math.max(surgeMultiplier, rideType.surgeMultiplier);
    subtotal *= appliedSurge;

    const premiumFee = isPremiumTime ? subtotal * 0.15 : 0;

    const finalPrice = Math.max(
      subtotal + premiumFee,
      rideType.minimumPrice * appliedSurge,
    );

    return {
      finalPrice: Math.round(finalPrice * 100) / 100,
      basePrice: rideType.basePrice,
      distanceCost: Math.round(distanceCost * 100) / 100,
      timeCost: Math.round(timeCost * 100) / 100,
      surgeMultiplier: appliedSurge,
      premiumFee: Math.round(premiumFee * 100) / 100,
      currency: 'BRL',
      breakdown: {
        distance: distanceKm,
        duration: durationMinutes,
        rideType: rideType.name,
        isPremiumTime,
      },
    };
  }

  async addDriverRideType(addDriverRideTypeDto: AddDriverRideTypeDto) {
    const { driverId, rideTypeId, isActive = true } = addDriverRideTypeDto;

    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { vehicle: true },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    const rideType = await this.findRideTypeById(rideTypeId);

    await this.validateDriverForRideType(driver, rideType);

    const existingAssociation = await this.prisma.driverRideType.findUnique({
      where: {
        driverId_rideTypeId: {
          driverId,
          rideTypeId,
        },
      },
    });

    if (existingAssociation) {
      return this.prisma.driverRideType.update({
        where: {
          driverId_rideTypeId: {
            driverId,
            rideTypeId,
          },
        },
        data: { isActive },
      });
    }

    return this.prisma.driverRideType.create({
      data: {
        driverId,
        rideTypeId,
        isActive,
      },
    });
  }

  async updateDriverRideTypes(
    driverId: string,
    updateDto: UpdateDriverRideTypesDto,
  ) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: { vehicle: true },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    await this.prisma.driverRideType.deleteMany({
      where: { driverId },
    });

    const validRideTypes: string[] = [];
    for (const rideTypeId of updateDto.rideTypeIds) {
      const rideType = await this.findRideTypeById(rideTypeId);

      try {
        await this.validateDriverForRideType(driver, rideType);
        validRideTypes.push(rideTypeId);
      } catch (error) {
        this.logger.warn(
          `Motorista ${driverId} não atende requisitos para tipo ${rideType.name}: ${error.message}`,
        );
      }
    }

    const associations = await Promise.all(
      validRideTypes.map((rideTypeId) =>
        this.prisma.driverRideType.create({
          data: {
            driverId,
            rideTypeId,
            isActive: true,
          },
        }),
      ),
    );

    return {
      success: true,
      addedTypes: associations.length,
      skippedTypes: updateDto.rideTypeIds.length - associations.length,
      associations,
    };
  }

  async getDriverRideTypes(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(
        `Motorista com ID ${driverId} não encontrado`,
      );
    }

    return this.prisma.driverRideType.findMany({
      where: { driverId },
      include: {
        rideType: true,
      },
      orderBy: {
        rideType: {
          basePrice: 'asc',
        },
      },
    });
  }

  async removeDriverRideType(driverId: string, rideTypeId: string) {
    const association = await this.prisma.driverRideType.findUnique({
      where: {
        driverId_rideTypeId: {
          driverId,
          rideTypeId,
        },
      },
    });

    if (!association) {
      throw new NotFoundException('Associação não encontrada');
    }

    return this.prisma.driverRideType.delete({
      where: {
        driverId_rideTypeId: {
          driverId,
          rideTypeId,
        },
      },
    });
  }

  private async validateDriverForRideType(driver: any, rideType: any) {
    if (rideType.femaleOnly) {
      const user = await this.prisma.user.findUnique({
        where: { id: driver.userId },
      });

      if (user?.gender !== Gender.FEMALE) {
        throw new BadRequestException(
          'Apenas motoristas do gênero feminino podem oferecer corridas exclusivas para mulheres',
        );
      }
    }

    if (rideType.requiresArmored && !driver.vehicle?.isArmored) {
      throw new BadRequestException('Tipo de corrida requer veículo blindado');
    }

    if (
      driver.vehicle &&
      !rideType.vehicleTypes.includes(driver.vehicle.vehicleType)
    ) {
      throw new BadRequestException(
        `Tipo de veículo ${driver.vehicle.vehicleType} não é compatível com ${rideType.name}`,
      );
    }

    if (rideType.vehicleTypes.includes(VehicleType.MOTORCYCLE)) {
      const hasMotorcycleLicense = await this.prisma.driverDocument.findFirst({
        where: {
          driverId: driver.id,
          documentType: 'MOTORCYCLE_LICENSE',
          isVerified: true,
        },
      });

      if (!hasMotorcycleLicense) {
        throw new BadRequestException(
          'Motorista precisa ter habilitação para motocicleta verificada',
        );
      }
    }

    if (rideType.requiresArmored) {
      const hasArmoredCertificate = await this.prisma.driverDocument.findFirst({
        where: {
          driverId: driver.id,
          documentType: 'ARMORED_VEHICLE_CERTIFICATE',
          isVerified: true,
        },
      });

      if (!hasArmoredCertificate) {
        throw new BadRequestException(
          'Motorista precisa ter certificado para veículos blindados',
        );
      }
    }
  }

  private async checkDriverAvailability(
    rideTypeId: string,
    userGender?: Gender,
  ): Promise<AvailableDriversResponse> {
    const rideType = await this.findRideTypeById(rideTypeId);

    const driverFilters: any = {
      isOnline: true,
      isAvailable: true,
      accountStatus: 'APPROVED',
      supportedRideTypes: {
        some: {
          rideTypeId,
          isActive: true,
        },
      },
    };

    if (rideType.femaleOnly) {
      driverFilters.user = {
        gender: Gender.FEMALE,
      };
    }

    if (rideType.requiresArmored) {
      driverFilters.vehicle = {
        isArmored: true,
      };
    }

    const availableDrivers = await this.prisma.driver.findMany({
      where: driverFilters,
      select: {
        id: true,
        currentLatitude: true,
        currentLongitude: true,
      },
    });

    const averageEta =
      availableDrivers.length > 0 ? Math.round(5 + Math.random() * 10) : 0;

    return {
      count: availableDrivers.length,
      averageEta,
      hasAvailableDrivers: availableDrivers.length > 0,
    };
  }

  async getSuggestedRideTypes(
    userGender: Gender,
    latitude: number,
    longitude: number,
    isDelivery = false,
  ) {
    const availableTypes = await this.findAvailableRideTypes({
      userGender,
      activeOnly: true,
      includeDelivery: isDelivery,
    });

    const suggestions = availableTypes
      .filter((type) => type.availability.hasAvailableDrivers)
      .map((type) => ({
        ...type,
        priority: this.calculateTypePriority(type, userGender, isDelivery),
        estimatedArrival: type.availability.averageEta,
      }))
      .sort((a, b) => b.priority - a.priority);

    return suggestions;
  }

  private calculateTypePriority(
    rideType: any,
    userGender: Gender,
    isDelivery: boolean,
  ): number {
    let priority = 0;

    const typePriorities = {
      [RideTypeEnum.STANDARD]: 10,
      [RideTypeEnum.FEMALE_ONLY]: userGender === Gender.FEMALE ? 15 : 0,
      [RideTypeEnum.LUXURY]: 8,
      [RideTypeEnum.ARMORED]: 6,
      [RideTypeEnum.DELIVERY]: isDelivery ? 20 : 5,
      [RideTypeEnum.MOTORCYCLE]: 12,
      [RideTypeEnum.EXPRESS]: 11,
      [RideTypeEnum.SCHEDULED]: 7,
      [RideTypeEnum.SHARED]: 9,
    };

    priority += typePriorities[rideType.type] || 5;

    priority += Math.min(rideType.availability.count * 2, 10);

    if (rideType.basePrice > 20) {
      priority -= 5;
    }

    if (rideType.availability.averageEta < 8) {
      priority += 3;
    }

    return priority;
  }
}
