import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  ValidateNested,
  Max,
  Min,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty({
    description: 'Latitude',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}

export class CalculateRouteDto {
  @ApiProperty({
    description: 'Ponto de origem',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  origin: LocationDto;

  @ApiProperty({
    description: 'Ponto de destino',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  destination: LocationDto;

  @ApiProperty({
    description: 'Pontos intermediários (waypoints)',
    type: [LocationDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  waypoints?: LocationDto[];
}
