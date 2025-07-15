// src/ride-types/ride-types.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { RideTypesService } from './ride-types.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import {
  CreateRideTypeDto,
  UpdateRideTypeDto,
  GetAvailableRideTypesDto,
  CalculateRidePriceDto,
  AddDriverRideTypeDto,
  UpdateDriverRideTypesDto,
  RideTypeConfigResponse,
  RidePriceCalculationResponse,
  AvailableDriversResponse,
} from './dto';
import { Gender } from '@prisma/client';

@ApiTags('Tipos de Corrida')
@Controller('ride-types')
export class RideTypesController {
  constructor(private readonly rideTypesService: RideTypesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo tipo de corrida (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de corrida criado com sucesso',
    type: RideTypeConfigResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Tipo já existe' })
  async createRideType(@Body() createRideTypeDto: CreateRideTypeDto) {
    return this.rideTypesService.createRideType(createRideTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tipos de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos retornada com sucesso',
    type: [RideTypeConfigResponse],
  })
  async findAllRideTypes() {
    return this.rideTypesService.findAllRideTypes();
  }

  @Get('available')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter tipos de corrida disponíveis para o usuário',
  })
  @ApiQuery({ name: 'includeDelivery', required: false, type: Boolean })
  @ApiResponse({
    status: 200,
    description: 'Tipos disponíveis retornados com sucesso',
  })
  async getAvailableRideTypes(
    @Query() query: GetAvailableRideTypesDto,
    @User() user: any,
  ) {
    // Buscar gênero do usuário
    const userInfo = await this.rideTypesService['prisma'].user.findUnique({
      where: { id: user.id },
      select: { gender: true },
    });

    return this.rideTypesService.findAvailableRideTypes({
      ...query,
      userGender: userInfo?.gender,
    });
  }

