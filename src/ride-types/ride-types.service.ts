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
import {
  RideTypeEnum,
  Gender,
  VehicleType,
  DocumentType,
} from '@prisma/client';

interface RideTypeAvailability {
  count: number;
  averageEta: number;
  hasAvailableDrivers: boolean;
  nearestDriver?: any;
}

interface RideTypeSuggestion {
  id: string;
  type: RideTypeEnum;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  femaleOnly: boolean;
  requiresArmored: boolean;
  requiresPetFriendly: boolean;
  allowMotorcycle: boolean;
  isDeliveryOnly: boolean;
  vehicleTypes: VehicleType[];
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  surgeMultiplier: number;
  minimumPrice: number;
  maxDistance?: number;
  minDistance?: number;
  priority: number;
  availability: RideTypeAvailability;
  estimatedPrice?: number;
  estimatedArrival: number;
  isRecommended?: boolean;
  reason?: string;
}

interface RideTypeRequirements {
  requiresPetFriendly: boolean;
  allowMotorcycle: boolean;
  isDeliveryOnly: boolean;
  maxDistance: number | null;
  minDistance: number | null;
  priority: number;
  requiresArmored: boolean;
}

interface DriverWithRelations {
  id: string;
  userId: string;
  user?: {
    id: string;
    gender: Gender;
  };
  vehicle?: {
    id: string;
    vehicleType: VehicleType;
    isArmored: boolean;
    isPetFriendly: boolean;
    isMotorcycle: boolean;
  } | null;
}

interface RideTypeConfig {
  id: string;
  type: RideTypeEnum;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  femaleOnly: boolean;
  requiresArmored: boolean;
  requiresPetFriendly: boolean;
  allowMotorcycle: boolean;
  isDeliveryOnly: boolean;
  vehicleTypes: VehicleType[];
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  surgeMultiplier: number;
  minimumPrice: number;
  maxDistance?: number;
  minDistance?: number;
  priority: number;
  availability?: RideTypeAvailability;
}

