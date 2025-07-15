import { RideTypeEnum, Gender, VehicleType } from '@prisma/client';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface RideTypeInfo {
  id: string;
  type: RideTypeEnum;
  name: string;
  icon: string;
}

export interface VehicleInfo {
  model: string;
  color: string;
  licensePlate: string;
  vehicleType?: VehicleType;
  carImageUrl?: string;
  isArmored?: boolean;
  isLuxury?: boolean;
  isMotorcycle?: boolean;
  deliveryCapable?: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  profileImage?: string | null;
  gender?: Gender;
}

export interface DriverWithDistance extends Location {
  id: string;
  userId: string;
  user: UserInfo;
  vehicle?: VehicleInfo | null;
  averageRating: number;
  totalRides: number;
  distance?: number;
  estimatedTime?: number;
  estimatedPrice?: number;
  supportedRideTypes?: RideTypeInfo[];
}

export interface RouteCalculation {
  distance: number;
  duration: number;
  polyline?: string;
}

export interface NearbyDriversRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
  rideTypeId?: string;
  userGender?: Gender;
  requiresArmored?: boolean;
}

export interface CalculateRouteRequest {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
}

export interface CalculatePriceRequest {
  distance: number;
  duration: number;
  vehicleType?: string;
  surgeMultiplier?: number;
  rideTypeId?: string;
  isPremiumTime?: boolean;
}

export interface RideTypePriceRequest {
  rideTypeId: string;
  distance: number;
  duration: number;
  surgeMultiplier?: number;
  isPremiumTime?: boolean;
}

export interface GoogleRoutesApiRequest {
  origin: {
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  };
  destination: {
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  };
  travelMode: string;
  routingPreference: string;
  units: string;
  intermediates?: Array<{
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  }>;
}

export interface GoogleRoutesApiResponse {
  routes: Array<{
    distanceMeters: number;
    duration: string;
    polyline?: {
      encodedPolyline: string;
    };
  }>;
}

export interface GoogleDirectionsApiResponse {
  status: string;
  routes: Array<{
    legs: Array<{
      distance: {
        value: number;
      };
      duration: {
        value: number;
      };
    }>;
    overview_polyline?: {
      points: string;
    };
  }>;
}

export interface GoogleGeocodeApiResponse {
  status: string;
  results: Array<{
    formatted_address: string;
  }>;
}

export interface PriceRates {
  base: number;
  perKm: number;
  perMinute: number;
}

export interface BaseRates {
  [key: string]: PriceRates;
  ECONOMY: PriceRates;
  COMFORT: PriceRates;
  LUXURY: PriceRates;
  SUV: PriceRates;
  VAN: PriceRates;
}

export interface RideTypeAvailability {
  count: number;
  averageEta: number;
  hasAvailableDrivers: boolean;
  nearestDriver?: DriverWithDistance;
}

export interface RideTypeWithAvailability {
  id: string;
  type: RideTypeEnum;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  femaleOnly: boolean;
  requiresArmored: boolean;
  vehicleTypes: VehicleType[];
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  surgeMultiplier: number;
  minimumPrice: number;
  availability: RideTypeAvailability;
}

export interface RideTypeSuggestion extends RideTypeWithAvailability {
  priority: number;
  estimatedArrival: number;
  estimatedPrice?: number;
  isRecommended?: boolean;
  reason?: string;
}

export interface PriceComparison {
  rideTypeId: string;
  rideTypeName: string;
  estimatedPrice: number;
  savings?: number;
  savingsPercentage?: number;
  estimatedTime: number;
  vehicleTypes: VehicleType[];
}

export interface MultiRideTypePriceRequest {
  rideTypeIds: string[];
  distance: number;
  duration: number;
  surgeMultiplier?: number;
  isPremiumTime?: boolean;
}

export interface DriversFilterRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
  rideTypeId?: string;
  userGender?: Gender;
  vehicleType?: VehicleType;
  minRating?: number;
  maxPrice?: number;
  femaleDriversOnly?: boolean;
  armoredVehicleOnly?: boolean;
  luxuryOnly?: boolean;
  deliveryCapable?: boolean;
}

export interface AdvancedDriverSearch extends DriversFilterRequest {
  preferences: {
    prioritizeRating?: boolean;
    prioritizeDistance?: boolean;
    prioritizePrice?: boolean;
    prioritizeTime?: boolean;
  };
  excludeDriverIds?: string[];
  includeInactive?: boolean;
}

export interface RideMatchingResult {
  drivers: DriverWithDistance[];
  rideType: RideTypeWithAvailability;
  estimatedPrices: PriceComparison[];
  alternatives: RideTypeSuggestion[];
  recommendations: {
    fastest: DriverWithDistance;
    cheapest: DriverWithDistance;
    bestRated: DriverWithDistance;
    closest: DriverWithDistance;
  };
}

export interface GeofenceArea {
  name: string;
  center: Location;
  radius: number;
  isActive: boolean;
  surgeMultiplier?: number;
  restrictedRideTypes?: RideTypeEnum[];
  availableRideTypes?: RideTypeEnum[];
}

export interface DynamicPricingZone {
  id: string;
  name: string;
  polygon: Location[];
  currentSurge: number;
  demandLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  availableDrivers: number;
  activeRides: number;
  estimatedWaitTime: number;
}

export interface RideTypeConfigWithZones extends RideTypeWithAvailability {
  pricingZones: DynamicPricingZone[];
  geofences: GeofenceArea[];
}

export interface SmartRideRecommendation {
  primaryRecommendation: RideTypeSuggestion;
  alternatives: RideTypeSuggestion[];
  priceComparison: PriceComparison[];
  timeComparison: {
    rideTypeId: string;
    estimatedPickupTime: number;
    estimatedTotalTime: number;
  }[];
  personalizedFactors: {
    userPreferences: string[];
    historicalChoices: string[];
    currentContext: string[];
  };
  confidence: number;
}
