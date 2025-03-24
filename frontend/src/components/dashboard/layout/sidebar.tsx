"use client";

import {
  Utensils,
  ShoppingCart,
  Star,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cloneElement, useState } from "react";

const sidebarItems = [
  {
    id: 1,
    icon: <Utensils color="#27ae60" size={24} strokeWidth={1.5} />, // Menu
    to: "dashboard/restauration/menu",
    text: "Menu",
  },
  {
    id: 2,
    icon: <ShoppingCart color="#e74c3c" size={24} strokeWidth={1.5} />, // Commandes
    to: "dashboard/restauration/commandes",
    text: "Commandes",
  },
  {
    id: 3,
    icon: <Star color="#f1c40f" size={24} strokeWidth={1.5} />, // Avis Clients
    to: "dashboard/restauration/avis",
    text: "Avis Clients",
  },
  {
    id: 4,
    icon: <MapPin color="#3498db" size={24} strokeWidth={1.5} />, // Restaurants
    to: "dashboard/restauration/restaurants",
    text: "Restaurants",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeId, setActiveId] = useState(1);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`bg-white shadow p-4 flex flex-col h-dvh transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center mb-6 px-2 ${
          isExpanded ? "justify-between" : "justify-center"
        }`}
      >
        {isExpanded ? (
          <>
            <div className="flex items-center overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-red-600 p-2 rounded-lg mr-3 flex-shrink-0">
                <Utensils color="white" size={24} />
              </div>
              <h1 className="text-xl font-bold whitespace-nowrap">Food Hub</h1>
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-green-600 to-red-600 p-2 rounded-lg flex-shrink-0 mb-2">
              <Utensils color="white" size={24} />
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div
        className={`text-gray-400 uppercase text-sm font-bold mb-2 px-2 transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        Restauration
      </div>

      <nav className="flex flex-col">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveId(item.id)}
            className={`flex items-center p-3 mb-1 rounded-lg relative ${
              activeId === item.id
                ? "bg-gradient-to-r from-green-500/10 to-red-500/10"
                : "hover:bg-gray-100"
            }`}
          >
            {activeId === item.id && (
              <div
                className="absolute left-0 top-0 bottom-1 w-[4] rounded-s-lg h-full"
                style={{ background: "linear-gradient(to bottom, #27ae60, #e74c3c)" }}
              />
            )}
            <div className={`${isExpanded ? "mr-3 ml-2" : ""} flex-shrink-0`}>
              {cloneElement(item.icon, {
                strokeWidth: activeId === item.id ? 2 : 1.5,
              })}
            </div>
            <span
              className={`${
                activeId === item.id
                  ? "text-black font-medium"
                  : "text-gray-700"
              } whitespace-nowrap transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 flex-grow flex flex-col justify-end">
        <button
          onClick={() => router.push("/")}
          className="flex items-center p-3 text-gray-500 hover:bg-gray-100 rounded-lg w-full"
        >
          <Home
            className="mr-3 flex-shrink-0"
            color="#27ae60"
            size={24}
            strokeWidth={1.5}
          />
          <span
            className={`whitespace-nowrap transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            Back to Home
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
