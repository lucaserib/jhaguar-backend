import { ApiProperty } from '@nestjs/swagger';

export class TransferResponse {
  @ApiProperty({ description: 'Valor transferido' })
  amount: number;

  @ApiProperty({ description: 'ID do usuário remetente' })
  fromUserId: string;

  @ApiProperty({ description: 'ID do usuário destinatário' })
  toUserId: string;

  @ApiProperty({ description: 'Novo saldo do remetente' })
  fromBalance: number;

  @ApiProperty({ description: 'Novo saldo do destinatário' })
  toBalance: number;

  @ApiProperty({ description: 'ID da transação de débito' })
  debitTransaction: string;

  @ApiProperty({ description: 'ID da transação de crédito' })
  creditTransaction: string;

  @ApiProperty({ description: 'Data da transferência' })
  transferredAt: Date;

  @ApiProperty({ description: 'Descrição da transferência' })
  description: string;

  @ApiProperty({ description: 'Status da transferência' })
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
}
