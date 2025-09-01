import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from '../../common/dto/location.dto';

export class ArrivedDto {
  @ApiProperty({
    description: 'Data e hora da chegada no local de embarque',
    example: '2024-08-06T18:15:00.000Z',
  })
  @IsDateString()
  arrivedAt: string;

  @ApiProperty({
    description: 'Localização atual do motorista',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  currentLocation: LocationDto;
}