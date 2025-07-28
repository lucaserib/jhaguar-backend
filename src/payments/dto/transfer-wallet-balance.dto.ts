import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsUUID, Min } from 'class-validator';

export class TransferWalletBalanceDto {
  @ApiProperty({
    description: 'ID do usuário destinatário',
    example: 'uuid-do-destinatario',
  })
  @IsUUID()
  toUserId: string;

  @ApiProperty({
    description: 'Valor a ser transferido (em BRL)',
    example: 25.0,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Descrição da transferência',
    example: 'Transferência para pagamento de corrida',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID da corrida (se aplicável)',
    example: 'uuid-da-corrida',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  rideId?: string;

  @ApiProperty({
    description: 'Metadados adicionais',
    example: { type: 'ride_payment', priority: 'high' },
    required: false,
  })
  @IsOptional()
  metadata?: any;
}
