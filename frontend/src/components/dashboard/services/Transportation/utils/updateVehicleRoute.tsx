"use client";
import React, { useState } from "react";
import {
  VehicleRoute,
  RouteInfo,
  Transportation,
  TransportationType,
  Vehicle,
} from "@/interfaces";
import {
  updateRoute,
  updateTransportation,
  updateTransportationType,
  updateVehicle,
  updateVehicleRoute,
} from "@/api/transport/transport.api";

interface UpdateVehicleRouteProps {
  vehicleRouteData: VehicleRoute;
  onClose: () => void;
}

const UpdateVehicleRoute: React.FC<UpdateVehicleRouteProps> = ({
  vehicleRouteData,
  onClose,
}) => {
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format as YYYY-MM-DDThh:mm
  };

  // Route Information State
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    routeId: vehicleRouteData.route.routeId,
    routeName: vehicleRouteData.route.routeName,
    estimatedTime: vehicleRouteData.route.estimatedTime,
  });

  // Transportation Type State
  const [transportationType, setTransportationType] =
    useState<TransportationType>({
      transportationTypeId:
        vehicleRouteData.vehicle.transportation.transportationType
          .transportationTypeId,
      transportationTypeName:
        vehicleRouteData.vehicle.transportation.transportationType
          .transportationTypeName,
      description:
        vehicleRouteData.vehicle.transportation.transportationType.description,
    });
  // Transportation Information State
  const [transportationInfo, setTransportationInfo] = useState<Transportation>({
    transportationId: vehicleRouteData.vehicle.transportation.transportationId,
    transportationProviderName:
      vehicleRouteData.vehicle.transportation.transportationProviderName,
    transportationType: transportationType,
  });

  // Vehicle Information State
  const [vehicleInfo, setVehicleInfo] = useState<Vehicle>({
    vehicleId: vehicleRouteData.vehicle.vehicleId,
    registrationNumber: vehicleRouteData.vehicle.registrationNumber,
    seatsNumber: vehicleRouteData.vehicle.seatsNumber,
    transportation: transportationInfo,
  });

  // Vehicle Route Information State
  const [vehicleRoute, setVehicleRoute] = useState<VehicleRoute>({
    vehicleRouteId: vehicleRouteData.vehicleRouteId,
    startPoint: vehicleRouteData.startPoint,
    endPoint: vehicleRouteData.endPoint,
    restStopsNumber: vehicleRouteData.restStopsNumber,
    date: vehicleRouteData.date,
    vehicle: vehicleInfo,
    route: routeInfo,
  });

  // Update handlers for each section
  const handleRouteInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRouteInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVehicleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransportationInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTransportationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransportationTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTransportationType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVehicleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setVehicleRoute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    // Check if all required fields are filled
    if (
      !vehicleRoute.startPoint ||
      !vehicleRoute.endPoint ||
      vehicleRoute.restStopsNumber < 0 ||
      !vehicleRoute.date ||
      !vehicleInfo.registrationNumber ||
      vehicleInfo.seatsNumber < 2 ||
      !transportationInfo.transportationProviderName ||
      !transportationType.transportationTypeName ||
      !routeInfo.routeName ||
      !routeInfo.estimatedTime
    ) {
      alert("Please fill in all required fields.");
      return false;
    }
    // Check if rest stops number is a positive integer
    if (vehicleRoute.restStopsNumber < 0) {
      alert("Rest stops number must be a positive integer.");
      return false;
    }
    //Check if date is in the future
    const currentDate = new Date();
    const selectedDate = new Date(vehicleRoute.date);
    // Compare timestamps to avoid object reference issues
    if (
      vehicleRoute.date !== vehicleRouteData.date &&
      selectedDate.getTime() < currentDate.getTime()
    ) {
      alert("Date must be in the future.");
      return false;
    }

    // check if estimated time is a valid time format
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(routeInfo.estimatedTime)) {
      alert("Estimated time must be in the format HH:MM.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // If validation fails, show an alert and return
      alert("Please fill in all required fields correctly.");
      return;
    }
    // update the route if it changes
    if (
      vehicleRouteData.route.routeName !== routeInfo.routeName ||
      vehicleRouteData.route.estimatedTime !== routeInfo.estimatedTime
    ) {
      // Call the update route API here
      const updatedRoute = await updateRoute(routeInfo);
      if (!updatedRoute) {
        return alert("Error updating route");
      }
      console.log("Route updated successfully:", updatedRoute);
    }
    // update the Transportation Type if it changes
    if (
      vehicleRouteData.vehicle.transportation.transportationType
        .transportationTypeName !== transportationType.transportationTypeName ||
      vehicleRouteData.vehicle.transportation.transportationType.description !==
        transportationType.description
    ) {
      // Call the update route API here
      const updatedTransportationType = await updateTransportationType(
        transportationType
      );
      if (!updatedTransportationType) {
        return alert("Error updating transportation type");
      }
    }
    // update the Transportation if it changes
    if (
      vehicleRouteData.vehicle.transportation.transportationProviderName !==
      transportationInfo.transportationProviderName
    ) {
      // Call the update route API here
      const updatedTransportation = await updateTransportation(
        transportationInfo
      );
      if (!updatedTransportation) {
        return alert("Error updating transportation");
      }
    }
    // update the Vehicle if it changes
    if (
      vehicleRouteData.vehicle.registrationNumber !==
        vehicleInfo.registrationNumber ||
      vehicleRouteData.vehicle.seatsNumber !== vehicleInfo.seatsNumber
    ) {
      // Call the update route API here
      const updatedVehicle = await updateVehicle(vehicleInfo);
      if (!updatedVehicle) {
        return alert("Error updating vehicle");
      }
    }
    // update the Vehicle Route if it changes
    if (
      vehicleRouteData.startPoint !== vehicleRoute.startPoint ||
      vehicleRouteData.endPoint !== vehicleRoute.endPoint ||
      vehicleRouteData.restStopsNumber !== vehicleRoute.restStopsNumber ||
      vehicleRouteData.date !== vehicleRoute.date
    ) {
      // Call the update route API here
      const updatedVehicleRoute = await updateVehicleRoute(vehicleRoute);
      if (!updatedVehicleRoute) {
        return alert("Error updating vehicle route");
      }
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-center mb-6">
        Vehicle Route Details
      </h1>

      {/* Route Information Section */}
      <div className="mb-6 border border-gray-200 rounded-lg p-4 transition-colors duration-200">
        <div className="flex items-center mb-3">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold rounded-md p-1 mr-2 w-12 text-center">
            101
          </div>
          <h2 className="text-xl font-semibold">Route Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Date</p>
            <input
              type="datetime-local"
              name="date"
              value={formatDateForInput(vehicleRoute.date)}
              onChange={(e) => handleVehicleRouteChange(e)}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-gray-600 font-medium">Start Point</p>
            <input
              type="text"
              name="startPoint"
              value={vehicleRoute.startPoint}
              onChange={handleVehicleRouteChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-gray-600 font-medium">End Point</p>
            <input
              type="text"
              name="endPoint"
              value={vehicleRoute.endPoint}
              onChange={handleVehicleRouteChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-gray-600 font-medium">Rest Stops Number</p>
            <input
              type="number"
              name="restStopsNumber"
              value={vehicleRoute.restStopsNumber}
              onChange={handleVehicleRouteChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Vehicle Information Section */}
      <div className="mb-6 border border-gray-200 rounded-lg p-4 transition-colors duration-200">
        <div className="flex items-center mb-3">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold rounded-md p-1 mr-2 w-12 text-center">
            102
          </div>
          <h2 className="text-xl font-semibold">Vehicle Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Registration Number</p>
            <input
              type="text"
              name="registrationNumber"
              value={vehicleInfo.registrationNumber}
              onChange={handleVehicleInfoChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-gray-600 font-medium">Seats Number</p>
            <input
              type="number"
              name="seatsNumber"
              value={vehicleInfo.seatsNumber}
              onChange={handleVehicleInfoChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Transportation Information Section */}
      <div className="mb-6 border border-gray-200 rounded-lg p-4 transition-colors duration-200">
        <div className="flex items-center mb-3">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold rounded-md p-1 mr-2 w-12 text-center">
            103
          </div>
          <h2 className="text-xl font-semibold">Transportation Information</h2>
        </div>

        <div>
          <p className="text-gray-600 font-medium">Provider Name</p>
          <input
            type="text"
            name="transportationProviderName"
            value={transportationInfo.transportationProviderName}
            onChange={handleTransportationInfoChange}
            className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Transportation Type Section */}
      <div className="mb-6 border border-gray-200 rounded-lg p-4 transition-colors duration-200">
        <div className="flex items-center mb-3">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold rounded-md p-1 mr-2 w-12 text-center">
            104
          </div>
          <h2 className="text-xl font-semibold">Transportation Type</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Type Name</p>
            <input
              type="text"
              name="transportationTypeName"
              value={transportationType.transportationTypeName}
              onChange={handleTransportationTypeChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-gray-600 font-medium">Description</p>
            <input
              type="text"
              name="description"
              value={transportationType.description}
              onChange={handleTransportationTypeChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Route Details Section */}
      <div className="mb-6 border border-gray-200 rounded-lg p-4 transition-colors duration-200">
        <div className="flex items-center mb-3">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold rounded-md p-1 mr-2 w-12 text-center">
            105
          </div>
          <h2 className="text-xl font-semibold">Route Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Route Name</p>
            <input
              type="text"
              name="routeName"
              value={routeInfo.routeName}
              onChange={handleRouteInfoChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-gray-600 font-medium">Estimated Time</p>
            <input
              type="text"
              name="estimatedTime"
              value={routeInfo.estimatedTime}
              onChange={handleRouteInfoChange}
              className="w-full border border-gray-200 p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onClose()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded hover:from-red-600 hover:to-red-500 transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateVehicleRoute;
