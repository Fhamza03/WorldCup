"use client";
import {
  Calendar,
  ChevronDown,
  Filter,
  MapPin,
  RefreshCw,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import AccommodationCard from "./accommodationCard";
import { Accommodation } from "@/interfaces";
import { getAccomondatios } from "@/api/accomondation/accomondation.api";

// // Sample accommodation data
// const accommodationData: Accommodation[] = [
//   {
//     idAccommodation: 101,
//     address: "27 Avenue Mohammed V, Marrakech",
//     roomsCount: 3,
//     bathroomsCount: 2,
//     showersCount: 1,
//     wifiAvailable: true,
//     priceForNight: 75,
//     provider: {
//       userId: 1001,
//       email: "host@example.com",
//       password: "********",
//       firstName: "Mohammed",
//       lastName: "Alaoui",
//       birthDate: "1985-06-15",
//       nationality: "Moroccan",
//       nationalCode: "MA12345",
//       profilePicture: "/api/placeholder/64/64",
//     },
//   },
//   {
//     idAccommodation: 202,
//     address: "45 Rue des Fès, Casablanca",
//     roomsCount: 4,
//     bathroomsCount: 3,
//     showersCount: 2,
//     wifiAvailable: true,
//     priceForNight: 95,
//     provider: {
//       userId: 1002,
//       email: "host2@example.com",
//       password: "********",
//       firstName: "Fatima",
//       lastName: "Benyoussef",
//       birthDate: "1990-03-20",
//       nationality: "Moroccan",
//       nationalCode: "MA54321",
//       profilePicture: "/api/placeholder/64/64",
//     },
//   },
// ];

const AccommodationFinderApp = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchLocation, setSearchLocation] = useState("");
  const [accommodationData, setAccommodationData] = useState<Accommodation[]>(
    []
  );
  const [allAccommodations, setAllAccommodations] = useState<Accommodation[]>(
    []
  );

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const response = await getAccomondatios();
      if (response) {
        setAllAccommodations(response);
        setAccommodationData(response);
      } else {
        console.error("Failed to fetch routes");
      }
    };
    fetchData();
  }, []);

  const getFilteredAccommodations = () => {
    const filtered = allAccommodations.filter((accommodation) => {
      const locationMatches =
        searchLocation === "" ||
        (accommodation.address &&
          accommodation.address
            .toLowerCase()
            .includes(searchLocation.toLowerCase()));

      console.log("fffffff");
      return locationMatches;
    });

    setAccommodationData(filtered);
  };
  return (
    <div className="w-4/5 mx-auto p-6 text-black justify-center">
      <h1 className="text-3xl font-bold mb-6">Accommodation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Location..."
              className="pl-8 pr-4 py-2 border border-green-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <Filter className="text-gray-500" />
          <span className="text-gray-600">Status:</span>

          <div className="flex flex-wrap gap-2">
            {["All", "Available", "Reserved", "Cancelled"].map((status) => (
              <button
                key={status}
                className={`px-4 py-1 rounded-md ${
                  statusFilter === status
                    ? "bg-gradient-to-r from-green-600 to-red-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setAccommodationData(allAccommodations)}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            <RefreshCw className="w-5 h-5 mr-1" />
            Reset
          </button>
          <button
            onClick={getFilteredAccommodations}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-md"
          >
            <Search className="w-5 h-5 mr-1" />
            Search
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white mr-3">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-xl text-gray-600">Today&apos;s Schedule</h2>

          <div className="ml-auto">
            <button className="flex items-center px-4 py-2 border border-red-500 rounded-md text-gray-600">
              <Filter className="w-4 h-4 mr-1" />
              Filter by status
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {accommodationData.map((accommodation, index) => (
            <AccommodationCard
              key={index}
              accommodation={accommodation}
              status={index === 1 ? "Reserved" : "Available"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationFinderApp;
