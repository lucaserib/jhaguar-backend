import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class FinalLocationDto {
  @ApiProperty({
    description: 'Latitude da localização final',
    example: -23.5505,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'Longitude da localização final',
    example: -46.6333,
  })
  @IsNumber()
  longitude: number;
}

export class CompleteRideDto {
  @ApiProperty({
    description: 'Data e hora da finalização da corrida',
    example: '2024-08-06T18:30:00.000Z',
  })
  @IsDateString()
  completedAt: Date;

  @ApiProperty({
    description: 'Localização final onde a corrida foi finalizada',
    type: FinalLocationDto,
  })
  @ValidateNested()
  @Type(() => FinalLocationDto)
  finalLocation: FinalLocationDto;

  @ApiProperty({
    description: 'Distância real percorrida em metros',
    example: 15280,
  })
  @IsNumber()
  @Min(0)
  actualDistance: number;

  @ApiProperty({
    description: 'Duração real da corrida em segundos',
    example: 1860,
  })
  @IsNumber()
  @Min(0)
  actualDuration: number;
}