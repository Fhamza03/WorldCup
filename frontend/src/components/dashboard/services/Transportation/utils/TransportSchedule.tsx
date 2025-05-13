"use client";
import React, { useEffect, useState } from "react";
import { Clock, Filter, RefreshCw, MapPin } from "lucide-react";
import { findByStartAndEndPoint } from "@/api/transport/transport.api";
import { useGlContext } from "@/context/context";

interface TransportScheduleProps {
  title: string;
}

// capitalize the first letter of each word in startPoint and endPoint
function capitalizeFirstChar(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function TransportSchedule({ title }: TransportScheduleProps) {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const { routes, setRoutes } = useGlContext();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const statuses = ["All", "On Time", "Delayed", "Cancelled"];
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  // Function to handle the search action
  // It checks if both start and end points are provided, then calls the API to find the route.
  const handleSearch = async () => {
    if (!startPoint || !endPoint) {
      alert("Please enter both start and end points.");
      return;
    }

    try {
      setIsLoading(true); // Show loading state
      const capitalizedStartPoint = capitalizeFirstChar(startPoint);
      const capitalizedEndPoint = capitalizeFirstChar(endPoint);

      const response = await findByStartAndEndPoint(
        capitalizedStartPoint,
        capitalizedEndPoint
      );

      if (!response) {
        alert("No routes found for this route");
        setRoutes([]); // Clear routes if none found
        return;
      }

      // If response is a single route, wrap it in an array
      const routesToSet = Array.isArray(response) ? response : [response];
      setRoutes(routesToSet);
    } catch (error) {
      console.error("Error finding route:", error);
      alert("Error finding routes. Please try again.");
      setRoutes([]); // Clear routes on error
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleRefresh = () => {
    console.log("Refreshing data");
  };

  useEffect(() => {
    // This effect runs when the component mounts or when the routes state changes
    console.log("Routes updated:", routes);
  }, [routes]);

  return (
    <div className="w-4/5 p-4 text-black mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-col gap-4">
        {/* Start & End Points + Time Selector */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Start Point Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-green-600 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Starting point..."
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
            />
          </div>

          {/* End Point Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-green-600 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Destination..."
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
            />
          </div>

          {/* Time Selector */}
          <div className="flex items-center justify-between border border-green-600 rounded-lg bg-gray-50 px-4 py-2">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-500">--:--</span>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700">Status:</span>
          </div>
          <div className="flex flex-wrap gap-2 ml-0 md:ml-4">
            {statuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-1 rounded-md transition-colors ${
                  selectedStatus === status
                    ? "bg-gradient-to-r from-green-600 to-red-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="h-5 w-5 text-gray-500 mr-2" />
            <button onClick={handleRefresh}>
              <span>Refresh</span>
            </button>
          </div>
          <button
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            onClick={() => handleSearch()}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransportSchedule;
