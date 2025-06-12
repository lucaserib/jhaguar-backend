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

// Interfaces agora são importadas do arquivo de interfaces

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
          currentLatitude: { not: null },
          currentLongitude: { not: null },
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
            },
          },
          vehicle: {
            select: {
              model: true,
              color: true,
              licensePlate: true,
              vehicleType: true,
            },
          },
        },
        take: limit * 2,
      });

      const driversWithDistance = drivers
        .map((driver) => {
          const distance = this.calculateDistance(
            latitude,
            longitude,
            driver.currentLatitude!,
            driver.currentLongitude!,
          );

          return {
            id: driver.id,
            userId: driver.userId,
            latitude: driver.currentLatitude!,
            longitude: driver.currentLongitude!,
            user: driver.user,
            vehicle: driver.vehicle,
            averageRating: driver.averageRating,
            totalRides: driver.totalRides,
            distance,
          };
        })
        .filter((driver) => driver.distance <= radius)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);

      const driversWithEstimates = await Promise.all(
        driversWithDistance.map(async (driver) => {
          try {
            const route = await this.calculateRoute({
              origin: {
                latitude: driver.latitude,
                longitude: driver.longitude,
              },
              destination: { latitude, longitude },
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
            const estimatedTime = Math.ceil((driver.distance / 40) * 60); // 40km/h médio
            const estimatedPrice = this.calculateBasePrice({
              distance: driver.distance * 1000,
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

      return driversWithEstimates;
    } catch (error) {
      this.logger.error('Erro ao buscar motoristas próximos:', error);
      throw error;
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
      throw new Error('Google API Key não configurada');
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
      ECONOMY: { base: 5.0, perKm: 2.5, perMinute: 0.5 },
      COMFORT: { base: 7.0, perKm: 3.0, perMinute: 0.6 },
      LUXURY: { base: 10.0, perKm: 4.0, perMinute: 0.8 },
      SUV: { base: 8.0, perKm: 3.5, perMinute: 0.7 },
      VAN: { base: 12.0, perKm: 4.5, perMinute: 0.9 },
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
