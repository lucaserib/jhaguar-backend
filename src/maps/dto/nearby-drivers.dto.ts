import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class NearbyDriversDto {
  @ApiProperty({
    description: 'Latitude do ponto de busca',
    example: -23.5505,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude do ponto de busca',
    example: -46.6333,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'Raio de busca em quilômetros',
    example: 5,
    minimum: 1,
    maximum: 50,
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  radius: number;

  @ApiProperty({
    description: 'Limite de motoristas a retornar',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;
}

export class NearbyDriver {
  @ApiProperty({
    description: 'ID do motorista',
    example: 'uuid-driver-id',
  })
  driverId: string;

  @ApiProperty({
    description: 'Nome do motorista',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Avaliação média do motorista',
    example: 4.8,
  })
  rating: number;

  @ApiProperty({
    description: 'Localização atual do motorista',
    example: { latitude: -23.5505, longitude: -46.6333 },
  })
  location: {
    latitude: number;
    longitude: number;
  };

  @ApiProperty({
    description: 'Distância em metros do ponto de busca',
    example: 1250,
  })
  distance: number;

  @ApiProperty({
    description: 'Tempo estimado para chegada em minutos',
    example: 5,
  })
  estimatedArrival: number;

  @ApiProperty({
    description: 'Informações do veículo',
    example: {
      model: 'Civic',
      color: 'Preto',
      licensePlate: 'ABC-1234'
    },
  })
  vehicle: {
    model: string;
    color: string;
    licensePlate: string;
  };

  @ApiProperty({
    description: 'Indica se o motorista está online',
    example: true,
  })
  isOnline: boolean;

  @ApiProperty({
    description: 'Indica se o motorista está disponível',
    example: true,
  })
  isAvailable: boolean;
}