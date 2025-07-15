import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export class CalculateRidePriceDto {
  @ApiProperty({
    description: 'ID do tipo de corrida',
    example: 'rt-standard',
  })
  @IsString()
  rideTypeId: string;

  @ApiProperty({
    description: 'Distância em metros',
    example: 5000,
  })
  @IsNumber()
  @Min(0)
  distance: number;

  @ApiProperty({
    description: 'Duração em segundos',
    example: 900,
  })
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({
    description: 'Multiplicador de alta demanda',
    example: 1.2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  surgeMultiplier?: number;

  @ApiProperty({
    description: 'Horário é considerado premium',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPremiumTime?: boolean;
}
