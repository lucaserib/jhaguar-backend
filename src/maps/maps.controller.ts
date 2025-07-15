// src/maps/maps.controller.ts
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
import { Gender } from '@prisma/client';

@ApiTags('Maps')
@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post('nearby-drivers')
  @ApiOperation({ summary: 'Buscar motoristas próximos disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas próximos retornada com sucesso',
    type: NearbyDriversResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
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
    summary: 'Buscar motoristas próximos para um tipo específico de corrida',
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
      // Buscar gênero do usuário para aplicar filtros apropriados
      const userInfo = await this.mapsService['prisma'].user.findUnique({
        where: { id: user.id },
        select: { gender: true },
      });

      const drivers = await this.mapsService.findNearbyDriversForRideType({
        ...findNearbyDriversDto,
        userGender: userInfo?.gender,
      });

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calcular rota entre dois pontos' })
  @ApiResponse({
    status: 200,
    description: 'Rota calculada com sucesso',
    type: RouteResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async calculateRoute(@Body() calculateRouteDto: CalculateRouteDto) {
    try {
      const route = await this.mapsService.calculateRoute(calculateRouteDto);

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

  @Post('calculate-price')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcular preço estimado da corrida (método legado)',
  })
  @ApiResponse({
    status: 200,
    description: 'Preço calculado com sucesso',
    type: PriceResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  calculatePrice(@Body() calculatePriceDto: CalculatePriceDto) {
    try {
      const price = this.mapsService.calculateBasePrice(calculatePriceDto);

      return {
        success: true,
        data: {
          basePrice: price,
          currency: 'BRL',
          breakdown: {
            distance: calculatePriceDto.distance,
            duration: calculatePriceDto.duration,
            vehicleType: calculatePriceDto.vehicleType || 'ECONOMY',
            surgeMultiplier: calculatePriceDto.surgeMultiplier || 1,
          },
        },
        message: 'Preço calculado com sucesso (método legado)',
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

  @Post('calculate-price/ride-type/:rideTypeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calcular preço para um tipo específico de corrida',
  })
  @ApiParam({ name: 'rideTypeId', description: 'ID do tipo de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Preço calculado com sucesso',
  })
  async calculatePriceForRideType(
    @Param('rideTypeId') rideTypeId: string,
    @Body()
    calculateDto: {
      distance: number;
      duration: number;
      surgeMultiplier?: number;
      isPremiumTime?: boolean;
    },
  ) {
    try {
      const result = await this.mapsService.calculatePriceForRideType(
        rideTypeId,
        calculateDto.distance,
        calculateDto.duration,
        calculateDto.surgeMultiplier,
        calculateDto.isPremiumTime,
      );

      return {
        success: true,
        data: result,
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

  @Post('calculate-price/compare')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Comparar preços entre múltiplos tipos de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Comparação de preços realizada com sucesso',
  })
  async comparePricesForRideTypes(
    @Body()
    compareDto: {
      rideTypeIds: string[];
      distance: number;
      duration: number;
      surgeMultiplier?: number;
      isPremiumTime?: boolean;
    },
    @User() user: any,
  ) {
    try {
      const comparisons = await Promise.all(
        compareDto.rideTypeIds.map(async (rideTypeId) => {
          try {
            const result = await this.mapsService.calculatePriceForRideType(
              rideTypeId,
              compareDto.distance,
              compareDto.duration,
              compareDto.surgeMultiplier,
              compareDto.isPremiumTime,
            );

            return {
              rideTypeId,
              success: true,
              ...result,
            };
          } catch (error) {
            return {
              rideTypeId,
              success: false,
              error: error instanceof Error ? error.message : 'Erro no cálculo',
            };
          }
        }),
      );

      // Ordenar por preço final
      const validComparisons = comparisons
        .filter(
          (
            comp,
          ): comp is typeof comp & { finalPrice: number; breakdown: any } =>
            comp.success && 'finalPrice' in comp,
        )
        .sort((a, b) => a.finalPrice - b.finalPrice);

      // Calcular economias em relação à opção mais cara
      const maxPrice = Math.max(...validComparisons.map((c) => c.finalPrice));
      const enrichedComparisons = validComparisons.map((comp) => ({
        ...comp,
        savings: maxPrice - comp.finalPrice,
        savingsPercentage: ((maxPrice - comp.finalPrice) / maxPrice) * 100,
        isRecommended: comp.finalPrice === validComparisons[0]?.finalPrice, // Mais barato
      }));

      return {
        success: true,
        data: {
          comparisons: enrichedComparisons,
          cheapest: enrichedComparisons[0],
          mostExpensive: enrichedComparisons[enrichedComparisons.length - 1],
          averagePrice:
            enrichedComparisons.reduce(
              (sum, comp) => sum + comp.finalPrice,
              0,
            ) / enrichedComparisons.length,
        },
        message: 'Comparação de preços realizada com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao comparar preços',
      };
    }
  }

  @Get('ride-types/suggestions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter sugestões inteligentes de tipos de corrida' })
  @ApiQuery({ name: 'lat', description: 'Latitude', type: Number })
  @ApiQuery({ name: 'lng', description: 'Longitude', type: Number })
  @ApiQuery({
    name: 'distance',
    description: 'Distância estimada em metros',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'duration',
    description: 'Duração estimada em segundos',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'isDelivery',
    description: 'Se é uma entrega',
    type: Boolean,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Sugestões retornadas com sucesso',
  })
  async getSmartRideTypeSuggestions(
    @Query('lat') latitude: string,
    @Query('lng') longitude: string,
    @User() user: any,
    @Query('distance') distance?: string,
    @Query('duration') duration?: string,
    @Query('isDelivery') isDelivery?: string,
  ) {
    try {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      const dist = distance ? parseFloat(distance) : undefined;
      const dur = duration ? parseFloat(duration) : undefined;
      const delivery = isDelivery === 'true';

      if (isNaN(lat) || isNaN(lng)) {
        throw new BadRequestException('Coordenadas inválidas');
      }

      // Buscar dados do usuário
      const userInfo = await this.mapsService['prisma'].user.findUnique({
        where: { id: user.id },
        select: {
          gender: true,
          passenger: {
            select: {
              prefersFemaleDriver: true,
              specialNeeds: true,
            },
          },
        },
      });

      // Buscar tipos de corrida disponíveis
      const suggestions = await this.mapsService[
        'rideTypesService'
      ].getSuggestedRideTypes(
        userInfo?.gender || Gender.PREFER_NOT_TO_SAY,
        lat,
        lng,
        delivery,
      );

      // Enriquecer sugestões com preços se distância e duração fornecidas
      const enrichedSuggestions = await Promise.all(
        suggestions.map(async (suggestion) => {
          if (dist && dur) {
            try {
              const priceResult =
                await this.mapsService.calculatePriceForRideType(
                  suggestion.id,
                  dist,
                  dur,
                  suggestion.surgeMultiplier,
                );
              return {
                ...suggestion,
                estimatedPrice: priceResult.finalPrice,
                priceBreakdown: priceResult.breakdown,
              };
            } catch (error) {
              return suggestion;
            }
          }
          return suggestion;
        }),
      );

      return {
        success: true,
        data: {
          suggestions: enrichedSuggestions,
          userContext: {
            gender: userInfo?.gender,
            prefersFemaleDriver: userInfo?.passenger?.prefersFemaleDriver,
            specialNeeds: userInfo?.passenger?.specialNeeds,
            location: { latitude: lat, longitude: lng },
          },
          filters: {
            isDelivery: delivery,
            hasDistance: !!dist,
            hasDuration: !!dur,
          },
        },
        message: 'Sugestões geradas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Erro ao gerar sugestões',
      };
    }
  }

  @Get('reverse-geocode')
  @ApiOperation({ summary: 'Obter endereço a partir de coordenadas' })
  @ApiQuery({ name: 'lat', description: 'Latitude', type: Number })
  @ApiQuery({ name: 'lng', description: 'Longitude', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Endereço obtido com sucesso',
    type: GeocodeResponse,
  })
  @ApiResponse({ status: 400, description: 'Coordenadas inválidas' })
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

  @Get('zones/dynamic-pricing')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter informações de zonas de preço dinâmico' })
  @ApiQuery({ name: 'lat', description: 'Latitude', type: Number })
  @ApiQuery({ name: 'lng', description: 'Longitude', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Informações de zona retornadas',
  })
  async getDynamicPricingZoneInfo(
    @Query('lat') latitude: string,
    @Query('lng') longitude: string,
  ) {
    try {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lng)) {
        throw new BadRequestException('Coordenadas inválidas');
      }

      // Simular informações de zona de preço dinâmico
      // Em uma implementação real, isso consultaria um sistema de geofencing
      const mockZoneInfo = {
        zoneId: 'zone-sp-centro',
        zoneName: 'Centro de São Paulo',
        currentSurge: this.calculateCurrentSurge(lat, lng),
        demandLevel: this.getDemandLevel(lat, lng),
        estimatedWaitTime: Math.floor(Math.random() * 10) + 3, // 3-12 minutos
        activeDrivers: Math.floor(Math.random() * 50) + 10,
        activeRides: Math.floor(Math.random() * 100) + 20,
        priceMultipliers: {
          standard: 1.0,
          luxury: 1.2,
          femaleOnly: 1.1,
          armored: 2.0,
          motorcycle: 0.8,
        },
      };

      return {
        success: true,
        data: mockZoneInfo,
        message: 'Informações de zona obtidas com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao obter informações de zona',
      };
    }
  }

  @Get('test')
  @ApiOperation({ summary: 'Teste de conectividade da API Maps' })
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
        nearbyDrivers: true,
        rideTypeFiltering: true,
        dynamicPricing: true,
        smartSuggestions: true,
        priceComparison: true,
        routeCalculation: true,
        reverseGeocoding: true,
      },
    };
  }

  // Métodos auxiliares
  private calculateCurrentSurge(lat: number, lng: number): number {
    // Simular cálculo de surge baseado em localização e horário
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

    return Math.round(Math.min(surge, 2.5) * 10) / 10; // Max 2.5x
  }

  private getDemandLevel(
    lat: number,
    lng: number,
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' {
    const surge = this.calculateCurrentSurge(lat, lng);

    if (surge >= 2.0) return 'VERY_HIGH';
    if (surge >= 1.5) return 'HIGH';
    if (surge >= 1.2) return 'MEDIUM';
    return 'LOW';
  }
}
