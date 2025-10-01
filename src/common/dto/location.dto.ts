import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

/**
 * CORREÇÃO: DTO centralizado para coordenadas geográficas
 * Substitui todas as duplicações de LocationDto
 * Padronizado com latitude/longitude (não lat/lng)
 */
export class LocationDto {
  @ApiProperty({
    description: 'Latitude da coordenada geográfica',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90, { message: 'Latitude deve estar entre -90 e 90 graus' })
  @Max(90, { message: 'Latitude deve estar entre -90 e 90 graus' })
  latitude: number;

  @ApiProperty({
    description: 'Longitude da coordenada geográfica',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180, { message: 'Longitude deve estar entre -180 e 180 graus' })
  @Max(180, { message: 'Longitude deve estar entre -180 e 180 graus' })
  longitude: number;
}

/**
 * CORREÇÃO: DTO centralizado para localização atual com timestamp
 * Substitui todas as duplicações de CurrentLocationDto
 */
export class CurrentLocationDto extends LocationDto {
  @ApiProperty({
    description: 'Direção/orientação em graus (0-360)',
    example: 45.5,
    minimum: 0,
    maximum: 360,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(360)
  heading?: number;

  @ApiProperty({
    description: 'Velocidade em km/h',
    example: 35.2,
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @Min(0, { message: 'Velocidade não pode ser negativa' })
  speed?: number;

  @ApiProperty({
    description: 'Precisão da localização em metros',
    example: 5.0,
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  accuracy?: number;

  @ApiProperty({
    description: 'Timestamp da localização (ISO 8601)',
    example: '2023-12-01T10:30:00Z',
    required: false,
  })
  timestamp?: string;
}
