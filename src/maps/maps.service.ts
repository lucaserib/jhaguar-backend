import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
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
} from './interfaces/maps.interfaces';
import { RideTypeEnum, Gender, VehicleType } from '@prisma/client';

@Injectable()
export class MapsService {
  private readonly logger = new Logger(MapsService.name);
  private readonly googleApiKey: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.googleApiKey =
      this.configService.get<string>('GOOGLE_API_KEY') ||
      this.configService.get<string>('EXPO_PUBLIC_GOOGLE_API_KEY') ||
      '';
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
          User: {
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
          supportedRideTypes: {
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

      if (driversWithCoords.length > 0) {
        const nearbyDrivers = await this.processRealDrivers(
          driversWithCoords,
          latitude,
          longitude,
          radius,
          limit,
        );

        if (nearbyDrivers.length > 0) {
          this.logger.log(
            `Encontrados ${nearbyDrivers.length} motoristas reais próximos`,
          );
          return nearbyDrivers;
        }
      }

      this.logger.warn(
        'Nenhum motorista real próximo encontrado. Gerando motoristas simulados...',
      );
      //TODO: Implementar busca de motorisras reais apenas para produção.
      if (drivers.length > 0) {
        return this.generateSimulatedDriversFromReal(
          drivers,
          latitude,
          longitude,
          limit,
        );
      }

      return this.generateDynamicDummyDrivers(latitude, longitude, limit);
    } catch (error) {
      this.logger.error('Erro ao buscar motoristas próximos:', error);
      // Em caso de erro, sempre retornar motoristas simulados
      //Retirar em produção.
      return this.generateDynamicDummyDrivers(latitude, longitude, limit);
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
        driverFilters.supportedRideTypes = {
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
          User: {
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
          supportedRideTypes: {
            where: { isActive: true },
            include: {
              rideType: true,
            },
          },
        },
        take: limit * 2,
      });

      if (drivers.length > 0) {
        return this.processRealDrivers(
          drivers,
          latitude,
          longitude,
          radius,
          limit,
        );
      }

      return this.generateDynamicDummyDrivers(latitude, longitude, limit);
    } catch (error) {
      this.logger.error('Erro ao buscar motoristas por tipo:', error);
      return this.generateDynamicDummyDrivers(latitude, longitude, limit);
    }
  }

  private async processRealDrivers(
    drivers: any[],
    userLat: number,
    userLng: number,
    radius: number,
    limit: number,
  ): Promise<DriverWithDistance[]> {
    const driversWithDistance = drivers
      .map((driver) => {
        const distance = this.calculateDistance(
          userLat,
          userLng,
          driver.currentLatitude!,
          driver.currentLongitude!,
        );

        return {
          id: driver.id,
          userId: driver.userId,
          latitude: driver.currentLatitude!,
          longitude: driver.currentLongitude!,
          user: driver.User?.[0],
          vehicle: driver.vehicle,
          averageRating: driver.averageRating,
          totalRides: driver.totalRides,
          distance,
          supportedRideTypes:
            driver.supportedRideTypes?.map((srt: any) => srt.rideType) || [],
        };
      })
      .filter((driver) => driver.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return this.addEstimates(driversWithDistance, userLat, userLng);
  }

  private async generateSimulatedDriversFromReal(
    drivers: any[],
    userLat: number,
    userLng: number,
    limit: number,
  ): Promise<DriverWithDistance[]> {
    const simulatedDrivers = drivers.slice(0, limit).map((driver, index) => {
      const angle = (index * (360 / limit)) % 360;
      const distance = 0.5 + Math.random() * 2;

      const { lat: driverLat, lng: driverLng } = this.generatePointAtDistance(
        userLat,
        userLng,
        distance,
        angle,
      );

      return {
        id: driver.id,
        userId: driver.userId,
        latitude: driverLat,
        longitude: driverLng,
        user: driver.User?.[0],
        vehicle: driver.vehicle || {
          model: 'Carro Popular',
          color: 'Prata',
          licensePlate: `SIM-${index}A${Math.floor(Math.random() * 100)}`,
          vehicleType: 'ECONOMY',
          carImageUrl:
            driver.vehicle?.carImageUrl ||
            'https://cdn.imagin.studio/getimage?customer=img&make=volkswagen&modelFamily=gol',
          isArmored: false,
          isLuxury: false,
          isMotorcycle: false,
          deliveryCapable: true,
        },
        averageRating: driver.averageRating || 4.5 + Math.random() * 0.5,
        totalRides: driver.totalRides || Math.floor(Math.random() * 500) + 50,
        distance,
        supportedRideTypes:
          driver.supportedRideTypes?.map((srt: any) => srt.rideType) || [],
      };
    });

    return this.addEstimates(simulatedDrivers, userLat, userLng);
  }

  private generateDynamicDummyDrivers(
    userLat: number,
    userLng: number,
    limit: number,
  ): DriverWithDistance[] {
    const brazilianNames = [
      { firstName: 'João', lastName: 'Silva', gender: 'male' },
      { firstName: 'Maria', lastName: 'Santos', gender: 'female' },
      { firstName: 'Pedro', lastName: 'Oliveira', gender: 'male' },
      { firstName: 'Ana', lastName: 'Costa', gender: 'female' },
      { firstName: 'Carlos', lastName: 'Pereira', gender: 'male' },
      { firstName: 'Juliana', lastName: 'Rodrigues', gender: 'female' },
      { firstName: 'Lucas', lastName: 'Almeida', gender: 'male' },
      { firstName: 'Fernanda', lastName: 'Lima', gender: 'female' },
      { firstName: 'Rafael', lastName: 'Souza', gender: 'male' },
      { firstName: 'Patricia', lastName: 'Ferreira', gender: 'female' },
    ];

    const vehicles = [
      {
        make: 'Volkswagen',
        model: 'Gol',
        type: 'ECONOMY',
        isLuxury: false,
        isArmored: false,
      },
      {
        make: 'Chevrolet',
        model: 'Onix',
        type: 'ECONOMY',
        isLuxury: false,
        isArmored: false,
      },
      {
        make: 'Fiat',
        model: 'Mobi',
        type: 'ECONOMY',
        isLuxury: false,
        isArmored: false,
      },
      {
        make: 'Honda',
        model: 'Civic',
        type: 'COMFORT',
        isLuxury: false,
        isArmored: false,
      },
      {
        make: 'Toyota',
        model: 'Corolla',
        type: 'COMFORT',
        isLuxury: false,
        isArmored: false,
      },
      {
        make: 'BMW',
        model: 'Série 3',
        type: 'LUXURY',
        isLuxury: true,
        isArmored: false,
      },
      {
        make: 'Mercedes',
        model: 'Classe C',
        type: 'LUXURY',
        isLuxury: true,
        isArmored: false,
      },
      {
        make: 'Toyota',
        model: 'Hilux SW4 Blindada',
        type: 'ARMORED_CAR',
        isLuxury: false,
        isArmored: true,
      },
      {
        make: 'Honda',
        model: 'CG 160',
        type: 'MOTORCYCLE',
        isLuxury: false,
        isArmored: false,
      },
      {
        make: 'Yamaha',
        model: 'Fazer 250',
        type: 'MOTORCYCLE',
        isLuxury: false,
        isArmored: false,
      },
    ];

    const colors = ['Prata', 'Branco', 'Preto', 'Vermelho', 'Azul', 'Cinza'];

    return Array.from({ length: limit }, (_, index) => {
      const nameData = brazilianNames[index % brazilianNames.length];
      const vehicle = vehicles[index % vehicles.length];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const angle = (index * (360 / limit)) % 360;
      const distance = 0.5 + Math.random() * 3;

      const { lat: driverLat, lng: driverLng } = this.generatePointAtDistance(
        userLat,
        userLng,
        distance,
        angle,
      );

      const estimatedTime = Math.max(
        3,
        Math.round(distance * 2 + Math.random() * 5),
      );
      const estimatedPrice =
        Math.round((15 + distance * 3 + Math.random() * 10) * 100) / 100;

      const imageId = Math.floor(Math.random() * 100) + 1;

      return {
        id: `dummy-${index + 1}`,
        userId: `user-dummy-${index + 1}`,
        latitude: driverLat,
        longitude: driverLng,
        user: {
          firstName: nameData.firstName,
          lastName: nameData.lastName,
          profileImage: `https://randomuser.me/api/portraits/${nameData.gender === 'male' ? 'men' : 'women'}/${imageId}.jpg`,
          gender: nameData.gender === 'male' ? Gender.MALE : Gender.FEMALE,
        },
        vehicle: {
          model: `${vehicle.make} ${vehicle.model}`,
          color: color,
          licensePlate: `DYN-${Math.floor(1000 + Math.random() * 8999)}`,
          vehicleType: vehicle.type as VehicleType,
          carImageUrl: `https://cdn.imagin.studio/getimage?customer=img&make=${vehicle.make.toLowerCase()}&modelFamily=${vehicle.model.toLowerCase().split(' ')[0]}`,
          isArmored: vehicle.isArmored,
          isLuxury: vehicle.isLuxury,
          isMotorcycle: vehicle.type === 'MOTORCYCLE',
          deliveryCapable: Math.random() > 0.5,
        },
        averageRating: Number((4.0 + Math.random() * 1).toFixed(1)),
        totalRides: Math.floor(Math.random() * 500) + 50,
        distance,
        estimatedTime,
        estimatedPrice,
        supportedRideTypes: this.generateRandomSupportedTypes(
          vehicle.type as VehicleType,
          nameData.gender,
        ),
      };
    });
  }

  private generateRandomSupportedTypes(
    vehicleType: VehicleType,
    gender: string,
  ) {
    const allTypes: Array<{
      id: string;
      type: RideTypeEnum;
      name: string;
      icon: string;
    }> = [
      {
        id: '1',
        type: RideTypeEnum.STANDARD,
        name: 'Corrida Padrão',
        icon: '🚗',
      },
      { id: '2', type: RideTypeEnum.EXPRESS, name: 'Express', icon: '⚡' },
      { id: '3', type: RideTypeEnum.SCHEDULED, name: 'Agendada', icon: '📅' },
      { id: '4', type: RideTypeEnum.SHARED, name: 'Compartilhada', icon: '👥' },
    ];

    if (vehicleType === VehicleType.LUXURY) {
      allTypes.push({
        id: '5',
        type: RideTypeEnum.LUXURY,
        name: 'Luxo',
        icon: '💎',
      });
    }

    if (vehicleType === VehicleType.ARMORED_CAR) {
      allTypes.push({
        id: '6',
        type: RideTypeEnum.ARMORED,
        name: 'Blindado',
        icon: '🛡️',
      });
    }

    if (vehicleType === VehicleType.MOTORCYCLE) {
      allTypes.push(
        { id: '7', type: RideTypeEnum.MOTORCYCLE, name: 'Moto', icon: '🏍️' },
        { id: '8', type: RideTypeEnum.DELIVERY, name: 'Entrega', icon: '📦' },
      );
    }

    if (gender === 'female') {
      allTypes.push({
        id: '9',
        type: RideTypeEnum.FEMALE_ONLY,
        name: 'Mulheres',
        icon: '👩',
      });
    }

    const shuffled = allTypes.sort(() => 0.5 - Math.random());
    const count = Math.min(Math.floor(Math.random() * 3) + 2, allTypes.length);
    return shuffled.slice(0, count);
  }

  private generatePointAtDistance(
    lat: number,
    lng: number,
    distanceKm: number,
    bearing: number,
  ): { lat: number; lng: number } {
    const R = 6371;
    const bearingRad = bearing * (Math.PI / 180);
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);

    const newLatRad = Math.asin(
      Math.sin(latRad) * Math.cos(distanceKm / R) +
        Math.cos(latRad) * Math.sin(distanceKm / R) * Math.cos(bearingRad),
    );

    const newLngRad =
      lngRad +
      Math.atan2(
        Math.sin(bearingRad) * Math.sin(distanceKm / R) * Math.cos(latRad),
        Math.cos(distanceKm / R) - Math.sin(latRad) * Math.sin(newLatRad),
      );

    return {
      lat: newLatRad * (180 / Math.PI),
      lng: newLngRad * (180 / Math.PI),
    };
  }

  private async addEstimates(
    drivers: DriverWithDistance[],
    userLat: number,
    userLng: number,
  ): Promise<DriverWithDistance[]> {
    return Promise.all(
      drivers.map(async (driver) => {
        try {
          const route = await this.calculateRoute({
            origin: {
              latitude: driver.latitude,
              longitude: driver.longitude,
            },
            destination: { latitude: userLat, longitude: userLng },
          });

          const estimatedTime = Math.ceil(route.duration / 60);
          const estimatedPrice = this.calculateBasePrice({
            distance: route.distance,
            duration: route.duration,
          });

          return {
            ...driver,
            estimatedTime,
            estimatedPrice,
          };
        } catch (error) {
          this.logger.warn(
            `Erro ao calcular rota para motorista ${driver.id}:`,
            error,
          );
          const distance =
            driver.distance ||
            this.calculateDistance(
              driver.latitude,
              driver.longitude,
              userLat,
              userLng,
            );
          const estimatedTime = Math.ceil((distance / 40) * 60);
          const estimatedPrice = this.calculateBasePrice({
            distance: distance * 1000,
            duration: estimatedTime * 60,
          });

          return {
            ...driver,
            estimatedTime,
            estimatedPrice,
          };
        }
      }),
    );
  }

  async calculatePriceForRideType(
    rideTypeId: string,
    distance: number,
    duration: number,
    surgeMultiplier = 1.0,
    isPremiumTime = false,
  ): Promise<{
    finalPrice: number;
    breakdown: any;
  }> {
    try {
      const rideType = await this.prisma.rideTypeConfig.findUnique({
        where: { id: rideTypeId },
      });

      if (!rideType) {
        return {
          finalPrice: this.calculateBasePrice({ distance, duration }),
          breakdown: {
            error: 'Tipo de corrida não encontrado, usando cálculo padrão',
          },
        };
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
        breakdown: {
          rideType: rideType.name,
          basePrice: rideType.basePrice,
          distanceCost: Math.round(distanceCost * 100) / 100,
          timeCost: Math.round(timeCost * 100) / 100,
          surgeMultiplier: appliedSurge,
          premiumFee: Math.round(premiumFee * 100) / 100,
          minimumPrice: rideType.minimumPrice,
          distance: distanceKm,
          duration: durationMinutes,
          isPremiumTime,
        },
      };
    } catch (error) {
      this.logger.error('Erro ao calcular preço por tipo:', error);
      return {
        finalPrice: this.calculateBasePrice({ distance, duration }),
        breakdown: {
          error: 'Erro no cálculo, usando preço padrão',
        },
      };
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
}
