import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Número da licença de motorista',
    example: 'ABC123456',
  })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({
    description: 'Data de expiração da licença',
    example: '2025-12-31',
    required: false,
  })
  @IsDateString()
  @IsNotEmpty()
  licenseExpiryDate: string;

  @ApiProperty({
    description: 'Informações da conta bancária',
    example: 'Banco XYZ - Agência 0001 - Conta 12345-6',
    required: false,
  })
  @IsString()
  @IsOptional()
  bankAccount?: string;
}
