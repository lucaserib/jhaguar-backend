import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

export class CalculateRidePriceDto {
  @ApiProperty({
    description: 'ID do tipo de corrida',
    example: 'clxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsString()
  rideTypeId: string;

  @ApiProperty({
    description: 'Distância em metros',
    example: 5000,
    minimum: 100,
  })
  @IsNumber()
  @Min(100)
  distance: number;

  @ApiProperty({
    description: 'Duração em segundos',
    example: 900,
    minimum: 60,
  })
  @IsNumber()
  @Min(60)
  duration: number;

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

  @ApiProperty({
    description: 'Se é horário premium (pico)',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPremiumTime?: boolean;
}
