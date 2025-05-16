import { Calendar, Clock, Filter, MapPin, Users } from "lucide-react";
import React from "react";

function CoVoiturageRoutesAndDepartures() {
  // Sample data for routes
  const coVoiturageRoutes = [
    {
      id: "CV1",
      name: "City Center to Airport",
      status: "Available",
      route: "City Center → International Airport",
      duration: "35 min",
      driver: "Ahmed M. (4.8 ★)",
      departureTimes: ["17:45"],
    },
    {
      id: "CV2",
      name: "University Route",
      status: "Full",
      route: "Medina District → University Campus",
      duration: "20 min",
      driver: "Fatima K. (4.9 ★)",
      departureTimes: ["08:15"],
    },
  ];

  return (
    <div className="w-4/5 p-4 text-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-full bg-gradient-to-r from-green-600 to-red-600 p-3 mr-4">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl text-gray-600">Today&apos;s Available Rides</h2>
        <div className="flex-grow"></div>
        <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md">
          <Filter className="h-5 w-5 mr-2" />
          <span>Filter by status</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Co-Voiturage Routes & Departures
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coVoiturageRoutes.map((route) => (
          <div
            key={route.id}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-red-500 text-white font-bold rounded-md px-3 py-1 mr-4">
                {route.id}
              </div>
              <h3 className="text-xl">{route.name}</h3>
              <div className="flex-grow"></div>
              <div
                className={`${
                  route.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } rounded-full px-3 py-1 text-sm`}
              >
                {route.status === "Available" ? "Available (3/4)" : "Full"}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2 text-gray-600">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span>{route.route}</span>
            </div>

            <div className="flex items-center gap-2 mb-2 text-gray-600">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>Duration: {route.duration}</span>
            </div>

            <div className="flex items-center gap-2 mb-4 text-gray-600">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <span>Driver: {route.driver}</span>
            </div>

            <div className="flex gap-2 mb-4">
              {route.departureTimes.map((time, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-500/10 to-red-500/10 text-green-800 px-4 py-2 rounded-md text-center"
                >
                  {time}
                </div>
              ))}
            </div>

            <button className="w-full py-2 text-center text-gray-700 hover:bg-gradient-to-r from-green-500/10 to-red-500/10 rounded-md">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoVoiturageRoutesAndDepartures;
