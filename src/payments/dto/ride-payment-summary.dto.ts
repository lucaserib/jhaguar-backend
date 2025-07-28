import { ApiProperty } from '@nestjs/swagger';

export class RidePaymentSummaryResponse {
  @ApiProperty({ description: 'ID da corrida' })
  rideId: string;

  @ApiProperty({ description: 'Valor total da corrida' })
  totalAmount: number;

  @ApiProperty({ description: 'Valor líquido para o motorista' })
  driverAmount: number;

  @ApiProperty({ description: 'Taxa da plataforma' })
  platformFee: number;

  @ApiProperty({ description: 'Método de pagamento utilizado' })
  paymentMethod: string;

  @ApiProperty({ description: 'Status do pagamento' })
  paymentStatus: string;

  @ApiProperty({ description: 'Se foi confirmado pelo motorista' })
  confirmedByDriver: boolean;

  @ApiProperty({ description: 'Data da confirmação', required: false })
  confirmationTime?: Date;

  @ApiProperty({ description: 'Observações do motorista', required: false })
  driverNotes?: string;

  @ApiProperty({ description: 'Detalhes da transferência', required: false })
  transferDetails?: {
    fromUserId: string;
    toUserId: string;
    amount: number;
    completedAt: Date;
    transactionIds: string[];
  };

  @ApiProperty({ description: 'Saldos atualizados' })
  balances: {
    passenger: number;
    driver: number;
  };
}
