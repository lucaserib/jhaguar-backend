import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty({
    description: 'Latitude',
    example: -23.5505,
  })
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude',
    example: -46.6333,
  })
  @IsNumber()
  lng: number;
}

export class CalculateRouteNewDto {
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
    description: 'Pontos intermediários da rota',
    type: [LocationDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  waypoints?: LocationDto[];
}

export class RouteStep {
  @ApiProperty({
    description: 'Instruções da etapa',
    example: 'Vire à direita na Rua das Flores',
  })
  instruction: string;

  @ApiProperty({
    description: 'Distância da etapa em metros',
    example: 250,
  })
  distance: number;

  @ApiProperty({
    description: 'Duração da etapa em segundos',
    example: 45,
  })
  duration: number;

  @ApiProperty({
    description: 'Coordenadas de início da etapa',
    type: LocationDto,
  })
  startLocation: LocationDto;

  @ApiProperty({
    description: 'Coordenadas de fim da etapa',
    type: LocationDto,
  })
  endLocation: LocationDto;
}

export class RouteResponseDto {
  @ApiProperty({
    description: 'Distância total da rota em metros',
    example: 15280,
  })
  distance: number;

  @ApiProperty({
    description: 'Duração total da rota em segundos',
    example: 1860,
  })
  duration: number;

  @ApiProperty({
    description: 'Polyline codificada da rota',
    example: 'u{~vFvyys@fS]',
  })
  polyline: string;

  @ApiProperty({
    description: 'Etapas detalhadas da rota',
    type: [RouteStep],
  })
  steps: RouteStep[];

  @ApiProperty({
    description: 'Limites geográficos da rota',
    example: {
      northeast: { lat: -23.5505, lng: -46.6333 },
      southwest: { lat: -23.5605, lng: -46.6433 }
    },
  })
  bounds: {
    northeast: LocationDto;
    southwest: LocationDto;
  };
}