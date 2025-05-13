import { apiInstance } from "../axios/axios.api";

export const getAccomondatios = async () => {
  try {
    const response = await apiInstance.get("/getAccommodations");
    return response.data;
  } catch (error) {
    console.error("Error fetching Accomondatios:", error);
    throw error;
  }
};

export const getAccommodationById = async (accomondationId: number) => {
  try {
    const response = await apiInstance.get(
      `/getAccommodation/${accomondationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Accomondation", error);
    throw error;
  }
};
