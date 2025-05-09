export interface LoadingPageProps {
  themeClass: string;
}

// src/types/transport.ts
export interface TransportationType {
  transportationTypeId: number;
  transportationTypeName: string;
  description: string;
}

export interface Transportation {
  transportationId: number;
  transportationProviderName: string;
  transportationType: TransportationType;
}

export interface Vehicle {
  vehicleId: number;
  registrationNumber: string;
  seatsNumber: number;
  transportation: Transportation;
}

export interface RouteInfo {
  routeId: number;
  routeName: string;
  estimatedTime: string;
}

export interface VehicleRoute {
  vehicleRouteId: number;
  startPoint: string;
  endPoint: string;
  restStopsNumber: number;
  date: string;
  vehicle: Vehicle;
  route: RouteInfo;
}
