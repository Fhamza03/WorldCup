import {
  deleteRoute,
  deleteTransportation,
  deleteTransportationType,
  deleteVehicle,
  deleteVehicleRoute,
} from "@/api/transport/transport.api";
import { VehicleRoute } from "@/interfaces";
import { MapPin, MapPlus, SearchIcon, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface ShowVehicleRouteProps {
  routes?: VehicleRoute[];
  onEdit?: (VehicleRoute: number) => void;
  onAdd?: () => void;
  onDelete?: () => void;
}

const VehicleRouteTable: React.FC<ShowVehicleRouteProps> = ({
  routes = [],
  onEdit,
  onAdd,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Format date function
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Filter routes
  const filteredRoutes = [...routes].filter((route) => {
    if (searchTerm === "") return true;

    const searchRegex = new RegExp(searchTerm, "i");
    return (
      searchRegex.test(route.route?.routeName) ||
      searchRegex.test(route.startPoint) ||
      searchRegex.test(route.endPoint) ||
      searchRegex.test(route.vehicle?.registrationNumber)
    );
  });

  // handle delete function
  const handleDelete = async (vehicleRoute: VehicleRoute) => {
    if (confirm("Are you sure you want to delete this route?")) {
      // Call the delete function here
      // console.log("Deleting route:", vehicleRoute);
      const vehicleRouteDl = await deleteVehicleRoute(
        vehicleRoute.vehicleRouteId || 0
      );
      const vehicle = await deleteVehicle(vehicleRoute.vehicle?.vehicleId || 0);
      const transportation = await deleteTransportation(
        vehicleRoute.vehicle?.transportation?.transportationId || 0
      );
      const transportationType = await deleteTransportationType(
        vehicleRoute.vehicle?.transportation?.transportationType
          ?.transportationTypeId || 0
      );
      const route = await deleteRoute(vehicleRoute.route?.routeId || 0);

      console.log("Deleted route:", vehicleRouteDl);
      if (
        vehicleRouteDl.status === 204 &&
        vehicle.status === 204 &&
        transportation.status === 204 &&
        transportationType.status === 204 &&
        route.status === 204
      ) {
        // alert("Route deleted successfully");
        onDelete && onDelete();
      } else {
        alert("Failed to delete route");
      }
    }
  };

  return (
    <div className="container w-full p-4">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-green-500 to-red-500 rounded-lg mb-6 p-6 shadow-lg justify-between flex flex-row items-start">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <MapPin className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Vehicle Routes</h1>
        </div>
        <button
          onClick={() => onAdd && onAdd()}
          className="flex items-center bg-gradient-to-r from-green-500 to-red-500 text-white py-2 px-4 rounded-md shadow-md hover:from-red-500 hover:to-green-500 transition duration-300"
        >
          <MapPlus className="w-4 h-4 mr-1" />
          Add New Vehicle Route
        </button>
      </div>

      {/* Search Input with gradient border on focus */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search routes..."
            className="p-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table with styled headers */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-green-600 to-red-600 text-white">
              <th className="py-3 px-4 text-left rounded-tl-lg">Route Name</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Start Point</th>
              <th className="py-3 px-4 text-left">End Point</th>
              <th className="py-3 px-4 text-left">Rest Stops</th>
              <th className="py-3 px-4 text-left">Registration #</th>
              <th className="py-3 px-4 text-left">Seats</th>
              <th className="py-3 px-4 text-left">T.Provider</th>
              <th className="py-3 px-4 text-left">T.Type</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Es.Time</th>
              <th className="py-3 px-4 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route, index) => (
              <tr
                key={route.vehicleRouteId || index}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-gray-100"
                }
              >
                <td className="py-3 px-4 border-b border-gray-200 ">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {route.route?.routeName || "-"}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {formatDate(route.date)}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-green-600 mr-1" />
                    {route.startPoint || "-"}
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-red-600 mr-1" />
                    {route.endPoint || "-"}
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.restStopsNumber || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.vehicle?.registrationNumber || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.vehicle?.seatsNumber || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.vehicle?.transportation?.transportationProviderName ||
                    "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.vehicle?.transportation?.transportationType
                    ?.transportationTypeName || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.vehicle?.transportation?.transportationType
                    ?.description || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-mono text-sm">
                  {route.route.estimatedTime || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(index)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-1 px-3 rounded-md text-sm transition duration-300 flex items-center"
                    >
                      <SquarePen className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(route)}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-1 px-3 rounded-md text-sm transition duration-300 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleRouteTable;
