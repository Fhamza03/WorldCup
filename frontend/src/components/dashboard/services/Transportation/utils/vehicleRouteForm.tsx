"use client";
import React, { useState } from "react";
import FormField from "./formField";
import FormSection from "./formSection";
import {
  VehicleRoute,
  Vehicle,
  RouteInfo,
  TransportationType,
  Transportation,
} from "@/interfaces";
import {
  createRoute,
  createTransportation,
  createTransportationType,
  createVehicle,
  createVehicleRoute,
} from "@/api/transport/transport.api";

interface VehicleRouteFormProps {
  onClose?: () => void;
}

export default function VehicleRouteForm({ onClose }: VehicleRouteFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  // Define the initial state for the form data
  const [routeData, setRouteData] = useState<RouteInfo>({
    routeId: 0,
    routeName: "",
    estimatedTime: "",
  });
  const [transportationTypeData, setTransportationTypeData] =
    useState<TransportationType>({
      transportationTypeId: 0,
      transportationTypeName: "",
      description: "",
    });
  const [transportationData, setTransportationData] = useState<Transportation>({
    transportationId: 0,
    transportationProviderName: "",
    transportationType: transportationTypeData,
  });
  const [vehicleData, setVehicleData] = useState<Vehicle>({
    vehicleId: 0,
    registrationNumber: "",
    seatsNumber: 0,
    transportation: transportationData,
  });
  const [formData, setFormData] = useState<VehicleRoute>({
    vehicleRouteId: 0,
    startPoint: "",
    endPoint: "",
    restStopsNumber: 0,
    date: "",
    vehicle: vehicleData,
    route: routeData,
  });

  // Add this validation function near the top of your component
  const validateForm = () => {
    // Check required route fields
    if (!formData.date || !formData.startPoint || !formData.endPoint) {
      return false;
    }

    // Check required vehicle fields
    if (!vehicleData.registrationNumber || !vehicleData.seatsNumber) {
      return false;
    }

    // Check required transportation fields
    if (!transportationData.transportationProviderName) {
      return false;
    }

    // Check required transportation type fields
    if (!transportationTypeData.transportationTypeName) {
      return false;
    }

    // Check required route details
    if (!routeData.routeName || !routeData.estimatedTime) {
      return false;
    }

    return true;
  };

  // Modify the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // Call the API to create a new route
      const routeInfo = {
        routeName: routeData.routeName,
        estimatedTime: routeData.estimatedTime,
      };
      const routeResponse = await createRoute(routeInfo);
      console.log("Route created successfully:", routeResponse);

      const transportationTypeInfo = {
        transportationTypeName: transportationTypeData.transportationTypeName,
        description: transportationTypeData.description,
      };
      const transportTypeRes = await createTransportationType(
        transportationTypeInfo
      );
      if (transportTypeRes) {
        console.log(
          "Transportation Type created successfully:",
          transportTypeRes
        );
        const transportationInfo = {
          transportationProviderName:
            transportationData.transportationProviderName,
          transportationType: transportTypeRes,
        };
        const transportRes = await createTransportation(transportationInfo);
        if (!transportRes) {
          console.log("Transportation creation failed");
          return;
        }
        const vehicleInfo = {
          registrationNumber: vehicleData.registrationNumber,
          seatsNumber: vehicleData.seatsNumber,
          transportation: transportRes,
        };
        const vihicleRes = await createVehicle(vehicleInfo);
        if (vihicleRes && routeResponse) {
          const vehicleRouteInfo = {
            startPoint: formData.startPoint,
            endPoint: formData.endPoint,
            restStopsNumber: formData.restStopsNumber,
            date: formData.date,
            vehicle: vihicleRes,
            route: routeResponse,
          };
          const vehicleRouteRes = await createVehicleRoute(vehicleRouteInfo);
          if (vehicleRouteRes) {
            console.log("Vehicle Route created successfully:", vehicleRouteRes);
          } else {
            console.log("Vehicle Route creation failed");
          }
        }
      } else {
        console.log("Transportation Type creation failed");
      }

      handleReset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error creating route:", error);
      alert("Error creating route. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Add the handleReset function
  const handleReset = () => {
    setRouteData({
      routeId: 0,
      routeName: "",
      estimatedTime: "",
    });
    setTransportationTypeData({
      transportationTypeId: 0,
      transportationTypeName: "",
      description: "",
    });
    setTransportationData({
      transportationId: 0,
      transportationProviderName: "",
      transportationType: transportationTypeData,
    });
    setVehicleData({
      vehicleId: 0,
      registrationNumber: "",
      seatsNumber: 0,
      transportation: transportationData,
    });
    setFormData({
      vehicleRouteId: 0,
      startPoint: "",
      endPoint: "",
      restStopsNumber: 0,
      date: "",
      vehicle: vehicleData,
      route: routeData,
    });
    if (onClose) {
      onClose(); // Call the onClose function to close the form
    }
  };

  return (
    <form
      className="max-w-4xl mx-auto p-6 w-[60%] bg-white rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Vehicle Route</h2>

      {/* Main Route Information */}
      <FormSection title="Route Information" badgeValue="101">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormField
            label="Vehicle Route ID"
            id="vehicleRouteId"
            type="number"
            required
          /> */}
          <FormField
            label="Date"
            id="date"
            type="date"
            required={true}
            value={formData.date}
            setFormData={(value) =>
              setFormData({ ...formData, date: value.toString() })
            }
          />
          <FormField
            label="Start Point"
            id="startPoint"
            required={true}
            value={formData.startPoint}
            setFormData={(value) =>
              setFormData({ ...formData, startPoint: value.toString() })
            }
          />
          <FormField
            label="End Point"
            id="endPoint"
            required={true}
            value={formData.endPoint}
            setFormData={(value) =>
              setFormData({ ...formData, endPoint: value.toString() })
            }
          />
          <FormField
            label="Rest Stops Number"
            id="restStopsNumber"
            type="number"
            value={formData.restStopsNumber}
            setFormData={(value) =>
              setFormData({ ...formData, restStopsNumber: Number(value) })
            }
          />
        </div>
      </FormSection>

      {/* Vehicle Information */}
      <FormSection title="Vehicle Information" badgeValue="102">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormField label="Vehicle ID" id="vehicleId" type="number" /> */}
          <FormField
            label="Registration Number"
            id="registrationNumber"
            required
            value={vehicleData.registrationNumber}
            setFormData={(value) =>
              setVehicleData({
                ...vehicleData,
                registrationNumber: value.toString(),
              })
            }
          />
          <FormField
            label="Seats Number"
            id="seatsNumber"
            type="number"
            required
            value={vehicleData.seatsNumber}
            setFormData={(value) =>
              setVehicleData({
                ...vehicleData,
                seatsNumber: Number(value),
              })
            }
          />
        </div>
      </FormSection>

      {/* Transportation Information */}
      <FormSection title="Transportation Information" badgeValue="103">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* <FormField
            label="Transportation ID"
            id="transportationId"
            type="number"
          /> */}
          <FormField
            label="Provider Name"
            id="transportationProviderName"
            required
            value={transportationData.transportationProviderName}
            setFormData={(value) =>
              setTransportationData({
                ...transportationData,
                transportationProviderName: value.toString(),
              })
            }
          />
        </div>
      </FormSection>

      {/* Transportation Type */}
      <FormSection title="Transportation Type" badgeValue="104">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormField label="Type ID" id="transportationTypeId" type="number" /> */}
          <FormField
            label="Type Name"
            id="transportationTypeName"
            required
            value={transportationTypeData.transportationTypeName}
            setFormData={(value) =>
              setTransportationTypeData({
                ...transportationTypeData,
                transportationTypeName: value.toString(),
              })
            }
          />
          <FormField
            label="Description"
            id="description"
            value={transportationTypeData.description}
            setFormData={(value) =>
              setTransportationTypeData({
                ...transportationTypeData,
                description: value.toString(),
              })
            }
          />
        </div>
      </FormSection>

      {/* Route Details */}
      <FormSection title="Route Details" badgeValue="105">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormField label="Route ID" id="routeId" type="number" /> */}
          <FormField
            label="Route Name"
            id="routeName"
            required
            value={routeData.routeName}
            setFormData={(value) =>
              setRouteData({
                ...routeData,
                routeName: value.toString(),
              })
            }
          />
          <FormField
            label="Estimated Time"
            id="estimatedTime"
            required
            value={routeData.estimatedTime}
            setFormData={(value) =>
              setRouteData({
                ...routeData,
                estimatedTime: value.toString(),
              })
            }
          />
        </div>
      </FormSection>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-6 py-2 mr-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          disabled={isLoading}
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-6 py-2 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-md focus:outline-none flex items-center`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Save Vehicle Route"
          )}
        </button>
      </div>
    </form>
  );
}
