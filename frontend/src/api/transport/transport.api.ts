import { VehicleRoute } from "@/interfaces";
import { apiInstance } from "../axios/axios.api";

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
