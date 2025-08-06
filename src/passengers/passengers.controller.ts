import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Passageiros')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastrar como passageiro' })
  @ApiResponse({ status: 201, description: 'Passageiro criado com sucesso' })
  async create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengersService.create(createPassengerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os passageiros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de passageiros retornada com sucesso',
  })
  async findAll() {
    return this.passengersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar um passageiro pelo ID' })
  @ApiResponse({ status: 200, description: 'Passageiro retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Passageiro não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.passengersService.findOne(id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar um passageiro pelo ID do usuário' })
  @ApiResponse({ status: 200, description: 'Passageiro retornado com sucesso' })
  async findByUserId(@Param('userId') userId: string) {
    return this.passengersService.findByUserId(userId);
  }
}
