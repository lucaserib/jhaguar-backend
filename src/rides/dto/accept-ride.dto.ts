import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
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
}

export class AcceptRideDto {
  @ApiProperty({
    description: 'Tempo estimado para chegada no ponto de embarque (em minutos)',
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  estimatedPickupTime?: number;

  @ApiProperty({
    description: 'Localização atual do motorista',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  currentLocation: LocationDto;
}