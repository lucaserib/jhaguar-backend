import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { RideTypesService } from '../ride-types/ride-types.service';
import {
  Location,
  DriverWithDistance,
  RouteCalculation,
  NearbyDriversRequest,
  CalculateRouteRequest,
  CalculatePriceRequest,
  GoogleRoutesApiRequest,
  GoogleRoutesApiResponse,
  GoogleDirectionsApiResponse,
  GoogleGeocodeApiResponse,
  BaseRates,
  RideTypeWithAvailability,
  SmartRideRecommendation,
} from './interfaces/maps.interfaces';
import { RideTypeEnum, Gender, VehicleType } from '@prisma/client';

interface RideConfirmationData {
  origin: Location & { address: string };
  destination: Location & { address: string };
  rideTypeId: string;
  estimatedDistance: number;
  estimatedDuration: number;
  estimatedPrice: number;
  selectedDriverId?: string;
  scheduledTime?: Date;
  specialRequirements?: string;
  hasPets?: boolean;
  petDescription?: string;
}

@Injectable()
export class MapsService {
  private readonly logger = new Logger(MapsService.name);
  private readonly googleApiKey: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly rideTypesService: RideTypesService,
  ) {
    this.googleApiKey =
      this.configService.get<string>('GOOGLE_API_KEY') ||
      this.configService.get<string>('EXPO_PUBLIC_GOOGLE_API_KEY') ||
      '';
  }

  async getSmartRideRecommendations(
    userId: string,
    origin: Location,
    destination: Location,
    context: {
      isDelivery?: boolean;
      hasPets?: boolean;
      prefersFemaleDriver?: boolean;
      scheduledTime?: Date;
      specialRequirements?: string;
    } = {},
  ): Promise<SmartRideRecommendation> {
    try {
      const userInfo = await this.getUserContext(userId);

      const route = await this.calculateRoute({ origin, destination });

      const suggestions = await this.rideTypesService.getSuggestedRideTypes(
        userInfo.gender,
        origin.latitude,
        origin.longitude,
        context.isDelivery || false,
        context.hasPets || false,
      );

      const enrichedSuggestions = await this.enrichSuggestionsWithDriverInfo(
        suggestions,
        route,
        origin,
        userInfo.gender,
      );

      const filteredSuggestions = this.filterSuggestionsByContext(
        enrichedSuggestions,
        context,
        route,
      );

      const primaryRecommendation = this.selectPrimaryRecommendation(
        filteredSuggestions,
        userInfo,
        context,
      );

      const priceComparison = await this.calculatePriceComparisons(
        filteredSuggestions,
        route,
      );

      const timeComparison = this.calculateTimeComparisons(filteredSuggestions);

      return {
        primaryRecommendation,
        alternatives: filteredSuggestions.filter(
          (s) => s.id !== primaryRecommendation.id,
        ),
        priceComparison,
        timeComparison,
        personalizedFactors: {
          userPreferences: this.getUserPreferences(userInfo, context),
          historicalChoices: await this.getUserHistoricalChoices(userId),
          currentContext: this.getCurrentContextFactors(context, route),
        },
        confidence: this.calculateRecommendationConfidence(
          primaryRecommendation,
          userInfo,
        ),
      };
    } catch (error) {
      this.logger.error('Erro ao gerar recomendações inteligentes:', error);
      throw new BadRequestException('Erro ao gerar recomendações de corrida');
    }
  }

  async prepareRideConfirmation(
    userId: string,
    confirmationData: RideConfirmationData,
  ): Promise<{
    success: boolean;
    data: any;
    message: string;
  }> {
    try {
      await this.validateRideConfirmationData(confirmationData);

      const rideType = await this.rideTypesService.findRideTypeById(
        confirmationData.rideTypeId,
      );

      const availableDrivers = await this.findAvailableDriversForRideType(
        confirmationData.origin,
        confirmationData.rideTypeId,
        userId,
      );

      if (availableDrivers.length === 0) {
        return {
          success: false,
          data: null,
          message:
            'Nenhum motorista disponível no momento para este tipo de corrida',
        };
      }

      const finalPrice = await this.rideTypesService.calculateRidePrice({
        rideTypeId: confirmationData.rideTypeId,
        distance: confirmationData.estimatedDistance,
        duration: confirmationData.estimatedDuration,
        surgeMultiplier: await this.getCurrentSurgeMultiplier(
          confirmationData.origin,
        ),
        isPremiumTime: this.isPremiumTime(),
      });

      const selectedDriver = confirmationData.selectedDriverId
        ? availableDrivers.find(
            (d) => d.id === confirmationData.selectedDriverId,
          )
        : this.selectBestDriver(availableDrivers, confirmationData.origin);

      if (!selectedDriver) {
        return {
          success: false,
          data: null,
          message: 'Motorista selecionado não está mais disponível',
        };
      }

      const confirmationResponse = {
        rideType: {
          id: rideType.id,
          name: rideType.name,
          description: rideType.description,
          icon: rideType.icon,
        },
        route: {
          origin: confirmationData.origin,
          destination: confirmationData.destination,
          distance: confirmationData.estimatedDistance,
          duration: confirmationData.estimatedDuration,
        },
        pricing: {
          basePrice: finalPrice.basePrice,
          finalPrice: finalPrice.finalPrice,
          currency: finalPrice.currency,
          breakdown: finalPrice.breakdown,
          surge: finalPrice.surgeMultiplier > 1,
          surgeMultiplier: finalPrice.surgeMultiplier,
        },
        driver: {
          id: selectedDriver.id,
          name: `${selectedDriver.user.firstName} ${selectedDriver.user.lastName}`,
          rating: selectedDriver.averageRating,
          totalRides: selectedDriver.totalRides,
          profileImage: selectedDriver.user.profileImage,
          vehicle: selectedDriver.vehicle,
          estimatedArrival: selectedDriver.estimatedTime || 8,
          distance: selectedDriver.distance,
        },
        alternatives: availableDrivers
          .filter((d) => d.id !== selectedDriver.id)
          .slice(0, 2)
          .map((driver) => ({
            id: driver.id,
            name: `${driver.user.firstName} ${driver.user.lastName}`,
            rating: driver.averageRating,
            estimatedArrival: driver.estimatedTime || 10,
            vehicle: driver.vehicle,
          })),
        context: {
          hasPets: confirmationData.hasPets,
          specialRequirements: confirmationData.specialRequirements,
          scheduledTime: confirmationData.scheduledTime,
          isPremiumTime: this.isPremiumTime(),
        },
        confirmationToken: this.generateConfirmationToken(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutos
      };

      return {
        success: true,
        data: confirmationResponse,
        message: 'Dados de confirmação preparados com sucesso',
      };
    } catch (error) {
      this.logger.error('Erro ao preparar confirmação de corrida:', error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Erro interno',
      };
    }
  }

  async findAvailableDriversForRideType(
    location: Location,
    rideTypeId: string,
    userId?: string,
    radius = 10,
    limit = 10,
  ): Promise<DriverWithDistance[]> {
    try {
      const rideType = await this.rideTypesService.findRideTypeById(rideTypeId);

      let userGender: Gender | undefined;
      if (userId) {
        const userInfo = await this.getUserContext(userId);
        userGender = userInfo.gender;
      }

      const drivers = await this.findNearbyDriversForRideType({
        latitude: location.latitude,
        longitude: location.longitude,
        radius,
        limit: limit * 2,
        rideTypeId,
        userGender,
        requiresArmored: rideType.requiresArmored,
      });

      return this.rankDriversByRelevance(drivers, location, rideType);
    } catch (error) {
      this.logger.error(
        'Erro ao buscar motoristas para tipo de corrida:',
        error,
      );
      return [];
    }
  }

  private async getUserContext(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        passenger: true,
      },
    });

    return {
      id: userId,
      gender: user?.gender || Gender.PREFER_NOT_TO_SAY,
      prefersFemaleDriver: user?.passenger?.prefersFemaleDriver || false,
      specialNeeds: user?.passenger?.specialNeeds || false,
    };
  }

  private async enrichSuggestionsWithDriverInfo(
    suggestions: any[],
    route: RouteCalculation,
    origin: Location,
    userGender: Gender,
  ): Promise<any[]> {
    return Promise.all(
      suggestions.map(async (suggestion) => {
        try {
          // Calcular preço
          const pricing = await this.rideTypesService.calculateRidePrice({
            rideTypeId: suggestion.id,
            distance: route.distance,
            duration: route.duration,
            surgeMultiplier: suggestion.surgeMultiplier,
            isPremiumTime: this.isPremiumTime(),
          });

          // Buscar motoristas disponíveis
          const drivers = await this.findAvailableDriversForRideType(
            origin,
            suggestion.id,
            undefined,
            15,
            5,
          );

          return {
            ...suggestion,
            estimatedPrice: pricing.finalPrice,
            pricing,
            availableDrivers: drivers.length,
            nearestDriver: drivers[0] || null,
            estimatedArrival:
              drivers[0]?.estimatedTime || suggestion.availability.averageEta,
          };
        } catch (error) {
          return {
            ...suggestion,
            estimatedPrice: null,
            availableDrivers: 0,
            nearestDriver: null,
          };
        }
      }),
    );
  }

  private filterSuggestionsByContext(
    suggestions: any[],
    context: any,
    route: RouteCalculation,
  ): any[] {
    return suggestions.filter((suggestion) => {
      // Filtrar por distância máxima
      if (suggestion.maxDistance && route.distance > suggestion.maxDistance) {
        return false;
      }

      // Filtrar por distância mínima
      if (suggestion.minDistance && route.distance < suggestion.minDistance) {
        return false;
      }

      // Filtrar por disponibilidade
      if (suggestion.availableDrivers === 0) {
        return false;
      }

      // Filtrar por contexto específico
      if (context.isDelivery && !suggestion.isDeliveryOnly) {
        return false;
      }

      if (!context.isDelivery && suggestion.isDeliveryOnly) {
        return false;
      }

      return true;
    });
  }

  private selectPrimaryRecommendation(
    suggestions: any[],
    userInfo: any,
    context: any,
  ): any {
    if (suggestions.length === 0) {
      throw new BadRequestException('Nenhuma opção de corrida disponível');
    }

    // Aplicar pontuação baseada em preferências
    const scoredSuggestions = suggestions.map((suggestion) => {
      let score = suggestion.priority || 0;

      // Bonificar por contexto específico
      if (context.hasPets && suggestion.requiresPetFriendly) {
        score += 15;
      }

      if (userInfo.prefersFemaleDriver && suggestion.femaleOnly) {
        score += 10;
      }

      // Bonificar por disponibilidade
      score += Math.min(suggestion.availableDrivers * 2, 10);

      // Penalizar preços muito altos
      if (suggestion.estimatedPrice > 50) {
        score -= 10;
      }

      // Bonificar ETA baixo
      if (suggestion.estimatedArrival < 8) {
        score += 5;
      }

      return { ...suggestion, calculatedScore: score };
    });

    // Retornar a opção com maior pontuação
    return scoredSuggestions.sort(
      (a, b) => b.calculatedScore - a.calculatedScore,
    )[0];
  }

  private async calculatePriceComparisons(
    suggestions: any[],
    route: RouteCalculation,
  ): Promise<any[]> {
    const comparisons = suggestions.map((suggestion) => ({
      rideTypeId: suggestion.id,
      rideTypeName: suggestion.name,
      estimatedPrice: suggestion.estimatedPrice || 0,
      estimatedTime: suggestion.estimatedArrival || 8,
      vehicleTypes: suggestion.vehicleTypes,
      savings: 0,
      savingsPercentage: 0,
    }));

    // Calcular economias
    const maxPrice = Math.max(...comparisons.map((c) => c.estimatedPrice));
    comparisons.forEach((comp) => {
      comp.savings = maxPrice - comp.estimatedPrice;
      comp.savingsPercentage =
        maxPrice > 0 ? (comp.savings / maxPrice) * 100 : 0;
    });

    return comparisons.sort((a, b) => a.estimatedPrice - b.estimatedPrice);
  }

  private calculateTimeComparisons(suggestions: any[]): any[] {
    return suggestions.map((suggestion) => ({
      rideTypeId: suggestion.id,
      estimatedPickupTime: suggestion.estimatedArrival || 8,
      estimatedTotalTime:
        (suggestion.estimatedArrival || 8) +
        Math.round((suggestion.route?.duration || 0) / 60),
    }));
  }

  private getUserPreferences(userInfo: any, context: any): string[] {
    const preferences: string[] = [];

    if (userInfo.prefersFemaleDriver) {
      preferences.push('Prefere motoristas mulheres');
    }

    if (userInfo.hasPets || context.hasPets) {
      preferences.push('Viaja com pets');
    }

    if (userInfo.specialNeeds) {
      preferences.push('Necessidades especiais');
    }

    return preferences;
  }

  private async getUserHistoricalChoices(userId: string): Promise<string[]> {
    try {
      const recentRides = await this.prisma.ride.findMany({
        where: {
          passenger: { userId },
          status: 'COMPLETED',
        },
        include: {
          RideTypeConfig: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      const typeFrequency = recentRides.reduce(
        (acc, ride) => {
          const typeName = ride.RideTypeConfig?.name || 'Desconhecido';
          acc[typeName] = (acc[typeName] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      return Object.entries(typeFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([type]) => `Usa frequentemente: ${type}`);
    } catch (error) {
      return [];
    }
  }

  private getCurrentContextFactors(
    context: any,
    route: RouteCalculation,
  ): string[] {
    const factors: string[] = [];

    if (context.scheduledTime) {
      factors.push('Corrida agendada');
    }

    if (route.distance > 20000) {
      factors.push('Viagem longa');
    }

    if (this.isPremiumTime()) {
      factors.push('Horário de pico');
    }

    if (context.specialRequirements) {
      factors.push('Requisitos especiais');
    }

    return factors;
  }

  private calculateRecommendationConfidence(
    recommendation: any,
    userInfo: any,
  ): number {
    let confidence = 0.5; // Base 50%

    // Aumentar confiança por disponibilidade
    if (recommendation.availableDrivers > 5) {
      confidence += 0.2;
    } else if (recommendation.availableDrivers > 2) {
      confidence += 0.1;
    }

    // Aumentar confiança por match de preferências
    if (userInfo.prefersFemaleDriver && recommendation.femaleOnly) {
      confidence += 0.15;
    }

    // Aumentar confiança por ETA baixo
    if (recommendation.estimatedArrival < 5) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  private async validateRideConfirmationData(
    data: RideConfirmationData,
  ): Promise<void> {
    if (!data.origin || !data.destination) {
      throw new BadRequestException('Origem e destino são obrigatórios');
    }

    if (data.estimatedDistance < 100) {
      throw new BadRequestException('Distância muito pequena');
    }

    if (data.estimatedDuration < 60) {
      throw new BadRequestException('Duração muito pequena');
    }

    // Validar tipo de corrida
    await this.rideTypesService.findRideTypeById(data.rideTypeId);
  }

  private async getCurrentSurgeMultiplier(location: Location): Promise<number> {
    // Implementar lógica de surge baseada na localização e horário
    const hour = new Date().getHours();
    const day = new Date().getDay();

    let surge = 1.0;

    // Horário de pico
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      surge += 0.3;
    }

    // Final de semana à noite
    if ((day === 5 || day === 6) && hour >= 22) {
      surge += 0.2;
    }

    return Math.min(surge, 2.5);
  }

  private isPremiumTime(): boolean {
    const hour = new Date().getHours();
    return (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
  }

  private selectBestDriver(
    drivers: DriverWithDistance[],
    origin: Location,
  ): DriverWithDistance {
    return drivers.sort((a, b) => {
      // Priorizar por: rating > proximidade > tempo de resposta
      const ratingDiff = (b.averageRating || 0) - (a.averageRating || 0);
      if (Math.abs(ratingDiff) > 0.2) {
        return ratingDiff > 0 ? 1 : -1;
      }

      const distanceDiff = (a.distance || 0) - (b.distance || 0);
      if (Math.abs(distanceDiff) > 1) {
        return distanceDiff;
      }

      return (a.estimatedTime || 0) - (b.estimatedTime || 0);
    })[0];
  }

  private rankDriversByRelevance(
    drivers: DriverWithDistance[],
    origin: Location,
    rideType: any,
  ): DriverWithDistance[] {
    return drivers
      .map((driver) => {
        let relevanceScore = 0;

        // Pontuação por rating
        relevanceScore += (driver.averageRating || 0) * 10;

        // Pontuação por proximidade (inversa)
        relevanceScore += Math.max(0, 50 - (driver.distance || 0) * 2);

        // Pontuação por experiência
        relevanceScore += Math.min((driver.totalRides || 0) / 10, 20);

        // Penalizar se está muito longe
        if ((driver.distance || 0) > 15) {
          relevanceScore -= 30;
        }

        return { ...driver, relevanceScore };
      })
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, 10);
  }

  private generateConfirmationToken(): string {
    return `conf_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  async findNearbyDrivers(
    request: NearbyDriversRequest,
  ): Promise<DriverWithDistance[]> {
    const { latitude, longitude, radius = 10, limit = 10 } = request;

    try {
      const drivers = await this.prisma.driver.findMany({
        where: {
          isOnline: true,
          isAvailable: true,
          accountStatus: 'APPROVED',
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              gender: true,
            },
          },
          vehicle: {
            select: {
              model: true,
              color: true,
              licensePlate: true,
              vehicleType: true,
              carImageUrl: true,
              isArmored: true,
              isLuxury: true,
              isMotorcycle: true,
              deliveryCapable: true,
            },
          },
          driverRideTypes: {
            where: { isActive: true },
            include: {
              rideType: true,
            },
          },
        },
        take: limit * 2,
      });

      const driversWithCoords = drivers.filter(
        (driver) => driver.currentLatitude && driver.currentLongitude,
      );

      // Processar motoristas reais com coordenadas
      const nearbyDrivers: DriverWithDistance[] = [];

      for (const driver of driversWithCoords) {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          driver.currentLatitude!,
          driver.currentLongitude!,
        );

        if (distance <= radius) {
          nearbyDrivers.push({
            id: driver.id,
            userId: driver.userId,
            user: driver.user,
            vehicle: driver.vehicle
              ? {
                  ...driver.vehicle,
                  carImageUrl: driver.vehicle.carImageUrl || undefined,
                }
              : null,
            averageRating: driver.averageRating,
            totalRides: driver.totalRides,
            latitude: driver.currentLatitude!,
            longitude: driver.currentLongitude!,
            distance,
            estimatedTime: Math.round(distance * 2 + Math.random() * 5),
          });
        }
      }

      nearbyDrivers.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      const result = nearbyDrivers.slice(0, limit);

      if (nearbyDrivers.length > 0) {
        this.logger.log(
          `Encontrados ${nearbyDrivers.length} motoristas reais próximos`,
        );
        return nearbyDrivers;
      }

      this.logger.warn(
        'Nenhum motorista real próximo encontrado. Retornando lista vazia.',
      );

      return [];
    } catch (error) {
      this.logger.error('Erro ao buscar motoristas próximos:', error);
      return [];
    }
  }

  async findNearbyDriversForRideType(
    request: NearbyDriversRequest & {
      rideTypeId?: string;
      userGender?: Gender;
      requiresArmored?: boolean;
    },
  ): Promise<DriverWithDistance[]> {
    const {
      latitude,
      longitude,
      radius = 10,
      limit = 10,
      rideTypeId,
      userGender,
      requiresArmored = false,
    } = request;

    try {
      const driverFilters: any = {
        isOnline: true,
        isAvailable: true,
        accountStatus: 'APPROVED',
        currentLatitude: { not: null },
        currentLongitude: { not: null },
      };

      if (rideTypeId) {
        driverFilters.driverRideTypes = {
          some: {
            rideTypeId,
            isActive: true,
          },
        };
      }

      const rideType = rideTypeId
        ? await this.prisma.rideTypeConfig.findUnique({
            where: { id: rideTypeId },
          })
        : null;

      if (rideType?.femaleOnly) {
        driverFilters.user = {
          gender: Gender.FEMALE,
        };
      }

      if (requiresArmored || rideType?.requiresArmored) {
        driverFilters.vehicle = {
          isArmored: true,
        };
      }

      const drivers = await this.prisma.driver.findMany({
        where: driverFilters,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              gender: true,
            },
          },
          vehicle: {
            select: {
              model: true,
              color: true,
              licensePlate: true,
              vehicleType: true,
              carImageUrl: true,
              isArmored: true,
              isLuxury: true,
              isMotorcycle: true,
              deliveryCapable: true,
            },
          },
          driverRideTypes: {
            where: { isActive: true },
            include: {
              rideType: true,
            },
          },
        },
        take: limit * 2,
      });

      if (drivers.length > 0) {
        const nearbyDrivers: DriverWithDistance[] = [];

        for (const driver of drivers) {
          const distance = this.calculateDistance(
            latitude,
            longitude,
            driver.currentLatitude!,
            driver.currentLongitude!,
          );

          if (distance <= radius) {
            nearbyDrivers.push({
              id: driver.id,
              userId: driver.userId,
              user: driver.user,
              vehicle: driver.vehicle
                ? {
                    ...driver.vehicle,
                    carImageUrl: driver.vehicle.carImageUrl || undefined,
                  }
                : null,
              averageRating: driver.averageRating,
              totalRides: driver.totalRides,
              latitude: driver.currentLatitude!,
              longitude: driver.currentLongitude!,
              distance,
              estimatedTime: Math.round(distance * 2 + Math.random() * 5),
            });
          }
        }

        nearbyDrivers.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        return nearbyDrivers.slice(0, limit);
      }

      return [];
    } catch (error) {
      this.logger.error('Erro ao buscar motoristas por tipo:', error);
      return [];
    }
  }

  async calculateRoute(
    request: CalculateRouteRequest,
  ): Promise<RouteCalculation> {
    const { origin, destination, waypoints } = request;

    try {
      const routesResult = await this.calculateRouteWithRoutesAPI(
        origin,
        destination,
        waypoints,
      );
      if (routesResult) {
        return routesResult;
      }
    } catch (error) {
      this.logger.warn('Routes API falhou, tentando Directions API:', error);
    }

    try {
      return await this.calculateRouteWithDirectionsAPI(
        origin,
        destination,
        waypoints,
      );
    } catch (error) {
      this.logger.error('Erro ao calcular rota:', error);
      const distance =
        this.calculateDistance(
          origin.latitude,
          origin.longitude,
          destination.latitude,
          destination.longitude,
        ) * 1000;

      const duration = (distance / 1000 / 40) * 3600;

      return {
        distance,
        duration,
      };
    }
  }

  calculateBasePrice(request: CalculatePriceRequest): number {
    const {
      distance,
      duration,
      vehicleType = 'ECONOMY',
      surgeMultiplier = 1,
    } = request;

    const baseRates: BaseRates = {
      ECONOMY: { base: 8.0, perKm: 2.5, perMinute: 0.5 },
      COMFORT: { base: 12.0, perKm: 3.0, perMinute: 0.6 },
      LUXURY: { base: 18.0, perKm: 4.0, perMinute: 0.8 },
      SUV: { base: 15.0, perKm: 3.5, perMinute: 0.7 },
      VAN: { base: 20.0, perKm: 4.5, perMinute: 0.9 },
    };

    const rates = baseRates[vehicleType] || baseRates.ECONOMY;

    const distanceKm = distance / 1000;
    const durationMinutes = duration / 60;

    let price =
      rates.base + distanceKm * rates.perKm + durationMinutes * rates.perMinute;

    price *= surgeMultiplier;

    const minimumPrice = rates.base * 1.5;
    price = Math.max(price, minimumPrice);

    return Math.round(price * 100) / 100;
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    if (!this.googleApiKey) {
      this.logger.warn('Google API Key não configurada para geocodificação');
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.googleApiKey}&language=pt-BR`;

      const response = await fetch(url);
      const data = (await response.json()) as GoogleGeocodeApiResponse;

      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      }

      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    } catch (error) {
      this.logger.warn('Erro na geocodificação reversa:', error);
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private async calculateRouteWithRoutesAPI(
    origin: Location,
    destination: Location,
    waypoints?: Location[],
  ): Promise<RouteCalculation | null> {
    if (!this.googleApiKey) {
      this.logger.warn(
        'Google API Key não configurada, usando cálculo estimado',
      );
      const distance =
        this.calculateDistance(
          origin.latitude,
          origin.longitude,
          destination.latitude,
          destination.longitude,
        ) * 1000;
      const duration = (distance / 1000 / 40) * 3600;
      return { distance, duration };
    }

    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const body: GoogleRoutesApiRequest = {
      origin: {
        location: {
          latLng: {
            latitude: origin.latitude,
            longitude: origin.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        },
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE',
      units: 'METRIC',
    };

    if (waypoints && waypoints.length > 0) {
      body.intermediates = waypoints.map((point) => ({
        location: {
          latLng: {
            latitude: point.latitude,
            longitude: point.longitude,
          },
        },
      }));
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.googleApiKey,
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Routes API error: ${response.status}`);
    }

    const data = (await response.json()) as GoogleRoutesApiResponse;

    if (!data.routes || data.routes.length === 0) {
      return null;
    }

    const route = data.routes[0];
    return {
      distance: route.distanceMeters,
      duration: parseInt(route.duration.replace('s', '')),
      polyline: route.polyline?.encodedPolyline,
    };
  }

  private async calculateRouteWithDirectionsAPI(
    origin: Location,
    destination: Location,
    waypoints?: Location[],
  ): Promise<RouteCalculation> {
    if (!this.googleApiKey) {
      throw new Error('Google API Key não configurada');
    }
    let url = `https://maps.googleapis.com/maps/api/directions/json?`;
    url += `origin=${origin.latitude},${origin.longitude}`;
    url += `&destination=${destination.latitude},${destination.longitude}`;

    if (waypoints && waypoints.length > 0) {
      const waypointsStr = waypoints
        .map((point) => `${point.latitude},${point.longitude}`)
        .join('|');
      url += `&waypoints=${waypointsStr}`;
    }

    url += `&key=${this.googleApiKey}`;
    url += `&mode=driving`;
    url += `&departure_time=now`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Directions API error: ${response.status}`);
    }

    const data = (await response.json()) as GoogleDirectionsApiResponse;

    if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
      throw new Error(`Directions API error: ${data.status}`);
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance.value,
      duration: leg.duration.value,
      polyline: route.overview_polyline?.points,
    };
  }
}
