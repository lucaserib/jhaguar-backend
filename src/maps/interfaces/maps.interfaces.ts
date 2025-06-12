export interface Location {
  latitude: number;
  longitude: number;
}

export interface DriverWithDistance extends Location {
  id: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    profileImage?: string | null;
  };
  vehicle?: {
    model: string;
    color: string;
    licensePlate: string;
    vehicleType?: string;
  } | null;
  averageRating: number;
  totalRides: number;
  distance?: number;
  estimatedTime?: number;
  estimatedPrice?: number;
}

export interface RouteCalculation {
  distance: number; // em metros
  duration: number; // em segundos
  polyline?: string;
}

export interface NearbyDriversRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
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
}

// Interfaces para APIs do Google Maps
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
