import { ApiProperty } from '@nestjs/swagger';

export class AutoChargeNotificationDto {
  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'Valor total cobrado automaticamente' })
  amount: number;

  @ApiProperty({ description: 'Quantidade de taxas cobradas' })
  feeCount: number;

  @ApiProperty({ description: 'Saldo anterior' })
  previousBalance: number;

  @ApiProperty({ description: 'Novo saldo após cobrança' })
  newBalance: number;

  @ApiProperty({ description: 'Data e hora da cobrança' })
  chargedAt: Date;

  @ApiProperty({ description: 'Lista das taxas cobradas' })
  chargedFees: Array<{
    id: string;
    amount: number;
    description: string;
    rideId?: string;
  }>;
}
export class CriticalFeeBlockDto {
  @ApiProperty({ description: 'Valor total das taxas pendentes' })
  totalAmount: number;

  @ApiProperty({ description: 'Dias em atraso' })
  daysPending: number;

  @ApiProperty({ description: 'Quantidade de taxas pendentes' })
  feeCount: number;

  @ApiProperty({ description: 'Se pode pagar agora com saldo atual' })
  canPayNow: boolean;

  @ApiProperty({ description: 'Saldo atual da carteira' })
  walletBalance: number;

  @ApiProperty({ description: 'Ações recomendadas' })
  recommendedActions: string[];
}
