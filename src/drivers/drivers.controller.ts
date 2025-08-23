import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Status } from '@prisma/client';
import { User } from '../auth/decorator/user.decorator';
import { UpdateDriverStatusDto } from './dto/update-driver-status.dto';
import { UpdateDriverLocationDto } from './dto/update-driver-location.dto';
import { LocationUpdateDto } from './dto/location-update.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { DriverStatsDto, DriverStatsResponseDto } from './dto/driver-stats.dto';

@ApiTags('Motoristas')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastrar como motorista' })
  @ApiResponse({ status: 201, description: 'Motorista criado com sucesso' })
  async create(@Body() createDriverDto: CreateDriverDto, @User() user: any) {
    if (!createDriverDto.userId) {
      createDriverDto.userId = user.id;
    }
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os motoristas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas retornada com sucesso',
  })
  async findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar um motorista pelo ID' })
  @ApiResponse({ status: 200, description: 'Motorista retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar um motorista pelo ID do usuário' })
  @ApiResponse({ status: 200, description: 'Motorista retornado com sucesso' })
  async findByUserId(@Param('userId') userId: string) {
    return this.driversService.findByUserId(userId);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar o status de um motorista' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateDriverStatusDto,
  ) {
    return this.driversService.updateStatus(id, updateStatusDto.status);
  }

  @Post(':id/approve')
  @ApiOperation({
    summary: 'Aprovar manualmente um motorista (desenvolvimento)',
  })
  @ApiResponse({ status: 200, description: 'Motorista aprovado com sucesso' })
  async approveDriver(@Param('id') id: string) {
    return this.driversService.updateStatus(id, Status.APPROVED);
  }

  @Post(':id/documents')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar documentos de motorista' })
  @ApiResponse({ status: 200, description: 'Documentos enviados com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async uploadDocuments(@Param('id') id: string, @Body() documentData: any) {
    return this.driversService.updateDocuments(id, documentData);
  }

  @Patch('location')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar localização do motorista' })
  @ApiResponse({
    status: 200,
    description: 'Localização atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async updateLocation(
    @Body() updateLocationDto: UpdateDriverLocationDto,
    @User() user: any,
  ) {
    return this.driversService.updateLocation(user.driverId, updateLocationDto);
  }

  @Get('online')
  @ApiOperation({ summary: 'Listar motoristas online' })
  @ApiResponse({
    status: 200,
    description: 'Lista de motoristas online retornada com sucesso',
  })
  async findOnlineDrivers() {
    return this.driversService.findOnlineDrivers();
  }

  // Novas rotas obrigatórias

  @Patch(':driverId/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do motorista' })
  @ApiResponse({
    status: 200,
    description: 'Status atualizado com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            status: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async updateDriverStatus(
    @Param('driverId') driverId: string,
    @Body() updateStatusDto: UpdateDriverStatusDto,
  ) {
    return this.driversService.updateDriverStatus(
      driverId,
      updateStatusDto.status,
    );
  }

  @Patch(':driverId/availability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Throttle({ default: { limit: 5, ttl: 10000 } }) // 5 requests per 10 seconds for availability updates
  @ApiOperation({ summary: 'Atualizar disponibilidade do motorista' })
  @ApiResponse({
    status: 200,
    description: 'Disponibilidade atualizada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            isOnline: { type: 'boolean' },
            isAvailable: { type: 'boolean' },
            onlineAt: { type: 'string', nullable: true },
            offlineAt: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async updateAvailability(
    @Param('driverId') driverId: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    return this.driversService.updateAvailability(
      driverId,
      updateAvailabilityDto,
    );
  }

  @Patch('location')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Throttle({ default: { limit: 1, ttl: 1000 } }) // 1 request per second
  @ApiOperation({ summary: 'Atualizar localização do motorista' })
  @ApiResponse({
    status: 200,
    description: 'Localização atualizada com sucesso',
    schema: {
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  @ApiResponse({ status: 429, description: 'Rate limit excedido' })
  async updateLocationNew(
    @Body() locationUpdateDto: LocationUpdateDto,
    @User() user: any,
  ) {
    const driverId = user.driverId || user.id; // fallback
    return this.driversService.updateLocationWithCache(
      driverId,
      locationUpdateDto,
    );
  }

  @Get(':driverId/stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas do motorista' })
  @ApiQuery({
    name: 'period',
    required: false,
    enum: ['today', 'week', 'month'],
    description: 'Período para consulta das estatísticas',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
    type: DriverStatsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async getDriverStats(
    @Param('driverId') driverId: string,
    @Query() statsQuery: DriverStatsDto,
  ) {
    return this.driversService.getDriverStats(driverId, statsQuery.period);
  }
}
