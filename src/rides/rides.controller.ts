import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { RidesService } from './rides.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideStatus } from '@prisma/client';

@ApiTags('Corridas')
@Controller('rides')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post('prepare-confirmation')
  @ApiOperation({
    summary: 'Preparar confirmação de corrida',
    description:
      'Valida os dados e prepara a tela de confirmação com preço final e motorista',
  })
  @ApiResponse({ status: 200, description: 'Dados de confirmação preparados' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
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
    return this.ridesService.prepareRideConfirmation(user.id, {
      ...confirmationData,
      scheduledTime: confirmationData.scheduledTime
        ? new Date(confirmationData.scheduledTime)
        : undefined,
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Criar corrida',
    description: 'Confirma e cria a corrida no sistema',
  })
  @ApiResponse({ status: 201, description: 'Corrida criada com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou token expirado',
  })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado' })
  async createRide(@Body() createRideDto: CreateRideDto, @User() user: any) {
    return this.ridesService.createRide(user.id, createRideDto);
  }

  @Get('my')
  @ApiOperation({
    summary: 'Buscar minhas corridas',
    description: 'Lista as corridas do usuário autenticado (como passageiro)',
  })
  @ApiQuery({ name: 'status', required: false, enum: RideStatus })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Corridas retornadas com sucesso' })
  async getMyRides(
    @Query('status') status?: RideStatus,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @User() user?: any,
  ) {
    return this.ridesService.getUserRides(user.id, {
      status,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      isDriver: false,
    });
  }

  @Get('my/driver')
  @ApiOperation({
    summary: 'Buscar corridas como motorista',
    description: 'Lista as corridas do usuário autenticado como motorista',
  })
  @ApiQuery({ name: 'status', required: false, enum: RideStatus })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Corridas retornadas com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Perfil de motorista não encontrado',
  })
  async getMyDriverRides(
    @Query('status') status?: RideStatus,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @User() user?: any,
  ) {
    return this.ridesService.getUserRides(user.id, {
      status,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      isDriver: true,
    });
  }

  @Put(':id/cancel')
  @ApiOperation({
    summary: 'Cancelar corrida',
    description: 'Cancela uma corrida específica',
  })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Corrida cancelada com sucesso' })
  @ApiResponse({ status: 400, description: 'Corrida não pode ser cancelada' })
  @ApiResponse({ status: 404, description: 'Corrida não encontrada' })
  async cancelRide(
    @Param('id') rideId: string,
    @Body() body: { reason: string; isDriver?: boolean },
    @User() user: any,
  ) {
    return this.ridesService.cancelRide(
      user.id,
      rideId,
      body.reason,
      body.isDriver || false,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar corrida por ID',
    description: 'Retorna detalhes de uma corrida específica',
  })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Corrida encontrada' })
  @ApiResponse({ status: 404, description: 'Corrida não encontrada' })
  async getRideById(@Param('id') rideId: string, @User() user: any) {
    return {
      success: true,
      data: { rideId, userId: user.id },
      message: 'Corrida encontrada',
    };
  }

  @Get('test')
  @ApiOperation({ summary: 'Teste do módulo de corridas' })
  @ApiResponse({ status: 200, description: 'Módulo funcionando' })
  testRides() {
    return {
      success: true,
      message: 'Módulo de corridas funcionando',
      timestamp: new Date().toISOString(),
      features: {
        rideConfirmation: true,
        rideCreation: true,
        rideCancellation: true,
        rideHistory: true,
        realTimeTracking: false, // TODO: Implementar
        pushNotifications: false, // TODO: Implementar
      },
    };
  }
}
