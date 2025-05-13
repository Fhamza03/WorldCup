"use client";
import React, { useState } from "react";
import {
  MapPin,
  Wifi,
  DollarSign,
  Droplet,
  CheckCircle,
  XCircle,
  Hotel,
  Bath,
  User,
  Bed,
} from "lucide-react";
import { Accommodation } from "@/interfaces";

const AccommodationCard = ({
  accommodation,
  status,
}: {
  accommodation: Accommodation;
  status: "Available" | "Reserved" | "Unavailable";
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Function split address and get the second part
  const getAddress = (address: string) => {
    const parts = address.split(",");
    return parts.length > 1 ? parts[1].trim() : address;
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`text-white font-bold rounded px-2 py-1 mr-3 bg-gradient-to-r from-green-600 to-yellow-500`}
          >
            <Hotel />
          </div>
          <h3 className="text-xl font-bold">
            {getAddress(accommodation.address)}
          </h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full ${
            status === "Available"
              ? "bg-green-100 text-green-800"
              : status === "Reserved"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{accommodation.address}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <User className="w-5 h-5 mr-2" />
          <div className="flex items-center">
            <span>
              {accommodation.provider.firstName}{" "}
              {accommodation.provider.lastName}
            </span>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1 text-gray-600" />
            <span className="font-bold text-lg">
              ${accommodation.priceForNight}
            </span>
            <span className="text-gray-500 text-sm ml-1">/ night</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4"></div>

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Property Details</h4>

          <div className="grid grid-cols-2 gap-2 mx-auto">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-2 text-gray-600" />
              <span>Rooms: {accommodation.roomsCount}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-2 text-gray-600" />
              <span>Bathrooms: {accommodation.bathroomsCount}</span>
            </div>
            <div className="flex items-center">
              <Droplet className="w-4 h-4 mr-2 text-gray-600" />
              <span>Showers: {accommodation.showersCount}</span>
            </div>
            <div className="flex items-center">
              <Wifi className="w-4 h-4 mr-2 text-gray-600" />
              <span>
                Wifi:{" "}
                {accommodation.wifiAvailable ? (
                  <CheckCircle className="w-4 h-4 inline text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 inline text-red-600" />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-end items-center mb-2">
            <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-md">
              Reserve
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="text-green-600 font-medium"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
  );
};

export default AccommodationCard;
