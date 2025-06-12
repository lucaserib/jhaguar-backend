import { ApiProperty } from '@nestjs/swagger';

export class LocationResponse {
  @ApiProperty({ description: 'Latitude' })
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  longitude: number;
}

export class UserResponse {
  @ApiProperty({ description: 'Primeiro nome' })
  firstName: string;

  @ApiProperty({ description: 'Último nome' })
  lastName: string;

  @ApiProperty({ description: 'Imagem de perfil', required: false })
  profileImage?: string | null;
}

export class VehicleResponse {
  @ApiProperty({ description: 'Modelo do veículo' })
  model: string;

  @ApiProperty({ description: 'Cor do veículo' })
  color: string;

  @ApiProperty({ description: 'Placa do veículo' })
  licensePlate: string;
}

export class DriverWithDistanceResponse extends LocationResponse {
  @ApiProperty({ description: 'ID do motorista' })
  id: string;

  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'Dados do usuário', type: UserResponse })
  user: UserResponse;

  @ApiProperty({
    description: 'Dados do veículo',
    type: VehicleResponse,
    required: false,
  })
  vehicle?: VehicleResponse | null;

  @ApiProperty({ description: 'Avaliação média' })
  averageRating: number;

  @ApiProperty({ description: 'Total de corridas' })
  totalRides: number;

  @ApiProperty({ description: 'Distância em km', required: false })
  distance?: number;

  @ApiProperty({ description: 'Tempo estimado em minutos', required: false })
  estimatedTime?: number;

  @ApiProperty({ description: 'Preço estimado em reais', required: false })
  estimatedPrice?: number;
}

export class RouteCalculationResponse {
  @ApiProperty({ description: 'Distância em metros' })
  distance: number;

  @ApiProperty({ description: 'Duração em segundos' })
  duration: number;

  @ApiProperty({ description: 'Polyline codificada da rota', required: false })
  polyline?: string;
}

export class StandardApiResponse<T> {
  @ApiProperty({ description: 'Indica se a operação foi bem sucedida' })
  success: boolean;

  @ApiProperty({ description: 'Dados retornados' })
  data: T;
}

export class NearbyDriversResponse extends StandardApiResponse<
  DriverWithDistanceResponse[]
> {
  @ApiProperty({ description: 'Quantidade de motoristas encontrados' })
  count: number;
}

export class RouteResponse extends StandardApiResponse<RouteCalculationResponse> {}

export class PriceBreakdownResponse {
  @ApiProperty({ description: 'Distância considerada' })
  distance: number;

  @ApiProperty({ description: 'Duração considerada' })
  duration: number;

  @ApiProperty({ description: 'Tipo de veículo' })
  vehicleType: string;

  @ApiProperty({ description: 'Multiplicador de demanda' })
  surgeMultiplier: number;
}

export class PriceCalculationResponse {
  @ApiProperty({ description: 'Preço base calculado' })
  basePrice: number;

  @ApiProperty({ description: 'Moeda utilizada' })
  currency: string;

  @ApiProperty({
    description: 'Detalhamento do cálculo',
    type: PriceBreakdownResponse,
  })
  breakdown: PriceBreakdownResponse;
}

export class PriceResponse extends StandardApiResponse<PriceCalculationResponse> {}

export class AddressResponse {
  @ApiProperty({ description: 'Endereço encontrado' })
  address: string;

  @ApiProperty({
    description: 'Coordenadas utilizadas',
    type: LocationResponse,
  })
  coordinates: LocationResponse;
}

export class GeocodeResponse extends StandardApiResponse<AddressResponse> {}
