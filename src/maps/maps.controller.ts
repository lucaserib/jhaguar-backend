import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { MapsService } from './maps.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  FindNearbyDriversDto,
  CalculateRouteDto,
  CalculatePriceDto,
  NearbyDriversResponse,
  RouteResponse,
  PriceResponse,
  GeocodeResponse,
} from './dto';

@ApiTags('Maps')
@Controller('maps')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
  async findNearbyDrivers(
    @Body() findNearbyDriversDto: FindNearbyDriversDto,
  ): Promise<NearbyDriversResponse> {
    try {
      const drivers =
        await this.mapsService.findNearbyDrivers(findNearbyDriversDto);

      return {
        success: true,
        data: drivers,
        count: drivers.length,
      };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : 'Erro ao buscar motoristas próximos',
      );
    }
  }

  @Post('calculate-route')
  @ApiOperation({ summary: 'Calcular rota entre dois pontos' })
  @ApiResponse({
    status: 200,
    description: 'Rota calculada com sucesso',
    type: RouteResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async calculateRoute(
    @Body() calculateRouteDto: CalculateRouteDto,
  ): Promise<RouteResponse> {
    try {
      const route = await this.mapsService.calculateRoute(calculateRouteDto);

      return {
        success: true,
        data: route,
      };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao calcular rota',
      );
    }
  }

  @Post('calculate-price')
  @ApiOperation({ summary: 'Calcular preço estimado da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Preço calculado com sucesso',
    type: PriceResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  calculatePrice(@Body() calculatePriceDto: CalculatePriceDto): PriceResponse {
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
      };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao calcular preço',
      );
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
  ): Promise<GeocodeResponse> {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      throw new BadRequestException('Coordenadas inválidas');
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
      };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Erro ao obter endereço',
      );
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
    };
  }
}
