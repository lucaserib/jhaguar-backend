import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Status } from '@prisma/client';
import { User } from '../auth/decorator/user.decorator';
import { UpdateDriverStatusDto } from './dto/update-driver-status.dto';

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
}
