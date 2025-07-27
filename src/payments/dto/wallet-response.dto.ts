import { ApiProperty } from '@nestjs/swagger';

export class WalletBalanceResponse {
  @ApiProperty({ description: 'Saldo atual da carteira' })
  balance: number;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'Se a carteira está bloqueada' })
  isBlocked: boolean;

  @ApiProperty({ description: 'Motivo do bloqueio', required: false })
  blockReason?: string;

  @ApiProperty({ description: 'Data da última atualização' })
  lastUpdated: Date;
}

export class TransactionResponse {
  @ApiProperty({ description: 'ID da transação' })
  id: string;

  @ApiProperty({ description: 'Tipo da transação' })
  type: string;

  @ApiProperty({ description: 'Status da transação' })
  status: string;

  @ApiProperty({ description: 'Valor da transação' })
  amount: number;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'Descrição da transação' })
  description: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de processamento', required: false })
  processedAt?: Date;

  @ApiProperty({ description: 'Metadados adicionais', required: false })
  metadata?: any;
}

export class PaymentMethodOption {
  @ApiProperty({ description: 'Código do método de pagamento' })
  code: string;

  @ApiProperty({ description: 'Nome do método de pagamento' })
  name: string;

  @ApiProperty({ description: 'Descrição do método' })
  description: string;

  @ApiProperty({ description: 'Se está disponível' })
  available: boolean;

  @ApiProperty({ description: 'Ícone do método' })
  icon: string;

  @ApiProperty({ description: 'Se requer saldo suficiente' })
  requiresBalance?: boolean;

  @ApiProperty({ description: 'Se é processado pelo app' })
  isDigital: boolean;
}