  @Get('suggestions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter sugestões de tipos de corrida personalizadas',
  })
  @ApiQuery({ name: 'lat', description: 'Latitude', type: Number })
  @ApiQuery({ name: 'lng', description: 'Longitude', type: Number })
  @ApiQuery({ name: 'isDelivery', required: false, type: Boolean })
  @ApiResponse({
    status: 200,
    description: 'Sugestões retornadas com sucesso',
  })
  async getSuggestedRideTypes(
    @Query('lat') latitude: string,
    @Query('lng') longitude: string,
    @Query('isDelivery') isDelivery: string,
    @User() user: any,
  ) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const delivery = isDelivery === 'true';

    if (isNaN(lat) || isNaN(lng)) {
      throw new BadRequestException('Coordenadas inválidas');
    }

    // Buscar gênero do usuário
    const userInfo = await this.rideTypesService['prisma'].user.findUnique({
      where: { id: user.id },
      select: { gender: true },
    });

    return this.rideTypesService.getSuggestedRideTypes(
      userInfo?.gender || Gender.PREFER_NOT_TO_SAY,
      lat,
      lng,
      delivery,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tipo de corrida por ID' })
  @ApiParam({ name: 'id', description: 'ID do tipo de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Tipo encontrado',
    type: RideTypeConfigResponse,
  })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado' })
  async findRideTypeById(@Param('id') id: string) {
    return this.rideTypesService.findRideTypeById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar tipo de corrida (Admin)' })
  @ApiParam({ name: 'id', description: 'ID do tipo de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Tipo atualizado com sucesso',
    type: RideTypeConfigResponse,
  })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado' })
  async updateRideType(
    @Param('id') id: string,
    @Body() updateRideTypeDto: UpdateRideTypeDto,
  ) {
    return this.rideTypesService.updateRideType(id, updateRideTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir tipo de corrida (Admin)' })
  @ApiParam({ name: 'id', description: 'ID do tipo de corrida' })
  @ApiResponse({ status: 204, description: 'Tipo excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado' })
  @ApiResponse({
    status: 400,
    description: 'Não é possível excluir tipo com corridas associadas',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRideType(@Param('id') id: string) {
    await this.rideTypesService.deleteRideType(id);
  }

  @Post('calculate-price')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calcular preço para um tipo de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Preço calculado com sucesso',
    type: RidePriceCalculationResponse,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Tipo de corrida não encontrado' })
  async calculateRidePrice(@Body() calculateDto: CalculateRidePriceDto) {
    return this.rideTypesService.calculateRidePrice(calculateDto);
  }

  @Get(':id/availability')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verificar disponibilidade de motoristas para um tipo',
  })
  @ApiParam({ name: 'id', description: 'ID do tipo de corrida' })
  @ApiResponse({
    status: 200,
    description: 'Disponibilidade verificada',
    type: AvailableDriversResponse,
  })
  async checkAvailability(@Param('id') id: string, @User() user: any) {
    // Buscar gênero do usuário
    const userInfo = await this.rideTypesService['prisma'].user.findUnique({
      where: { id: user.id },
      select: { gender: true },
    });

    return this.rideTypesService['checkDriverAvailability'](
      id,
      userInfo?.gender,
    );
  }

  // Endpoints para gerenciar tipos de corrida por motorista

  @Post('drivers/:driverId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar tipo de corrida para motorista' })
  @ApiParam({ name: 'driverId', description: 'ID do motorista' })
  @ApiResponse({ status: 201, description: 'Tipo adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Motorista não atende requisitos' })
  @ApiResponse({ status: 404, description: 'Motorista ou tipo não encontrado' })
  async addDriverRideType(
    @Param('driverId') driverId: string,
    @Body() addDriverRideTypeDto: Omit<AddDriverRideTypeDto, 'driverId'>,
  ) {
    return this.rideTypesService.addDriverRideType({
      ...addDriverRideTypeDto,
      driverId,
    });
  }

  @Put('drivers/:driverId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar tipos de corrida suportados pelo motorista',
  })
  @ApiParam({ name: 'driverId', description: 'ID do motorista' })
  @ApiResponse({ status: 200, description: 'Tipos atualizados com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async updateDriverRideTypes(
    @Param('driverId') driverId: string,
    @Body() updateDto: UpdateDriverRideTypesDto,
    @User() user: any,
  ) {
    // Verificar se é o próprio motorista ou admin
    if (user.driverId !== driverId && !this.isAdmin(user)) {
      throw new ForbiddenException(
        'Você só pode atualizar seus próprios tipos de corrida',
      );
    }

    return this.rideTypesService.updateDriverRideTypes(driverId, updateDto);
  }

  @Get('drivers/:driverId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar tipos de corrida suportados pelo motorista',
  })
  @ApiParam({ name: 'driverId', description: 'ID do motorista' })
  @ApiResponse({ status: 200, description: 'Tipos retornados com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  async getDriverRideTypes(@Param('driverId') driverId: string) {
    return this.rideTypesService.getDriverRideTypes(driverId);
  }

  @Delete('drivers/:driverId/:rideTypeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover tipo de corrida do motorista' })
  @ApiParam({ name: 'driverId', description: 'ID do motorista' })
  @ApiParam({ name: 'rideTypeId', description: 'ID do tipo de corrida' })
  @ApiResponse({ status: 204, description: 'Tipo removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Associação não encontrada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeDriverRideType(
    @Param('driverId') driverId: string,
    @Param('rideTypeId') rideTypeId: string,
    @User() user: any,
  ) {
    // Verificar se é o próprio motorista ou admin
    if (user.driverId !== driverId && !this.isAdmin(user)) {
      throw new ForbiddenException(
        'Você só pode remover seus próprios tipos de corrida',
      );
    }

    await this.rideTypesService.removeDriverRideType(driverId, rideTypeId);
  }

  // Endpoints específicos para configurar motoristas

  @Get('drivers/my/types')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter meus tipos de corrida (motorista autenticado)',
  })
  @ApiResponse({ status: 200, description: 'Tipos retornados com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não é motorista' })
  async getMyRideTypes(@User() user: any) {
    if (!user.isDriver || !user.driverId) {
      throw new BadRequestException('Usuário não é um motorista');
    }

    return this.rideTypesService.getDriverRideTypes(user.driverId);
  }

  @Put('drivers/my/types')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar meus tipos de corrida (motorista autenticado)',
  })
  @ApiResponse({ status: 200, description: 'Tipos atualizados com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não é motorista' })
  async updateMyRideTypes(
    @Body() updateDto: UpdateDriverRideTypesDto,
    @User() user: any,
  ) {
    if (!user.isDriver || !user.driverId) {
      throw new BadRequestException('Usuário não é um motorista');
    }

    return this.rideTypesService.updateDriverRideTypes(
      user.driverId,
      updateDto,
    );
  }

  @Get('test')
  @ApiOperation({ summary: 'Teste do módulo de tipos de corrida' })
  @ApiResponse({ status: 200, description: 'Módulo funcionando' })
  testRideTypes() {
    return {
      success: true,
      message: 'Módulo de tipos de corrida funcionando',
      timestamp: new Date().toISOString(),
      defaultTypes: [
        'STANDARD',
        'FEMALE_ONLY',
        'LUXURY',
        'ARMORED',
        'DELIVERY',
        'MOTORCYCLE',
        'EXPRESS',
        'SCHEDULED',
        'SHARED',
      ],
    };
  }

  private isAdmin(user: any): boolean {
    // TODO: Implementar lógica de verificação de admin
    return false;
  }
}
