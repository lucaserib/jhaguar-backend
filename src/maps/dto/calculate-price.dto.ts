import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsPositive,
  Min,
  Max,
} from 'class-validator';

enum VehicleType {
  ECONOMY = 'ECONOMY',
  COMFORT = 'COMFORT',
  LUXURY = 'LUXURY',
  SUV = 'SUV',
  VAN = 'VAN',
}

export class CalculatePriceDto {
  @ApiProperty({
    description: 'ID do tipo de corrida',
    example: 'clxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsString()
  rideTypeId: string;

  @ApiProperty({
    description: 'Distância em metros',
    example: 5000,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  distance: number;

  @ApiProperty({
    description: 'Duração em segundos',
    example: 900,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  duration: number;

  @ApiProperty({
    description: 'Tipo de veículo',
    enum: VehicleType,
    example: VehicleType.ECONOMY,
    required: false,
  })
  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @ApiProperty({
    description: 'Multiplicador de alta demanda',
    example: 1.2,
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  surgeMultiplier?: number;
}
