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
  Headers,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';
import { RidesService } from './rides.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import { CreateRideDto } from './dto/create-ride.dto';
import { AcceptRideDto } from './dto/accept-ride.dto';
import { RejectRideDto } from './dto/reject-ride.dto';
import { ArrivedDto } from './dto/arrived.dto';
import { StartRideDto } from './dto/start-ride.dto';
import { CompleteRideDto } from './dto/complete-ride.dto';
import { CancelRideDto } from './dto/cancel-ride.dto';
import { RideStatus } from '@prisma/client';
import { Response } from 'express';
import { randomUUID } from 'crypto';

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
  @ApiHeader({
    name: 'Idempotency-Key',
    required: false,
    description:
      'Chave de idempotência para evitar criações duplicadas (opcional; se ausente, o servidor gera)',
  })
  @ApiResponse({ status: 201, description: 'Corrida criada com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou token expirado',
  })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado' })
  async createRide(
    @Body() createRideDto: CreateRideDto,
    @User() user: any,
    @Headers('Idempotency-Key') idemKey?: string,
    @Res({ passthrough: true }) res?: Response,
  ) {
    // Gerar Idempotency-Key se ausente
    const key = idemKey || randomUUID();

    // Normalização do payload flat -> nested
    if (
      !createRideDto.origin &&
      createRideDto.originLatitude !== undefined &&
      createRideDto.originLongitude !== undefined
    ) {
      createRideDto.origin = {
        latitude: Number(createRideDto.originLatitude),
        longitude: Number(createRideDto.originLongitude),
        address: createRideDto.originAddress || '',
      } as any;
    }
    if (
      !createRideDto.destination &&
      createRideDto.destinationLatitude !== undefined &&
      createRideDto.destinationLongitude !== undefined
    ) {
      createRideDto.destination = {
        latitude: Number(createRideDto.destinationLatitude),
        longitude: Number(createRideDto.destinationLongitude),
        address: createRideDto.destinationAddress || '',
      } as any;
    }

    // Backfill de preço estimado a partir de priceCalculation.finalPrice
    if (
      (createRideDto.estimatedPrice === undefined ||
        createRideDto.estimatedPrice === null) &&
      createRideDto.priceCalculation &&
      typeof createRideDto.priceCalculation.finalPrice === 'number' &&
      createRideDto.priceCalculation.finalPrice > 0
    ) {
      createRideDto.estimatedPrice = createRideDto.priceCalculation.finalPrice;
    }

    // Chamar service
    const response = await this.ridesService.createRide(
      user.id,
      createRideDto,
      key,
    );

    // Anexar header para rastreabilidade
    if (res) res.setHeader('Idempotency-Key', key);
    return response;
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
    return this.ridesService.getRideByIdForUser(rideId, user.id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Status da corrida (polling)' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  @ApiResponse({ status: 200, description: 'Status retornado com sucesso' })
  async getRideStatus(@Param('id') rideId: string, @User() user: any) {
    return this.ridesService.getRideStatus(rideId, user.id);
  }

  @Put(':id/rate')
  @ApiOperation({ summary: 'Avaliar corrida' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  async rateRide(
    @Param('id') rideId: string,
    @Body()
    body: { rating: number; review?: string; isPassengerRating?: boolean },
    @User() user: any,
  ) {
    return this.ridesService.rateRide(rideId, user.id, body);
  }

  @Post(':id/rate')
  @ApiOperation({ summary: 'Avaliar corrida (POST alias)' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  async rateRidePost(
    @Param('id') rideId: string,
    @Body()
    body: { rating: number; review?: string; isPassengerRating?: boolean },
    @User() user: any,
  ) {
    return this.ridesService.rateRide(rideId, user.id, body);
  }

  @Post(':id/report')
  @ApiOperation({ summary: 'Reportar problema na corrida' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  async reportRide(
    @Param('id') rideId: string,
    @Body()
    body: {
      issue: string;
      description?: string;
      reportedBy: 'passenger' | 'driver';
    },
    @User() user: any,
  ) {
    return this.ridesService.reportRide(rideId, user.id, body);
  }

  @Post(':id/message')
  @ApiOperation({ summary: 'Enviar mensagem entre passageiro e motorista' })
  @ApiParam({ name: 'id', description: 'ID da corrida' })
  async sendMessage(
    @Param('id') rideId: string,
    @Body() body: { message: string; to: 'driver' | 'passenger' },
    @User() user: any,
  ) {
    return this.ridesService.sendRideMessage(rideId, user.id, body);
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
        realTimeTracking: true,
        pushNotifications: true,
      },
    };
  }

  @Get('driver/pending')
  @ApiOperation({ summary: 'Buscar corridas pendentes para motorista' })
  @ApiQuery({ name: 'driverId', description: 'ID do motorista' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limite de resultados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de corridas pendentes retornada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: { type: 'array', items: { type: 'object' } },
      },
    },
  })
  async getPendingRides(
    @Query('driverId') driverId: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit) : undefined;
    return this.ridesService.getPendingRidesForDriver(driverId, limitNum);
  }

  @Put(':rideId/accept')
  @ApiOperation({ summary: 'Aceitar uma corrida' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Corrida aceita com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            rideId: { type: 'string' },
            status: { type: 'string' },
            acceptedAt: { type: 'string' },
            estimatedPickupTime: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Corrida não encontrada' })
  @ApiResponse({
    status: 400,
    description: 'Corrida não disponível para aceitação',
  })
  async acceptRide(
    @Param('rideId') rideId: string,
    @Body() acceptRideDto: AcceptRideDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id; // fallback
    return this.ridesService.acceptRide(driverId, rideId, acceptRideDto);
  }

  @Put(':rideId/reject')
  @ApiOperation({ summary: 'Rejeitar uma corrida' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Corrida rejeitada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  async rejectRide(
    @Param('rideId') rideId: string,
    @Body() rejectRideDto: RejectRideDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id; // fallback
    return this.ridesService.rejectRide(driverId, rideId, rejectRideDto);
  }

  @Put(':rideId/arrived')
  @ApiOperation({ summary: 'Marcar chegada no local de embarque' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Chegada marcada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            arrivedAt: { type: 'string' },
            waitingStartedAt: { type: 'string' },
          },
        },
      },
    },
  })
  async markArrived(
    @Param('rideId') rideId: string,
    @Body() arrivedDto: ArrivedDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id; // fallback
    return this.ridesService.markDriverArrived(driverId, rideId, arrivedDto);
  }

  @Put(':rideId/start')
  @ApiOperation({ summary: 'Iniciar a corrida' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Corrida iniciada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            startedAt: { type: 'string' },
            route: { type: 'object' },
          },
        },
      },
    },
  })
  async startRide(
    @Param('rideId') rideId: string,
    @Body() startRideDto: StartRideDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id; // fallback
    return this.ridesService.startRide(driverId, rideId, startRideDto);
  }

  @Put(':rideId/complete')
  @ApiOperation({ summary: 'Finalizar a corrida' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Corrida finalizada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            completedAt: { type: 'string' },
            finalPrice: { type: 'number' },
            earnings: { type: 'number' },
            summary: { type: 'object' },
          },
        },
      },
    },
  })
  async completeRide(
    @Param('rideId') rideId: string,
    @Body() completeRideDto: CompleteRideDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id;
    return this.ridesService.completeRideNew(driverId, rideId, completeRideDto);
  }

  @Put(':rideId/cancel-new')
  @ApiOperation({ summary: 'Cancelar corrida (nova versão)' })
  @ApiParam({ name: 'rideId', description: 'ID da corrida' })
  @ApiResponse({
    status: 200,
    description: 'Corrida cancelada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            cancelledAt: { type: 'string' },
            cancellationFee: { type: 'number' },
            refundAmount: { type: 'number' },
          },
        },
      },
    },
  })
  async cancelRideNew(
    @Param('rideId') rideId: string,
    @Body() cancelRideDto: CancelRideDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id;
    return this.ridesService.cancelRideNew(driverId, rideId, cancelRideDto);
  }

  @Get('my/driver-new')
  @ApiOperation({ summary: 'Buscar corridas do motorista (nova versão)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Corridas retornadas com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            rides: { type: 'array' },
            summary: { type: 'object' },
            pagination: { type: 'object' },
          },
        },
      },
    },
  })
  async getDriverRides(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('status') status?: string,
    @User() user?: any,
  ) {
    const driverId = user.driverId || user.id;
    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : undefined;

    return this.ridesService.getDriverRides(
      driverId,
      limitNum,
      offsetNum,
      status,
    );
  }
}
