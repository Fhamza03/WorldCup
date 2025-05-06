import React from "react";
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  AlertCircle,
  X,
} from "lucide-react";

interface RouteDetailsModalProps {
  closeModal: () => void;
  routeData: {
    routeNumber: string;
    destination: string;
    duration: string;
    status: "On Time" | "Delayed" | "Cancelled";
    route: {
      from: string;
      to: string;
    };
    schedule: string[];
    capacity: {
      total: number;
      available: number;
    };
    fare: string;
    alerts: string;
  };
}

export default function RouteDetailsModal({
  closeModal,
  routeData,
}: RouteDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-2">
          <button
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-md bg-gradient-to-r from-green-500 to-red-500 text-white font-bold text-2xl">
                {routeData.routeNumber}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{routeData.destination}</h1>
                <div className="flex items-center text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Duration: {routeData.duration}</span>
                </div>
              </div>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                routeData.status === "On Time"
                  ? "bg-green-600"
                  : routeData.status === "Delayed"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              } text-white`}
            >
              {routeData.status}
            </div>
          </div>

          {/* Route Information */}
          <div className="border-b pb-4 mb-4">
            <div className="flex items-start mb-3">
              <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-semibold">Route</p>
                <p className="text-gray-600">
                  {routeData.route.from} → {routeData.route.to}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-semibold">Schedule</p>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {routeData.schedule.map((time, index) => (
                    <div
                      key={index}
                      className="bg-green-50 text-gray-800 px-3 py-2 rounded-md text-center"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="flex items-start">
              <Users className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-semibold">Capacity</p>
                <p className="text-gray-600">
                  {routeData.capacity.total} seats (
                  {routeData.capacity.available} available)
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-semibold">Fare</p>
                <p className="text-gray-600">{routeData.fare} per ride</p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-semibold">Alerts</p>
                <p className="text-gray-600">{routeData.alerts}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md w-full">
              Track Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
