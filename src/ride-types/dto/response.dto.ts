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

  @ApiProperty({
    description: 'Tipos de veículos',
    enum: VehicleType,
    isArray: true,
  })
  vehicleTypes: VehicleType[];

  @ApiProperty({ description: 'Preço base' })
  basePrice: number;

  @ApiProperty({ description: 'Preço por km' })
  pricePerKm: number;

  @ApiProperty({ description: 'Preço por minuto' })
  pricePerMinute: number;

  @ApiProperty({ description: 'Multiplicador de alta demanda' })
  surgeMultiplier: number;

  @ApiProperty({ description: 'Preço mínimo' })
  minimumPrice: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
export class RidePriceCalculationResponse {
  @ApiProperty({ description: 'Preço final calculado' })
  finalPrice: number;

  @ApiProperty({ description: 'Preço base usado' })
  basePrice: number;

  @ApiProperty({ description: 'Custo por distância' })
  distanceCost: number;

  @ApiProperty({ description: 'Custo por tempo' })
  timeCost: number;

  @ApiProperty({ description: 'Multiplicador aplicado' })
  surgeMultiplier: number;

  @ApiProperty({ description: 'Taxa adicional premium' })
  premiumFee: number;

  @ApiProperty({ description: 'Moeda' })
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

  @ApiProperty({ description: 'Tempo estimado médio' })
  averageEta: number;

  @ApiProperty({ description: 'Se há motoristas disponíveis' })
  hasAvailableDrivers: boolean;
}
