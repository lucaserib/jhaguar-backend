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
  @ApiProperty({ description: 'ID do tipo de corrida' })
  @IsString()
  rideTypeId: string;

  @ApiProperty({ description: 'Localização de origem', type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  origin: LocationDto;

  @ApiProperty({ description: 'Localização de destino', type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  destination: LocationDto;

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

  @ApiProperty({ description: 'Token de confirmação' })
  @IsString()
  confirmationToken: string;
}
