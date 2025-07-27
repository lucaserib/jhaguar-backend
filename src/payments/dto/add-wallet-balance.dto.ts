import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class AddWalletBalanceDto {
  @ApiProperty({
    description: 'Valor a ser adicionado ao saldo (em BRL)',
    example: 50.0,
    minimum: 10,
    maximum: 1000,
  })
  @IsNumber()
  @Min(10)
  @Max(1000)
  amount: number;

  @ApiProperty({
    description: 'Método de pagamento para adicionar saldo',
    example: 'CREDIT_CARD',
    enum: ['CREDIT_CARD', 'DEBIT_CARD'],
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentMethod?: 'CREDIT_CARD' | 'DEBIT_CARD';

  @ApiProperty({
    description: 'Token do método de pagamento do Stripe',
    example: 'pm_1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentMethodToken?: string;
}
