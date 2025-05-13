import {
  RouteInfo,
  Transportation,
  TransportationType,
  Vehicle,
  VehicleRoute,
} from "@/interfaces";
import { apiInstance } from "../axios/axios.api";

//  create a new VehicleRoute
// It makes a POST request to the "/vehicleRoute/createVehicleRoute" endpoint.
export const createVehicleRoute = async (vehicleRouteData: VehicleRoute) => {
  try {
    const response = await apiInstance.post(
      "/vehicleRoute/createVehicleRoute",
      vehicleRouteData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle route:", error);
    throw error;
  }
};

// This function is used to update an existing VehicleRoute.
// It makes a PUT request to the "/vehicleRoute/updateVehicleRoute" endpoint.
export const updateVehicleRoute = async (vehicleRouteData: VehicleRoute) => {
  try {
    const response = await apiInstance.put(
      `/vehicleRoute/updateVehicleRoute`,
      vehicleRouteData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle route:", error);
    throw error;
  }
};

// This function is used to delete a VehicleRoute by its ID.
// It makes a DELETE request to the "/vehicleRoute/deleteVehicleRoute/:vehicleRouteId" endpoint.
export const deleteVehicleRoute = async (vehicleRouteId: number) => {
  try {
    const response = await apiInstance.delete(
      `/vehicleRoute/deleteVehicleRoute/${vehicleRouteId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting vehicle route:", error);
    throw error;
  }
};

// This function is used to get all routes.
// It makes a GET request to the "/vehicleRoute/getAllVehicleRoutes" endpoint.
export const getAllRoutes = async () => {
  try {
    const response = await apiInstance.get("/vehicleRoute/getAllVehicleRoutes");
    return response.data;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

// This function is used to get a route by its ID.
// It makes a GET request to the "/vehicleRoute/getVehicleRoute/:routeId" endpoint.
export const getRouteById = async (routeId: string) => {
  try {
    const response = await apiInstance.get(
      `/vehicleRoute/getVehicleRoute/${routeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching route by ID:", error);
    throw error;
  }
};

// This function is used to find a route by its start and end points.
// It makes a GET request to the "/vehicleRoute/findByStrateAndEndDPoint/:startPoint/:endPoint" endpoint.
export const findByStartAndEndPoint = async (
  startPoint: string,
  endPoint: string
): Promise<VehicleRoute[]> => {
  try {
    console.log("Finding route from:", startPoint, "to:", endPoint);
    const response = await apiInstance.get<VehicleRoute[]>(
      `/vehicleRoute/findByStrateAndEndDPoint/${startPoint}/${endPoint}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching route by start and end point:", error);
    throw error;
  }
};

// This function is used to create a new route.
// It makes a POST request to the "/route/createRoute" endpoint.
export const createRoute = async (routeData: RouteInfo) => {
  try {
    const response = await apiInstance.post("/route/createRoute", routeData);
    return response.data;
  } catch (error) {
    console.error("Error creating route:", error);
    throw error;
  }
};

// This function is used to update an existing route.
// It makes a PUT request to the "/route/updateRoute" endpoint.
export const updateRoute = async (routeData: RouteInfo) => {
  try {
    const response = await apiInstance.put(`/route/updateRoute`, routeData);
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
    throw error;
  }
};

// This function is used to delete a route by its ID.
// It makes a DELETE request to the "/route/deleteRoute/:routeId" endpoint.
export const deleteRoute = async (routeId: number) => {
  try {
    const response = await apiInstance.delete(`/route/deleteRoute/${routeId}`);
    return response;
  } catch (error) {
    console.error("Error deleting route:", error);
    throw error;
  }
};

// this function creates a new transportation type
// It makes a POST request to the "/transportationType/createTransportationType" endpoint.
export const createTransportationType = async (
  transportationTypeData: TransportationType
) => {
  try {
    const response = await apiInstance.post(
      "/transportationType/createTransportationType",
      transportationTypeData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transportation type:", error);
    throw error;
  }
};

// this function updates an existing transportation type
// It makes a PUT request to the "/transportationType/updateTransportationType" endpoint.
export const updateTransportationType = async (
  transportationTypeData: TransportationType
) => {
  try {
    const response = await apiInstance.put(
      `/transportationType/updateTransportationType`,
      transportationTypeData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transportation type:", error);
    throw error;
  }
};

// this function deletes a transportation type by its ID
// It makes a DELETE request to the "/transportationType/deleteTransportationType/:transportationTypeId" endpoint.
export const deleteTransportationType = async (
  transportationTypeId: number
) => {
  try {
    const response = await apiInstance.delete(
      `/transportationType/deleteTransportationType/${transportationTypeId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting transportation type:", error);
    throw error;
  }
};

// this function creates a new transportation
// It makes a POST request to the "/transportation/createTransportation" endpoint.

export const createTransportation = async (
  transportationData: Transportation
) => {
  try {
    const response = await apiInstance.post(
      "/transportation/createTransportation",
      transportationData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transportation:", error);
    throw error;
  }
};

// this function updates an existing transportation
// It makes a PUT request to the "/transportation/updateTransportation" endpoint.
export const updateTransportation = async (
  transportationData: Transportation
) => {
  try {
    const response = await apiInstance.put(
      `/transportation/updateTransportation`,
      transportationData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transportation:", error);
    throw error;
  }
};

// this function deletes a transportation by its ID
// It makes a DELETE request to the "/transportation/deleteTransportation/:transportationId" endpoint.
export const deleteTransportation = async (transportationId: number) => {
  try {
    const response = await apiInstance.delete(
      `/transportation/deleteTransportation/${transportationId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting transportation:", error);
    throw error;
  }
};

// this function creates a new vehicle
// It makes a POST request to the "/vehicle/createVehicle" endpoint.
export const createVehicle = async (vehicleData: Vehicle) => {
  try {
    const response = await apiInstance.post(
      "/vehicle/createVehicle",
      vehicleData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};

// this function updates an existing vehicle
// It makes a PUT request to the "/vehicle/updateVehicle" endpoint.
export const updateVehicle = async (vehicleData: Vehicle) => {
  try {
    const response = await apiInstance.put(
      `/vehicle/updateVehicle`,
      vehicleData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

// this function deletes a vehicle by its ID
// It makes a DELETE request to the "/vehicle/deleteVehicle/:vehicleId" endpoint.
export const deleteVehicle = async (vehicleId: number) => {
  try {
    const response = await apiInstance.delete(
      `/vehicle/deleteVehicle/${vehicleId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
