"use client";
import { deleteAccommodation } from "@/api/accomondation/accomondation.api";
import { Accommodation } from "@/interfaces";
import { MapPin, MapPlus, SearchIcon, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface ShowAccommodationProps {
  accommodations?: Accommodation[];
  onEdit?: (accommodationIndex: number) => void;
  onAdd?: () => void;
  onDelete?: () => void;
}

const ShowAccommodation: React.FC<ShowAccommodationProps> = ({
  accommodations = [],
  onEdit,
  onAdd,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  //   // Format date function
  //   const formatDate = (dateString: string) => {
  //     try {
  //       const date = new Date(dateString);
  //       return date.toLocaleDateString("en-US", {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       });
  //     } catch (e) {
  //       return dateString;
  //     }
  //   };

  // Filter routes
  const filteredAccommodation = [...accommodations].filter(
    (accommodation: Accommodation) => {
      if (searchTerm === "") return true;

      const searchRegex = new RegExp(searchTerm, "i");
      return (
        searchRegex.test(accommodation.address) ||
        searchRegex.test(accommodation.bathroomsCount.toString()) ||
        searchRegex.test(accommodation.priceForNight.toString()) ||
        searchRegex.test(accommodation.showersCount.toString()) ||
        searchRegex.test(accommodation.roomsCount.toString()) ||
        searchRegex.test(accommodation.wifiAvailable.toString())
      );
    }
  );

  // handle delete function
  const handleDelete = async (accommodation: Accommodation) => {
    if (confirm("Are you sure you want to delete this accommodation?")) {
      if (accommodation.idAccommodation) {
        const response = await deleteAccommodation(
          accommodation.idAccommodation
        );
        if (response.status === 204) onDelete && onDelete();
        else alert("Failed to delete Accommodation");
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
          <h1 className="text-2xl font-bold text-white">Accommodation</h1>
        </div>
        <button
          onClick={() => onAdd && onAdd()}
          className="flex items-center bg-gradient-to-r from-green-500 to-red-500 text-white py-2 px-4 rounded-md shadow-md hover:from-red-500 hover:to-green-500 transition duration-300"
        >
          <MapPlus className="w-4 h-4 mr-1" />
          Add New Accommodation
        </button>
      </div>

      {/* Search Input with gradient border on focus */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search accommodations..."
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
              <th className="py-3 px-4 text-left rounded-tl-lg">Address</th>
              <th className="py-3 px-4 text-left">Rooms</th>
              <th className="py-3 px-4 text-left">Bathrooms</th>
              <th className="py-3 px-4 text-left">Showers</th>
              <th className="py-3 px-4 text-left">WiFi Available</th>
              <th className="py-3 px-4 text-left">Price Per Night</th>
              <th className="py-3 px-4 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccommodation.map((accommodation, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-gray-100"
                }
              >
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {accommodation.address || "-"}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {accommodation.roomsCount || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {accommodation.bathroomsCount || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {accommodation.showersCount || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {accommodation.wifiAvailable ? "Yes" : "No"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  ${accommodation.priceForNight || "-"}
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
                      onClick={() => handleDelete(accommodation)}
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

export default ShowAccommodation;
