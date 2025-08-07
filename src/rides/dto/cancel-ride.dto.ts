import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';

export class CancelRideDto {
  @ApiProperty({
    description: 'Motivo do cancelamento',
    example: 'Passageiro não compareceu',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    description: 'Código do motivo para análise estatística',
    example: 'PASSENGER_NO_SHOW',
  })
  @IsString()
  @IsNotEmpty()
  reasonCode: string;

  @ApiProperty({
    description: 'Indica se o cancelamento foi feito pelo motorista',
    example: true,
  })
  @IsBoolean()
  isDriver: boolean;

  @ApiProperty({
    description: 'Data e hora do cancelamento',
    example: '2024-08-06T18:30:00.000Z',
  })
  @IsDateString()
  cancelledAt: Date;
}