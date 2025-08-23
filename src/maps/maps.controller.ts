import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  BadRequestException,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { MapsService } from './maps.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import {
  FindNearbyDriversDto,
  CalculateRouteDto,
  CalculatePriceDto,
  NearbyDriversResponse,
  RouteResponse,
  PriceResponse,
  GeocodeResponse,
} from './dto';
import { NearbyDriversDto } from './dto/nearby-drivers.dto';
import { CalculateRouteNewDto } from './dto/calculate-route-new.dto';
import { Gender } from '@prisma/client';

@ApiTags('Maps & Localização')
@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post('smart-recommendations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter recomendações inteligentes de corrida',
    description:
      'Endpoint principal que retorna sugestões personalizadas de tipos de corrida com preços, motoristas disponíveis e recomendações baseadas no perfil do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Recomendações geradas com sucesso',
  })
  async getSmartRideRecommendations(
    @Body()
    requestData: {
      origin: { latitude: number; longitude: number };
      destination: { latitude: number; longitude: number };
      context?: {
        isDelivery?: boolean;
        hasPets?: boolean;
        prefersFemaleDriver?: boolean;
        scheduledTime?: string;
        specialRequirements?: string;
      };
    },
    @User() user: any,
  ) {
    try {
      const recommendations =
        await this.mapsService.getSmartRideRecommendations(
          user.id,
          requestData.origin,
          requestData.destination,
          {
            ...requestData.context,
            scheduledTime: requestData.context?.scheduledTime
              ? new Date(requestData.context.scheduledTime)
              : undefined,
          },
        );

      return {
        success: true,
        data: recommendations,
        message: 'Recomendações geradas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao gerar recomendações',
      };
    }
  }

  @Post('prepare-ride-confirmation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Preparar dados para tela de confirmação',
    description:
      'Valida os dados da corrida e prepara informações detalhadas para a tela de confirmação',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados de confirmação preparados com sucesso',
  })
  async prepareRideConfirmation(
    @Body()
    confirmationData: {
      origin: { latitude: number; longitude: number; address: string };
      destination: { latitude: number; longitude: number; address: string };
      rideTypeId: string;
      estimatedDistance: number;
      estimatedDuration: number;
      selectedDriverId?: string;
      scheduledTime?: string;
      specialRequirements?: string;
      hasPets?: boolean;
      petDescription?: string;
    },
    @User() user: any,
  ) {
    try {
      const confirmation = await this.mapsService.prepareRideConfirmation(
        user.id,
        {
          ...confirmationData,
          estimatedPrice: 0,
          scheduledTime: confirmationData.scheduledTime
            ? new Date(confirmationData.scheduledTime)
            : undefined,
        },
      );

      return confirmation;
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao preparar confirmação',
      };
    }
  }

  @Post('nearby-drivers')
  @Throttle({ default: { limit: 200, ttl: 10000 } })
  @ApiOperation({
    summary: 'Buscar motoristas próximos',
    description:
      'Busca motoristas disponíveis próximos a uma localização específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas próximos retornada com sucesso',
    type: NearbyDriversResponse,
  })
  async findNearbyDrivers(@Body() findNearbyDriversDto: FindNearbyDriversDto) {
    try {
      const drivers =
        await this.mapsService.findNearbyDrivers(findNearbyDriversDto);

      return {
        success: true,
        data: drivers,
        count: drivers.length,
        message: `${drivers.length} motoristas encontrados`,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar motoristas próximos',
      };
    }
  }

  @Post('nearby-drivers/by-ride-type')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar motoristas para tipo específico de corrida',
    description:
      'Busca motoristas que suportam um tipo específico de corrida e atendem aos requisitos',
  })
  @ApiResponse({
    status: 200,
    description: 'Motoristas encontrados para o tipo de corrida',
  })
  async findNearbyDriversForRideType(
    @Body()
    findNearbyDriversDto: FindNearbyDriversDto & {
      rideTypeId: string;
      requiresArmored?: boolean;
    },
    @User() user: any,
  ) {
    try {
      const drivers = await this.mapsService.findAvailableDriversForRideType(
        {
          latitude: findNearbyDriversDto.latitude,
          longitude: findNearbyDriversDto.longitude,
        },
        findNearbyDriversDto.rideTypeId,
        user.id,
        findNearbyDriversDto.radius,
        findNearbyDriversDto.limit,
      );

      return {
        success: true,
        data: drivers,
        count: drivers.length,
        rideTypeId: findNearbyDriversDto.rideTypeId,
        message: `${drivers.length} motoristas encontrados para este tipo de corrida`,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar motoristas para tipo de corrida',
      };
    }
  }

  @Post('calculate-route')
  @Throttle({ default: { limit: 30, ttl: 3000 } })
  @ApiOperation({
    summary: 'Calcular rota entre dois pontos',
    description:
      'Calcula a melhor rota, distância e tempo estimado entre origem e destino',
  })
  @ApiResponse({
    status: 200,
    description: 'Rota calculada com sucesso',
    type: RouteResponse,
  })
  async calculateRoute(@Body() calculateRouteDto: CalculateRouteDto) {
    try {
      const route = await this.mapsService.calculateRoute(calculateRouteDto);

      return {
        success: true,
        data: route,
        message: 'Rota calculada com sucesso',
      };
    } catch (error) {
      // Em caso de falha de provedor externo, retornar 502 compatível
      throw new (require('@nestjs/common').BadGatewayException)(
        'Falha ao calcular rota com provedor externo',
      );
    }
  }

  @Post('calculate-price')
  @Throttle({ default: { limit: 100, ttl: 1000 } })
  @ApiOperation({
    summary: 'Calcular preço para uma corrida',
    description: 'Calcula o preço estimado para uma corrida específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Preço calculado com sucesso',
    type: PriceResponse,
  })
  async calculatePrice(@Body() calculatePriceDto: CalculatePriceDto) {
    try {
      const price = await this.mapsService.calculatePrice(calculatePriceDto);

      return {
        success: true,
        data: price,
        message: 'Preço calculado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao calcular preço',
      };
    }
  }

  @Post('calculate-price/multiple')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcular preços para múltiplos tipos de corrida',
    description:
      'Calcula e compara preços para diferentes tipos de corrida simultaneamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Preços calculados com sucesso',
  })
  async calculateMultiplePrices(
    @Body()
    calculateDto: {
      rideTypeIds: string[];
      distance: number;
      duration: number;
      surgeMultiplier?: number;
      isPremiumTime?: boolean;
    },
  ) {
    try {
      // Esta funcionalidade já existe no RideTypesController,
      // mas mantemos aqui para consistência da API de Maps
      const comparisons = await Promise.allSettled(
        calculateDto.rideTypeIds.map(async (rideTypeId) => {
          // Simular cálculo - na implementação real, chamaria o RideTypesService
          return {
            rideTypeId,
            estimatedPrice: 15 + Math.random() * 20,
            currency: 'BRL',
          };
        }),
      );

      const successful = comparisons
        .filter(
          (result): result is PromiseFulfilledResult<any> =>
            result.status === 'fulfilled',
        )
        .map((result) => result.value)
        .sort((a, b) => a.estimatedPrice - b.estimatedPrice);

      return {
        success: true,
        data: {
          comparisons: successful,
          cheapest: successful[0],
          mostExpensive: successful[successful.length - 1],
          averagePrice:
            successful.reduce((sum, comp) => sum + comp.estimatedPrice, 0) /
            successful.length,
        },
        message: 'Preços calculados com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao calcular preços',
      };
    }
  }

  @Get('reverse-geocode')
  @ApiOperation({
    summary: 'Obter endereço a partir de coordenadas',
    description: 'Converte coordenadas geográficas em endereço legível',
  })
  @ApiQuery({ name: 'lat', description: 'Latitude', type: Number })
  @ApiQuery({ name: 'lng', description: 'Longitude', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Endereço obtido com sucesso',
    type: GeocodeResponse,
  })
  async reverseGeocode(
    @Query('lat') latitude: string,
    @Query('lng') longitude: string,
  ) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return {
        success: false,
        data: null,
        message: 'Coordenadas inválidas',
      };
    }

    try {
      const address = await this.mapsService.reverseGeocode(lat, lng);

      return {
        success: true,
        data: {
          address,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
        },
        message: 'Endereço obtido com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao obter endereço',
      };
    }
  }

  @Get('context/ride-conditions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter condições atuais para corridas',
    description:
      'Retorna informações sobre demanda, surge pricing e condições gerais',
  })
  @ApiQuery({ name: 'lat', description: 'Latitude', type: Number })
  @ApiQuery({ name: 'lng', description: 'Longitude', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Condições atuais retornadas',
  })
  async getRideConditions(
    @Query('lat') latitude: string,
    @Query('lng') longitude: string,
  ) {
    try {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lng)) {
        throw new BadRequestException('Coordenadas inválidas');
      }

      // Simular condições atuais - na implementação real,
      // consultaria dados reais de demanda e disponibilidade
      const conditions = {
        location: { latitude: lat, longitude: lng },
        demandLevel: this.getDemandLevel(),
        surgeMultiplier: this.calculateCurrentSurge(lat, lng),
        availableDrivers: Math.floor(Math.random() * 50) + 10,
        averageWaitTime: Math.floor(Math.random() * 10) + 3,
        weather: {
          condition: 'clear',
          temperature: 25,
          affectsRides: false,
        },
        specialConditions: this.getSpecialConditions(),
        recommendedRideTypes: ['NORMAL', 'EXECUTIVO', 'MULHER'],
      };

      return {
        success: true,
        data: conditions,
        message: 'Condições atuais obtidas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao obter condições',
      };
    }
  }

  @Get('zones/surge-areas')
  @ApiOperation({
    summary: 'Obter áreas com preço dinâmico ativo',
    description: 'Retorna zonas da cidade com surge pricing ativo',
  })
  @ApiResponse({
    status: 200,
    description: 'Áreas de surge retornadas',
  })
  async getSurgeAreas() {
    try {
      // Simular áreas de surge - na implementação real,
      // retornaria dados reais de geofencing
      const surgeAreas = [
        {
          id: 'zona-centro-sp',
          name: 'Centro de São Paulo',
          polygon: [
            { latitude: -23.5505, longitude: -46.6333 },
            { latitude: -23.5505, longitude: -46.6233 },
            { latitude: -23.5405, longitude: -46.6233 },
            { latitude: -23.5405, longitude: -46.6333 },
          ],
          surgeMultiplier: 1.5,
          estimatedDuration: '15-20 min',
        },
        {
          id: 'zona-aeroporto-sp',
          name: 'Região do Aeroporto',
          polygon: [
            { latitude: -23.6271, longitude: -46.6557 },
            { latitude: -23.6271, longitude: -46.6457 },
            { latitude: -23.6171, longitude: -46.6457 },
            { latitude: -23.6171, longitude: -46.6557 },
          ],
          surgeMultiplier: 1.8,
          estimatedDuration: '20-25 min',
        },
      ];

      return {
        success: true,
        data: surgeAreas,
        count: surgeAreas.length,
        message: 'Áreas de surge retornadas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        message: 'Erro ao obter áreas de surge',
      };
    }
  }

  @Get('test')
  @ApiOperation({ summary: 'Teste da API Maps' })
  @ApiResponse({
    status: 200,
    description: 'API Maps funcionando corretamente',
  })
  test() {
    return {
      success: true,
      message: 'Maps API está funcionando',
      timestamp: new Date().toISOString(),
      googleApiConfigured:
        !!process.env.GOOGLE_API_KEY ||
        !!process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
      features: {
        smartRecommendations: true,
        rideConfirmation: true,
        nearbyDrivers: true,
        rideTypeFiltering: true,
        dynamicPricing: true,
        priceComparison: true,
        routeCalculation: true,
        reverseGeocoding: true,
        surgeZones: true,
        realTimeConditions: true,
      },
      endpoints: {
        smartRecommendations: '/maps/smart-recommendations',
        prepareConfirmation: '/maps/prepare-ride-confirmation',
        nearbyDrivers: '/maps/nearby-drivers',
        calculateRoute: '/maps/calculate-route',
        reverseGeocode: '/maps/reverse-geocode',
        rideConditions: '/maps/context/ride-conditions',
        surgeAreas: '/maps/zones/surge-areas',
      },
    };
  }

  // ==================== NOVAS ROTAS OBRIGATÓRIAS ====================

  @Post('nearby-drivers-geospatial')
  @ApiOperation({
    summary: 'Buscar motoristas próximos com consulta geoespacial',
    description:
      'Busca otimizada de motoristas próximos usando índices geoespaciais',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas próximos retornada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: { type: 'array', items: { type: 'object' } },
      },
    },
  })
  async findNearbyDriversGeospatial(
    @Body() nearbyDriversDto: NearbyDriversDto,
  ) {
    try {
      const drivers =
        await this.mapsService.findNearbyDriversGeospatial(nearbyDriversDto);

      return {
        success: true,
        data: drivers,
        count: drivers.length,
        message: `${drivers.length} motoristas encontrados`,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao buscar motoristas próximos',
      };
    }
  }

  @Post('calculate-route-optimized')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcular rota otimizada entre pontos',
    description: 'Calcula a melhor rota considerando tráfego e waypoints',
  })
  @ApiResponse({
    status: 200,
    description: 'Rota calculada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            distance: { type: 'number' },
            duration: { type: 'number' },
            polyline: { type: 'string' },
            steps: { type: 'array' },
          },
        },
      },
    },
  })
  async calculateRouteOptimized(
    @Body() calculateRouteDto: CalculateRouteNewDto,
  ) {
    try {
      const route = await this.mapsService.calculateRouteNew(calculateRouteDto);

      return {
        success: true,
        data: route,
        message: 'Rota calculada com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao calcular rota',
      };
    }
  }

  private calculateCurrentSurge(lat: number, lng: number): number {
    const hour = new Date().getHours();
    const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    const isWeekend = [0, 6].includes(new Date().getDay());

    let surge = 1.0;

    if (isRushHour && !isWeekend) {
      surge += 0.3;
    }

    if (isWeekend && hour >= 22) {
      surge += 0.2;
    }

    // Adicionar variação baseada em localização (simulada)
    const locationFactor = Math.abs(Math.sin(lat) * Math.cos(lng)) * 0.3;
    surge += locationFactor;

    return Math.round(Math.min(surge, 2.5) * 10) / 10;
  }

  private getDemandLevel(): 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' {
    const hour = new Date().getHours();
    const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    const isWeekend = [0, 6].includes(new Date().getDay());

    if (isRushHour && !isWeekend) {
      return 'VERY_HIGH';
    }

    if (isWeekend && hour >= 20) {
      return 'HIGH';
    }

    if (hour >= 10 && hour <= 16) {
      return 'MEDIUM';
    }

    return 'LOW';
  }

  private getSpecialConditions(): string[] {
    const conditions: string[] = [];
    const hour = new Date().getHours();
    const day = new Date().getDay();

    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      conditions.push('Horário de pico - maior demanda');
    }

    if ([5, 6].includes(day) && hour >= 22) {
      conditions.push('Final de semana - vida noturna ativa');
    }

    if (hour >= 0 && hour <= 6) {
      conditions.push('Madrugada - menos motoristas disponíveis');
    }

    // Simular eventos especiais ocasionalmente
    if (Math.random() > 0.8) {
      conditions.push('Evento especial na região - alta demanda');
    }

    return conditions;
  }
}