@Injectable()
export class RideTypesService {
  private readonly logger = new Logger(RideTypesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createRideType(createRideTypeDto: CreateRideTypeDto): Promise<any> {
    const existingType = await this.prisma.rideTypeConfig.findUnique({
      where: { type: createRideTypeDto.type },
    });

    if (existingType) {
      throw new BadRequestException(
        `Tipo de corrida ${createRideTypeDto.type} já existe`,
      );
    }

    const requirements = this.getRideTypeRequirements(createRideTypeDto.type);

    return this.prisma.rideTypeConfig.create({
      data: {
        type: createRideTypeDto.type,
        name: createRideTypeDto.name,
        description: createRideTypeDto.description,
        icon: createRideTypeDto.icon,
        isActive: createRideTypeDto.isActive ?? true,
        femaleOnly: createRideTypeDto.femaleOnly ?? false,

        requiresArmored: requirements.requiresArmored,
        requiresPetFriendly: requirements.requiresPetFriendly,
        allowMotorcycle: requirements.allowMotorcycle,
        isDeliveryOnly: requirements.isDeliveryOnly,

        vehicleTypes: createRideTypeDto.vehicleTypes,
        basePrice: createRideTypeDto.basePrice,
        pricePerKm: createRideTypeDto.pricePerKm,
        pricePerMin: createRideTypeDto.pricePerMinute,
        surgeMultiplier: createRideTypeDto.surgeMultiplier ?? 1.0,
        minimumPrice: createRideTypeDto.minimumPrice,
        maxDistance: createRideTypeDto.maxDistance,
        minDistance: createRideTypeDto.minDistance,
        priority: createRideTypeDto.priority ?? requirements.priority,
      },
    });
  }
  async findAllRideTypes(): Promise<any[]> {
    return this.prisma.rideTypeConfig.findMany({
      orderBy: [{ priority: 'asc' }, { basePrice: 'asc' }],
    });
  }

  async findAvailableRideTypes(
    query: GetAvailableRideTypesDto,
  ): Promise<any[]> {
    const { userGender, activeOnly = true, includeDelivery = false } = query;

    const whereConditions: any = {};

    if (activeOnly) {
      whereConditions.isActive = true;
    }

    if (userGender !== Gender.FEMALE) {
      whereConditions.femaleOnly = false;
    }

    if (!includeDelivery) {
      whereConditions.isDeliveryOnly = false;
    }

    const rideTypes = await this.prisma.rideTypeConfig.findMany({
      where: whereConditions,
      orderBy: [{ priority: 'asc' }, { basePrice: 'asc' }],
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

  async findRideTypeById(id: string): Promise<any> {
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

  async findRideTypeByType(type: RideTypeEnum): Promise<any> {
    const rideType = await this.prisma.rideTypeConfig.findUnique({
      where: { type },
    });

    if (!rideType) {
      throw new NotFoundException(`Tipo de corrida ${type} não encontrado`);
    }

    return rideType;
  }

  async updateRideType(
    id: string,
    updateRideTypeDto: UpdateRideTypeDto,
  ): Promise<any> {
    await this.findRideTypeById(id);

    return this.prisma.rideTypeConfig.update({
      where: { id },
      data: updateRideTypeDto,
    });
  }

  async deleteRideType(id: string): Promise<any> {
    await this.findRideTypeById(id);

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

    if (rideType.maxDistance && distance > rideType.maxDistance) {
      throw new BadRequestException(
        `Distância ${(distance / 1000).toFixed(1)}km excede o máximo permitido de ${(rideType.maxDistance / 1000).toFixed(1)}km para ${rideType.name}`,
      );
    }

    if (rideType.minDistance && distance < rideType.minDistance) {
      throw new BadRequestException(
        `Distância ${(distance / 1000).toFixed(1)}km é menor que o mínimo permitido de ${(rideType.minDistance / 1000).toFixed(1)}km para ${rideType.name}`,
      );
    }

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

  async addDriverRideType(
    addDriverRideTypeDto: AddDriverRideTypeDto,
  ): Promise<any> {
    const { driverId, rideTypeId, isActive = true } = addDriverRideTypeDto;

    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        user: true,
        vehicle: true,
      },
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
  ): Promise<any> {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        user: true,
        vehicle: true,
      },
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
    const skippedTypes: Array<{ rideTypeId: string; reason: string }> = [];

    for (const rideTypeId of updateDto.rideTypeIds) {
      try {
        const rideType = await this.findRideTypeById(rideTypeId);
        await this.validateDriverForRideType(driver, rideType);
        validRideTypes.push(rideTypeId);
      } catch (error) {
        skippedTypes.push({
          rideTypeId,
          reason: error.message,
        });
        this.logger.warn(
          `Motorista ${driverId} não atende requisitos para tipo ${rideTypeId}: ${error.message}`,
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
          include: {
            rideType: true,
          },
        }),
      ),
    );

    return {
      success: true,
      addedTypes: associations.length,
      skippedTypes: skippedTypes.length,
      associations,
      skippedDetails: skippedTypes,
    };
  }

  async getDriverRideTypes(driverId: string): Promise<any[]> {
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
          priority: 'asc',
        },
      },
    });
  }

  async removeDriverRideType(
    driverId: string,
    rideTypeId: string,
  ): Promise<any> {
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

  async getSuggestedRideTypes(
    userGender: Gender,
    latitude: number,
    longitude: number,
    isDelivery = false,
    hasPets = false,
  ): Promise<RideTypeSuggestion[]> {
    const availableTypes = await this.findAvailableRideTypes({
      userGender,
      activeOnly: true,
      includeDelivery: isDelivery,
    });

    const filteredTypes = availableTypes.filter((type) => {
      if (isDelivery) {
        return type.isDeliveryOnly;
      }

      if (type.isDeliveryOnly) {
        return false;
      }

      if (hasPets && !type.requiresPetFriendly) {
        return (
          type.type === RideTypeEnum.NORMAL ||
          type.type === RideTypeEnum.EXECUTIVO
        );
      }

      return true;
    });

    const suggestions: RideTypeSuggestion[] = filteredTypes
      .filter((type) => type.availability.hasAvailableDrivers)
      .map((type) => ({
        ...type,
        priority: this.calculateTypePriority(
          type,
          userGender,
          isDelivery,
          hasPets,
        ),
        estimatedArrival: type.availability.averageEta,
        isRecommended: false,
        reason: this.getRecommendationReason(
          type,
          userGender,
          isDelivery,
          hasPets,
        ),
      }))
      .sort((a, b) => b.priority - a.priority);

    if (suggestions.length > 0) {
      suggestions[0].isRecommended = true;

      if (hasPets) {
        const petType = suggestions.find((s) => s.type === RideTypeEnum.PET);
        if (petType) {
          petType.isRecommended = true;
          suggestions[0].isRecommended = false;
        }
      }
    }

    return suggestions;
  }

  private async validateDriverForRideType(
    driver: DriverWithRelations,
    rideType: RideTypeConfig,
  ): Promise<void> {
    if (rideType.femaleOnly && driver.user?.gender !== Gender.FEMALE) {
      throw new BadRequestException(
        'Apenas motoristas do gênero feminino podem oferecer corridas exclusivas para mulheres',
      );
    }

    if (rideType.requiresArmored && !driver.vehicle?.isArmored) {
      throw new BadRequestException('Tipo de corrida requer veículo blindado');
    }

    if (rideType.requiresPetFriendly && !driver.vehicle?.isPetFriendly) {
      throw new BadRequestException(
        'Tipo de corrida requer veículo pet-friendly',
      );
    }

    if (rideType.type === RideTypeEnum.MOTO && !driver.vehicle?.isMotorcycle) {
      throw new BadRequestException('Tipo de corrida requer motocicleta');
    }

    if (
      driver.vehicle &&
      !rideType.vehicleTypes.includes(driver.vehicle.vehicleType)
    ) {
      throw new BadRequestException(
        `Tipo de veículo ${driver.vehicle.vehicleType} não é compatível com ${rideType.name}`,
      );
    }

    await this.validateDriverDocumentation(driver, rideType);
  }

  private async validateDriverDocumentation(
    driver: DriverWithRelations,
    rideType: RideTypeConfig,
  ): Promise<void> {
    switch (rideType.type) {
      case RideTypeEnum.MOTO: {
        const hasMotorcycleLicense = await this.prisma.driverDocument.findFirst(
          {
            where: {
              driverId: driver.id,
              documentType: DocumentType.MOTORCYCLE_LICENSE,
              isVerified: true,
            },
          },
        );
        if (!hasMotorcycleLicense) {
          throw new BadRequestException(
            'Motorista precisa ter habilitação para motocicleta verificada',
          );
        }
        break;
      }

      case RideTypeEnum.BLINDADO: {
        const hasArmoredCertificate =
          await this.prisma.driverDocument.findFirst({
            where: {
              driverId: driver.id,
              documentType: DocumentType.ARMORED_VEHICLE_CERTIFICATE,
              isVerified: true,
            },
          });
        if (!hasArmoredCertificate) {
          throw new BadRequestException(
            'Motorista precisa ter certificado para veículos blindados',
          );
        }
        break;
      }

      case RideTypeEnum.PET: {
        // Certificado pet não é obrigatório, mas recomendado
        // const hasPetCertificate = await this.prisma.driverDocument.findFirst({
        //   where: {
        //     driverId: driver.id,
        //     documentType: DocumentType.PET_TRANSPORT_CERTIFICATE,
        //     isVerified: true,
        //   },
        // });
        break;
      }
    }
  }

  private async checkDriverAvailability(
    rideTypeId: string,
    _userGender?: Gender,
  ): Promise<AvailableDriversResponse> {
    const rideType = await this.findRideTypeById(rideTypeId);

    const driverFilters: any = {
      isOnline: true,
      isAvailable: true,
      accountStatus: 'APPROVED',
      driverRideTypes: {
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

    if (rideType.requiresPetFriendly) {
      if (driverFilters.vehicle) {
        driverFilters.vehicle.isPetFriendly = true;
      } else {
        driverFilters.vehicle = { isPetFriendly: true };
      }
    }

    const availableDrivers = await this.prisma.driver.findMany({
      where: driverFilters,
      select: {
        id: true,
        currentLatitude: true,
        currentLongitude: true,
        averageRating: true,
      },
    });

    let averageEta = 0;
    if (availableDrivers.length > 0) {
      averageEta = this.calculateAverageEta(
        availableDrivers.length,
        rideType.type,
      );
    }

    return {
      count: availableDrivers.length,
      averageEta,
      hasAvailableDrivers: availableDrivers.length > 0,
    };
  }

  private calculateTypePriority(
    rideType: RideTypeConfig,
    userGender: Gender,
    isDelivery: boolean,
    hasPets: boolean,
  ): number {
    let priority = rideType.priority || 0;

    if (isDelivery && rideType.isDeliveryOnly) {
      priority += 20;
    }

    if (hasPets && rideType.requiresPetFriendly) {
      priority += 15;
    }

    if (userGender === Gender.FEMALE && rideType.femaleOnly) {
      priority += 10;
    }

    if (rideType.availability) {
      priority += Math.min(rideType.availability.count * 2, 10);

      if (rideType.availability.averageEta < 8) {
        priority += 3;
      }
    }

    if (rideType.basePrice > 20) {
      priority -= 5;
    }

    return priority;
  }

  private getRecommendationReason(
    rideType: RideTypeConfig,
    userGender: Gender,
    isDelivery: boolean,
    hasPets: boolean,
  ): string {
    if (isDelivery && rideType.isDeliveryOnly) {
      return 'Ideal para entregas';
    }

    if (hasPets && rideType.requiresPetFriendly) {
      return 'Veículo preparado para pets';
    }

    if (userGender === Gender.FEMALE && rideType.femaleOnly) {
      return 'Exclusivo para mulheres';
    }

    if (rideType.type === RideTypeEnum.NORMAL) {
      return 'Melhor custo-benefício';
    }

    if (rideType.type === RideTypeEnum.MOTO) {
      return 'Mais rápido no trânsito';
    }

    return 'Disponível agora';
  }

  private calculateAverageEta(
    driverCount: number,
    rideType: RideTypeEnum,
  ): number {
    let baseEta = 8;

    if (driverCount > 10) {
      baseEta = 5;
    } else if (driverCount > 5) {
      baseEta = 6;
    } else if (driverCount < 3) {
      baseEta = 12;
    }

    switch (rideType) {
      case RideTypeEnum.MOTO:
        baseEta = Math.max(3, baseEta - 3);
        break;
      case RideTypeEnum.BLINDADO:
        baseEta += 5;
        break;
      case RideTypeEnum.PET:
        baseEta += 2;
        break;
    }

    return Math.round(baseEta);
  }

  private getRideTypeRequirements(type: RideTypeEnum): RideTypeRequirements {
    const requirements: RideTypeRequirements = {
      requiresArmored: false,
      requiresPetFriendly: false,
      allowMotorcycle: false,
      isDeliveryOnly: false,
      maxDistance: null,
      minDistance: null,
      priority: 0,
    };

    switch (type) {
      case RideTypeEnum.NORMAL:
        requirements.priority = 1;
        break;
      case RideTypeEnum.EXECUTIVO:
        requirements.priority = 2;
        break;
      case RideTypeEnum.MULHER:
        requirements.priority = 3;
        break;
      case RideTypeEnum.PET:
        requirements.requiresPetFriendly = true;
        requirements.priority = 4;
        break;
      case RideTypeEnum.MOTO:
        requirements.allowMotorcycle = true;
        requirements.maxDistance = 15000;
        requirements.priority = 5;
        break;
      case RideTypeEnum.BLINDADO:
        requirements.priority = 6;
        break;
      case RideTypeEnum.DELIVERY:
        requirements.isDeliveryOnly = true;
        requirements.allowMotorcycle = true;
        requirements.priority = 7;
        break;
    }

    return requirements;
  }
}
