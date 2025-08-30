import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CurrentLocationDto {
  @ApiProperty({
    description: 'Latitude da localização atual',
    example: -23.5505,
  })
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitude da localização atual',
    example: -46.6333,
  })
  @IsNumber()
  lng: number;
}

export class ArrivedDto {
  @ApiProperty({
    description: 'Data e hora da chegada no local de embarque',
    example: '2024-08-06T18:15:00.000Z',
  })
  @IsDateString()
  arrivedAt: Date;

  @ApiProperty({
    description: 'Localização atual do motorista',
    type: CurrentLocationDto,
  })
  @ValidateNested()
  @Type(() => CurrentLocationDto)
  currentLocation: CurrentLocationDto;
}