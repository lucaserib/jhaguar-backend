import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class ProcessRidePaymentDto {
  @ApiProperty({
    description: 'ID da corrida',
    example: 'uuid-da-corrida',
  })
  @IsUUID()
  rideId: string;

  @ApiProperty({
    description: 'Método de pagamento escolhido',
    enum: PaymentMethod,
    example: PaymentMethod.WALLET_BALANCE,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Valor do pagamento',
    example: 25.5,
  })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    description: 'Observações do pagamento',
    example: 'Pagamento realizado com sucesso',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
