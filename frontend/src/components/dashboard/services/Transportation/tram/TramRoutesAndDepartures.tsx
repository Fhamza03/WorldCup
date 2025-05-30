"use client";
import { useGlContext } from "@/context/context";
import { Calendar, Clock, Filter, MapPin } from "lucide-react";
import React, { useEffect } from "react";

// const busRoutes = [
//   {
//     id: 101,
//     name: "marrakich",
//     status: "On Time",
//     route: "fssn → bab dokkala",
//     duration: "25 min",
//     departureTimes: ["06:30", "07:15", "08:00", "08:45"],
//   },
//   {
//     id: 202,
//     name: "marrakich",
//     status: "Delayed",
//     route: "jam3 lfna → massira",
//     duration: "40 min",
//     departureTimes: ["05:45", "06:30", "07:15", "08:00"],
//   },
// ];

// interface TramRoutesProps {
//   routes: VehicleRoute[];
// }

function TramRoutesAndDepartures() {
  const { routes } = useGlContext();
  useEffect(() => {
    if (routes.length === 0) {
      console.log("No routes available");
    }
    console.log("Routes: ", routes);
  }, [routes]);
  return (
    <div className="container my-1 px-4 py-6 text-black">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="rounded-full bg-gradient-to-r from-green-600 to-red-600 p-3 mr-4">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <span className="text-gray-500 text-lg">Today&apos;s Schedule</span>
        </div>
        <button className="flex items-center px-4 py-2 border border-red-600 rounded-lg">
          <Filter className="h-5 w-5 mr-2" />
          <span>Filter by status</span>
          <svg className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Tram Routes & Departures</h1>

      {/* Routes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {routes.map((route) => (
          <div
            key={route.vehicleRouteId}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-gradient-to-r from-green-600 to-red-600 text-white text-lg font-bold rounded-lg px-3 py-1 mr-4">
                  {route.route.routeId}
                </div>
                <h2 className="text-xl font-bold">{route.route.routeName}</h2>
              </div>
              {/* <span
                className={`px-3 py-1 rounded-full text-sm ${
                  route.status === "On Time"
                    ? "bg-gradient-to-r from-green-600 to-red-600 text-white"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {route.status}
              </span> */}
            </div>

            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">
                {route.startPoint} → {route.endPoint}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">
                Duration: {route.route.estimatedTime}
              </span>
            </div>

            {/* <div className="flex flex-wrap gap-2 mb-4">
              {route.departureTimes.map((time) => (
                <div
                  key={time}
                  className="bg-gradient-to-r from-green-500/10 to-red-500/10 px-4 py-2 rounded-lg"
                >
                  {time}
                </div>
              ))}
            </div> */}

            <button className="w-full py-2 text-center  rounded-lg hover:bg-gradient-to-r from-green-500/10 to-red-500/10">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TramRoutesAndDepartures;
