import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CurrentLocationDto } from '../../common/dto/location.dto';

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
