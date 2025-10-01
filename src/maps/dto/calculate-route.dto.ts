import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from '../../common/dto';

/**
 * CORREÇÃO: DTO unificado para cálculo de rotas
 * Remove duplicação e usa LocationDto centralizado
 * Substitui tanto CalculateRouteDto quanto CalculateRouteNewDto
 */
export class CalculateRouteDto {
  @ApiProperty({
    description: 'Ponto de origem da rota',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  origin: LocationDto;

  @ApiProperty({
    description: 'Ponto de destino da rota',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  destination: LocationDto;

  @ApiProperty({
    description: 'Pontos intermediários da rota (waypoints)',
    type: [LocationDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  waypoints?: LocationDto[];
}

/**
 * CORREÇÃO: Response DTO padronizado para rotas
 * Inclui todas as informações necessárias
 */
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
    description: 'Polyline codificada da rota (Google format)',
    example: 'u{~vFvyys@fS]',
    required: false,
  })
  polyline?: string;

  @ApiProperty({
    description: 'Etapas detalhadas da rota',
    type: [RouteStep],
    required: false,
  })
  steps?: RouteStep[];

  @ApiProperty({
    description: 'Limites geográficos da rota',
    example: {
      northeast: { latitude: -23.5505, longitude: -46.6333 },
      southwest: { latitude: -23.5605, longitude: -46.6433 },
    },
    required: false,
  })
  bounds?: {
    northeast: LocationDto;
    southwest: LocationDto;
  };
}
