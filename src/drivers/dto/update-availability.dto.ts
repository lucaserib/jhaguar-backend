import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CurrentLocationDto {
  @ApiProperty({
    description: 'Latitude da localização atual',
    example: -23.5505,
  })
  @IsOptional()
  lat?: number;

  @ApiProperty({
    description: 'Longitude da localização atual',
    example: -46.6333,
  })
  @IsOptional()
  lng?: number;
}

export class UpdateAvailabilityDto {
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
    description: 'Localização atual do motorista',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CurrentLocationDto)
  currentLocation?: CurrentLocationDto;
}
