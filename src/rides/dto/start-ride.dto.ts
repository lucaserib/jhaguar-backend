import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CurrentLocationDto {
  @ApiProperty({
    description: 'Latitude da localização atual',
    example: -23.5505,
  })
  lat: number;

  @ApiProperty({
    description: 'Longitude da localização atual',
    example: -46.6333,
  })
  lng: number;
}

class RouteInfoDto {
  @ApiProperty({
    description: 'Distância estimada da rota em metros',
    example: 15280,
  })
  distance: number;

  @ApiProperty({
    description: 'Duração estimada da rota em segundos',
    example: 1860,
  })
  duration: number;

  @ApiProperty({
    description: 'Polyline codificada da rota',
    example: 'u{~vFvyys@fS]',
  })
  polyline: string;
}

export class StartRideDto {
  @ApiProperty({
    description: 'Data e hora do início da corrida',
    example: '2024-08-06T18:20:00.000Z',
  })
  @IsDateString()
  startedAt: Date;

  @ApiProperty({
    description: 'Localização atual do motorista',
    type: CurrentLocationDto,
  })
  @ValidateNested()
  @Type(() => CurrentLocationDto)
  currentLocation: CurrentLocationDto;

  @ApiProperty({
    description: 'Informações da rota calculada',
    type: RouteInfoDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RouteInfoDto)
  route?: RouteInfoDto;
}