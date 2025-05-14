import { Accommodation, Reservation } from "@/interfaces";
import { apiInstance } from "../axios/axios.api";

export const deleteAccommodation = async (accommadationId: number) => {
  try {
    const response = await apiInstance.delete(
      `/deleteAccommodation/${accommadationId}`
    );
    return response;
  } catch (error) {
    console.error("Failed to create Accommodation:", error);
    throw error;
  }
};

export const updateAccommodation = async (accommadation: Accommodation) => {
  try {
    const response = await apiInstance.put(
      "/updateAccommodation",
      accommadation
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create Accommodation:", error);
    throw error;
  }
};

export const createAccommodation = async (accommadation: Accommodation) => {
  try {
    const response = await apiInstance.post(
      "/saveAccommodation",
      accommadation
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create Accommodation:", error);
    throw error;
  }
};

export const getAccomondations = async () => {
  try {
    const response = await apiInstance.get("/getAccommodations");
    return response.data;
  } catch (error) {
    console.error("Error fetching Accomondatios:", error);
    throw error;
  }
};

export const getAccommodationByProvider = async (providerId: number) => {
  try {
    const response = await apiInstance.get(
      `/getAccommodationByProvider/${providerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch provider Accommodations");
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

export const getAllReservations = async () => {
  try {
    const response = await apiInstance.get("/reservation/getAllReservations");
    return response.data;
  } catch (error) {
    console.error("Error fetching Reservations");
    throw error;
  }
};

export const createReservation = async (reservation: Reservation) => {
  try {
    const response = await apiInstance.post(
      "/reservation/createReservation",
      reservation
    );
    return response.data;
  } catch (error) {
    console.error("Error creating Reservation");
    throw error;
  }
};
