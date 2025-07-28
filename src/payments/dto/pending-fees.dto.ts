import { ApiProperty } from '@nestjs/swagger';

export class PendingFeesResponse {
  @ApiProperty({ description: 'Total de taxas pendentes' })
  totalPendingFees: number;

  @ApiProperty({ description: 'Quantidade de taxas pendentes' })
  pendingCount: number;

  @ApiProperty({ description: 'Saldo atual da carteira' })
  currentBalance: number;

  @ApiProperty({ description: 'Se pode pagar todas as taxas pendentes' })
  canPayAllPending: boolean;

  @ApiProperty({ description: 'Lista das taxas pendentes' })
  pendingFees: Array<{
    id: string;
    rideId: string;
    amount: number;
    description: string;
    createdAt: Date;
    rideDetails?: {
      originAddress: string;
      destinationAddress: string;
      date: Date;
    };
  }>;

  @ApiProperty({
    description: 'Próxima data de cobrança automática',
    required: false,
  })
  nextAutoChargeDate?: Date;
}
