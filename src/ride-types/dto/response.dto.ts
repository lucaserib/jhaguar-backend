import { ApiProperty } from '@nestjs/swagger';
import { RideTypeEnum, VehicleType } from '@prisma/client';

export class RideTypeConfigResponse {
  @ApiProperty({ description: 'ID do tipo de corrida' })
  id: string;

  @ApiProperty({ description: 'Tipo da corrida', enum: RideTypeEnum })
  type: RideTypeEnum;

  @ApiProperty({ description: 'Nome do tipo' })
  name: string;

  @ApiProperty({ description: 'Descrição' })
  description: string;

  @ApiProperty({ description: 'Ícone' })
  icon: string;

  @ApiProperty({ description: 'Se está ativo' })
  isActive: boolean;

  @ApiProperty({ description: 'Se é exclusivo para mulheres' })
  femaleOnly: boolean;

  @ApiProperty({ description: 'Se requer veículo blindado' })
  requiresArmored: boolean;

  @ApiProperty({ description: 'Se requer veículo pet-friendly' })
  requiresPetFriendly: boolean;

  @ApiProperty({ description: 'Se permite motocicleta' })
  allowsMotorcycle: boolean;

  @ApiProperty({ description: 'Se é exclusivo para delivery' })
  isDeliveryOnly: boolean;

  @ApiProperty({
    description: 'Tipos de veículos compatíveis',
    enum: VehicleType,
    isArray: true,
  })
  vehicleTypes: VehicleType[];

  @ApiProperty({ description: 'Preço base em BRL' })
  basePrice: number;

  @ApiProperty({ description: 'Preço por km em BRL' })
  pricePerKm: number;

  @ApiProperty({ description: 'Preço por minuto em BRL' })
  pricePerMinute: number;

  @ApiProperty({ description: 'Multiplicador de alta demanda' })
  surgeMultiplier: number;

  @ApiProperty({ description: 'Preço mínimo em BRL' })
  minimumPrice: number;

  @ApiProperty({ description: 'Distância máxima em metros', required: false })
  maxDistance?: number;

  @ApiProperty({ description: 'Distância mínima em metros', required: false })
  minDistance?: number;

  @ApiProperty({ description: 'Prioridade na listagem' })
  priority: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}

export class RidePriceCalculationResponse {
  @ApiProperty({ description: 'Preço final calculado em BRL' })
  finalPrice: number;

  @ApiProperty({ description: 'Preço base em BRL' })
  basePrice: number;

  @ApiProperty({ description: 'Custo por distância em BRL' })
  distanceCost: number;

  @ApiProperty({ description: 'Custo por tempo em BRL' })
  timeCost: number;

  @ApiProperty({ description: 'Multiplicador de demanda aplicado' })
  surgeMultiplier: number;

  @ApiProperty({ description: 'Taxa adicional premium em BRL' })
  premiumFee: number;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({ description: 'Detalhes do cálculo' })
  breakdown: {
    distance: number;
    duration: number;
    rideType: string;
    isPremiumTime: boolean;
  };
}

export class AvailableDriversResponse {
  @ApiProperty({ description: 'Quantidade de motoristas disponíveis' })
  count: number;

  @ApiProperty({ description: 'Tempo estimado médio de chegada em minutos' })
  averageEta: number;

  @ApiProperty({ description: 'Se há motoristas disponíveis' })
  hasAvailableDrivers: boolean;
}

export class RideTypeSuggestionResponse {
  @ApiProperty({ description: 'Configuração do tipo de corrida' })
  rideType: RideTypeConfigResponse;

  @ApiProperty({ description: 'Informações de disponibilidade' })
  availability: AvailableDriversResponse;

  @ApiProperty({ description: 'Prioridade calculada' })
  priority: number;

  @ApiProperty({ description: 'Tempo estimado de chegada em minutos' })
  estimatedArrival: number;

  @ApiProperty({ description: 'Preço estimado em BRL', required: false })
  estimatedPrice?: number;

  @ApiProperty({ description: 'Se é recomendado para o contexto' })
  isRecommended: boolean;

  @ApiProperty({ description: 'Motivo da recomendação', required: false })
  reason?: string;

  @ApiProperty({ description: 'Informações contextuais' })
  contextualInfo: {
    highlights: string[];
    warnings: string[];
    estimatedSavings?: number;
  };
}

export class PriceComparisonResponse {
  @ApiProperty({ description: 'ID do tipo de corrida' })
  rideTypeId: string;

  @ApiProperty({ description: 'Nome do tipo de corrida' })
  rideTypeName: string;

  @ApiProperty({ description: 'Preço final em BRL' })
  finalPrice: number;

  @ApiProperty({ description: 'Economia em relação ao mais caro' })
  savings: number;

  @ApiProperty({ description: 'Porcentagem de economia' })
  savingsPercentage: number;

  @ApiProperty({ description: 'Tempo estimado em minutos' })
  estimatedTime: number;

  @ApiProperty({ description: 'Se é a opção recomendada' })
  isRecommended: boolean;

  @ApiProperty({ description: 'Detalhes do cálculo' })
  breakdown: any;
}

export * from './create-ride-type.dto';
export * from './update-ride-type.dto';
export * from './get-available-ride-types.dto';
export * from './calculate-ride-price.dto';
export * from './driver-ride-type.dto';
