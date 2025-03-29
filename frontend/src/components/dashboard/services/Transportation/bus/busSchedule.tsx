"use client";
// BusSchedule.jsx
import { useState } from "react";
import { Search, Filter, RefreshCw, Clock } from "lucide-react";

export default function BusSchedule() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const statuses = ["All", "On Time", "Delayed", "Cancelled"];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleRefresh = () => {
    console.log("Refreshing data");
  };

  return (
    <div className="w-full md:p-4 rounded-lg shadow-sm text-black">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <h1 className="text-2xl font-bold">Bus Schedule</h1>

        {/* Search & Time Selector */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-green-600 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search routes, stops or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <button
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-5 w-5 text-gray-500 mr-2" />
            <span>Refresh</span>
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:opacity-90"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
