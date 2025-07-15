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
} from 'class-validator';
import { RideTypeEnum, VehicleType } from '@prisma/client';

export class CreateRideTypeDto {
  @ApiProperty({
    description: 'Tipo da corrida',
    enum: RideTypeEnum,
    example: RideTypeEnum.STANDARD,
  })
  @IsEnum(RideTypeEnum)
  type: RideTypeEnum;

  @ApiProperty({
    description: 'Nome do tipo de corrida',
    example: 'Corrida Padrão',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do tipo de corrida',
    example: 'Corrida econômica e confiável',
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
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Se é exclusivo para mulheres',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  femaleOnly?: boolean;

  @ApiProperty({
    description: 'Se requer veículo blindado',
    example: false,
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
    description: 'Preço base da corrida',
    example: 8.0,
  })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({
    description: 'Preço por quilômetro',
    example: 2.5,
  })
  @IsNumber()
  @Min(0)
  pricePerKm: number;

  @ApiProperty({
    description: 'Preço por minuto',
    example: 0.5,
  })
  @IsNumber()
  @Min(0)
  pricePerMinute: number;

  @ApiProperty({
    description: 'Multiplicador de alta demanda',
    example: 1.0,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  surgeMultiplier?: number;

  @ApiProperty({
    description: 'Preço mínimo da corrida',
    example: 12.0,
  })
  @IsNumber()
  @Min(0)
  minimumPrice: number;
}
