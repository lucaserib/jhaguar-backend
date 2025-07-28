import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreatePaymentIntentDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Valor em reais (formato string, ex: "25.50")',
    example: '25.50',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Valor deve estar no formato correto (ex: 25.50)',
  })
  amount: string;
}
