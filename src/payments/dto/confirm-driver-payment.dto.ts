import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class ConfirmDriverPaymentDto {
  @ApiProperty({
    description: 'ID da corrida',
    example: 'uuid-da-corrida',
  })
  @IsUUID()
  rideId: string;

  @ApiProperty({
    description: 'Confirmação do recebimento do pagamento',
    example: true,
  })
  @IsBoolean()
  paymentReceived: boolean;

  @ApiProperty({
    description: 'Observações do motorista sobre o pagamento',
    example: 'Pagamento recebido em dinheiro',
    required: false,
  })
  @IsOptional()
  @IsString()
  driverNotes?: string;
}
