// src/vehicles/dto/create-vehicle.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { VehicleType } from '@prisma/client';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'ID do motorista',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({
    description: 'Marca do veículo',
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({
    description: 'Modelo do veículo',
    example: 'Corolla',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Ano do veículo',
    example: 2020,
  })
  @IsInt()
  @Min(1900)
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Cor do veículo',
    example: 'Prata',
    required: false,
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: 'Placa do veículo',
    example: 'ABC1234',
  })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({
    description: 'Data de validade do documento do veículo',
    example: '2025-12-31',
  })
  @IsString()
  @IsNotEmpty()
  registrationExpiryDate: string;

  @ApiProperty({
    description: 'Data de validade do seguro',
    example: '2025-12-31',
  })
  @IsString()
  @IsNotEmpty()
  insuranceExpiryDate: string;

  @ApiProperty({
    description: 'Tipo do veículo',
    enum: VehicleType,
    example: VehicleType.ECONOMY,
  })
  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicleType: VehicleType;

  @ApiProperty({
    description: 'Capacidade de passageiros',
    example: 5,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({
    description: 'Possui acessibilidade',
    example: false,
    required: false,
  })
  @IsOptional()
  accessibility?: boolean;

  @ApiProperty({
    description: 'URL da imagem do veículo',
    example: 'https://exemplo.com/carro.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  carImageUrl?: string;

  @ApiProperty({
    description: 'Características do veículo',
    example: ['Ar condicionado', 'Direção hidráulica'],
    required: false,
  })
  @IsOptional()
  features?: string[];
}
