import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty({ description: 'Latitude', example: -23.5505 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({ description: 'Longitude', example: -46.6333 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({ description: 'Endereço', example: 'Rua da República, 123' })
  @IsString()
  address: string;
}

export class CreateRideDto {
  @ApiProperty({ description: 'ID do passageiro', required: false })
  @IsOptional()
  @IsString()
  passengerId?: string;

  @ApiProperty({ description: 'ID do tipo de corrida' })
  @IsString()
  rideTypeId: string;

  @ApiProperty({ description: 'Nome do tipo de corrida', required: false })
  @IsOptional()
  @IsString()
  rideTypeName?: string;

  @ApiProperty({
    description: 'Localização de origem',
    type: LocationDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  origin?: LocationDto;

  @ApiProperty({
    description: 'Localização de destino',
    type: LocationDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  destination?: LocationDto;

  @ApiProperty({ description: 'Distância estimada em metros' })
  @IsNumber()
  @Min(100)
  estimatedDistance: number;

  @ApiProperty({ description: 'Duração estimada em segundos' })
  @IsNumber()
  @Min(60)
  estimatedDuration: number;

  @ApiProperty({ description: 'Preço estimado', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedPrice?: number;

  @ApiProperty({ description: 'ID do motorista específico', required: false })
  @IsOptional()
  @IsString()
  selectedDriverId?: string;

  @ApiProperty({ description: 'Horário agendado', required: false })
  @IsOptional()
  @IsDateString()
  scheduledTime?: string;

  @ApiProperty({ description: 'Tem pets', required: false })
  @IsOptional()
  @IsBoolean()
  hasPets?: boolean;

  @ApiProperty({ description: 'Descrição do pet', required: false })
  @IsOptional()
  @IsString()
  petDescription?: string;

  @ApiProperty({ description: 'Requisitos especiais', required: false })
  @IsOptional()
  @IsString()
  specialRequirements?: string;

  @ApiProperty({ description: 'Quantidade de bagagem', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  baggageQuantity?: number;

  @ApiProperty({
    description: 'Detalhes do cálculo de preço',
    required: false,
    example: {
      finalPrice: 28.9,
      basePrice: 8,
      distanceCost: 15,
      timeCost: 5.9,
      surgeMultiplier: 1,
      premiumFee: 0,
      currency: 'BRL',
      breakdown: {
        distance: 12,
        duration: 25,
        rideType: 'Normal',
        isPremiumTime: false,
      },
    },
  })
  @IsOptional()
  priceCalculation?: any;

  @ApiProperty({ description: 'Token de confirmação', required: false })
  @IsOptional()
  @IsString()
  confirmationToken?: string;

  // Campos flat legados (compatibilidade)
  @ApiProperty({ description: 'Endereço de origem (legado)', required: false })
  @IsOptional()
  @IsString()
  originAddress?: string;

  @ApiProperty({
    description: 'Latitude de origem (legado)',
    required: false,
    example: -23.5505,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  originLatitude?: number;

  @ApiProperty({
    description: 'Longitude de origem (legado)',
    required: false,
    example: -46.6333,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  originLongitude?: number;

  @ApiProperty({ description: 'Endereço de destino (legado)', required: false })
  @IsOptional()
  @IsString()
  destinationAddress?: string;

  @ApiProperty({
    description: 'Latitude de destino (legado)',
    required: false,
    example: -23.5505,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  destinationLatitude?: number;

  @ApiProperty({
    description: 'Longitude de destino (legado)',
    required: false,
    example: -46.6333,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  destinationLongitude?: number;
}
