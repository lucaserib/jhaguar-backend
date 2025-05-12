import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorator/user.decorator';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@ApiTags('Veículos')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar um veículo' })
  @ApiResponse({ status: 201, description: 'Veículo registrado com sucesso' })
  async create(@Body() createVehicleDto: CreateVehicleDto, @User() user: any) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get('driver/:driverId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar veículo por ID do motorista' })
  @ApiResponse({ status: 200, description: 'Veículo encontrado' })
  async findByDriverId(@Param('driverId') driverId: string) {
    return this.vehiclesService.findByDriverId(driverId);
  }
}
