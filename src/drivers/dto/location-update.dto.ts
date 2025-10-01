import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, IsBoolean, IsOptional } from 'class-validator';

export class LocationUpdateDto {
  @ApiProperty({
    description: 'Latitude da localização',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude da localização',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'Status online do motorista',
    example: true,
  })
  @IsBoolean()
  isOnline: boolean;

  @ApiProperty({
    description: 'Status de disponibilidade do motorista',
    example: true,
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: 'Direção do movimento em graus',
    example: 45.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  heading?: number;

  @ApiProperty({
    description: 'Velocidade em km/h',
    example: 30.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  speed?: number;

  @ApiProperty({
    description: 'Precisão do GPS em metros',
    example: 5.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  accuracy?: number;
}
