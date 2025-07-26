import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { RideTypeEnum, VehicleType } from '@prisma/client';

export class CreateRideTypeDto {
  @ApiProperty({
    description: 'Tipo da corrida',
    enum: RideTypeEnum,
    example: RideTypeEnum.NORMAL,
  })
  @IsEnum(RideTypeEnum)
  type: RideTypeEnum;

  @ApiProperty({
    description: 'Nome do tipo de corrida',
    example: 'Normal',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do tipo de corrida',
    example: 'Opção econômica e confiável para o dia a dia',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Ícone do tipo de corrida',
    example: 'car',
  })
  @IsString()
  icon: string;

  @ApiProperty({
    description: 'Se o tipo está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Se é exclusivo para mulheres',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  femaleOnly?: boolean;

  @ApiProperty({
    description: 'Se requer veículo blindado',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  requiresArmored?: boolean;

  @ApiProperty({
    description: 'Tipos de veículos suportados',
    enum: VehicleType,
    isArray: true,
    example: [VehicleType.ECONOMY, VehicleType.COMFORT],
  })
  @IsArray()
  @IsEnum(VehicleType, { each: true })
  vehicleTypes: VehicleType[];

  @ApiProperty({
    description: 'Preço base da corrida em BRL',
    example: 5.0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({
    description: 'Preço por quilômetro em BRL',
    example: 1.8,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  pricePerKm: number;

  @ApiProperty({
    description: 'Preço por minuto em BRL',
    example: 0.3,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  pricePerMinute: number;

  @ApiProperty({
    description: 'Multiplicador de alta demanda',
    example: 1.0,
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  surgeMultiplier?: number;

  @ApiProperty({
    description: 'Preço mínimo da corrida em BRL',
    example: 8.0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  minimumPrice: number;

  @ApiProperty({
    description: 'Distância máxima permitida em metros',
    example: 50000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1000)
  maxDistance?: number;

  @ApiProperty({
    description: 'Distância mínima permitida em metros',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(100)
  minDistance?: number;

  @ApiProperty({
    description: 'Prioridade na listagem (menor = mais prioritário)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;
}
