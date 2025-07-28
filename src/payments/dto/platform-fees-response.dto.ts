import { ApiProperty } from '@nestjs/swagger';

export class PlatformFeesResponse {
  @ApiProperty({ description: 'Valor bruto da corrida' })
  grossAmount: number;

  @ApiProperty({ description: 'Taxa da plataforma' })
  platformFee: number;

  @ApiProperty({ description: 'Valor líquido para o motorista' })
  netAmount: number;

  @ApiProperty({ description: 'Porcentagem da taxa' })
  feePercentage: number;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'Detalhes do cálculo' })
  breakdown: {
    description: string;
    calculations: {
      step: string;
      value: number;
      formula: string;
    }[];
  };
}
