export interface LoadingPageProps {
  themeClass: string;
}

// src/types/transport.ts
export interface TransportationType {
  transportationTypeId?: number;
  transportationTypeName: string;
  description: string;
}

export interface Transportation {
  transportationId?: number;
  transportationProviderName: string;
  transportationType: TransportationType;
}

export interface Vehicle {
  vehicleId?: number;
  registrationNumber: string;
  seatsNumber: number;
  transportation: Transportation;
}

export interface RouteInfo {
  routeId?: number;
  routeName: string;
  estimatedTime: string;
}

export interface VehicleRoute {
  vehicleRouteId?: number;
  startPoint: string;
  endPoint: string;
  restStopsNumber: number;
  date: string;
  vehicle: Vehicle;
  route: RouteInfo;
}

// Type definition for the accommodation data
interface Provider {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  nationalCode: string;
  profilePicture: string;
}

export interface Accommodation {
  idAccommodation?: number;
  address: string;
  roomsCount: number;
  bathroomsCount: number;
  showersCount: number;
  wifiAvailable: boolean;
  priceForNight: number;
  provider: Provider;
}

export interface Reservation {
  reservationId?: number;
  accommodation: Accommodation;
  supporter: Supporter;
}

export interface User {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  nationalCode: string;
  profilePicture: string;
}

export interface Supporter extends User {
  isFanIdValid: boolean;
  card: Card;
}

export interface Card {
  cardId: number;
  cardNumber: string;
  cardType: string;
  issueDate: string;
  expiryDate: string;
}
