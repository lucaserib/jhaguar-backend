import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RejectRideDto {
  @ApiProperty({
    description: 'Motivo da rejeição da corrida',
    example: 'Muito longe do meu local atual',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    description: 'Código do motivo para análise estatística',
    example: 'TOO_FAR',
    required: false,
  })
  @IsOptional()
  @IsString()
  reasonCode?: string;
}
