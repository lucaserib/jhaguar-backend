import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class AddDriverRideTypeDto {
  @ApiProperty({
    description: 'ID do motorista',
    example: 'driver-uuid',
  })
  @IsString()
  driverId: string;

  @ApiProperty({
    description: 'ID do tipo de corrida',
    example: 'rt-standard',
  })
  @IsString()
  rideTypeId: string;

  @ApiProperty({
    description: 'Se está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateDriverRideTypesDto {
  @ApiProperty({
    description: 'IDs dos tipos de corrida suportados',
    example: ['rt-standard', 'rt-female-only'],
  })
  @IsArray()
  @IsString({ each: true })
  rideTypeIds: string[];
}
