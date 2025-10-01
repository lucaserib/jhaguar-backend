import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from '../../common/dto/location.dto';

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
  @IsNotEmpty({ message: 'startedAt is required' })
  @IsDateString(
    {},
    { message: 'startedAt must be a valid ISO 8601 date string' },
  )
  startedAt: string; // CORREÇÃO: Simplificar - deixar apenas IsDateString fazer a validação

  @ApiProperty({
    description: 'Localização atual do motorista',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  currentLocation: LocationDto;

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
