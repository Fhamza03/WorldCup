import React from "react";
import {
  Ticket,
  Globe2,
  Plane,
  Calendar,
  Shield,
  ChevronRight,
  Bus,
  Utensils,
  Home as HomeIcon,
} from "lucide-react";
import { LoadingPageProps } from "@/interfaces";

const services = [
  {
    icon: Ticket,
    title: "Fan ID Application",
    description: "Apply for your digital Fan ID to attend matches",
  },
  {
    icon: Globe2,
    title: "Match Access",
    description: "Your gateway to all tournament venues",
  },
  {
    icon: Plane,
    title: "Travel Entry",
    description: "Multiple entry visa for the tournament duration",
  },
  {
    icon: Bus,
    title: "Transport Services",
    description: "Free shuttle services between venues and accommodations",
  },
  {
    icon: Utensils,
    title: "Restaurants Guide",
    description: "Discover local and international dining options",
  },
  {
    icon: HomeIcon,
    title: "Hostels & Hotels",
    description: "Budget-friendly to luxury accommodation options",
  },
  {
    icon: Calendar,
    title: "Match Schedule",
    description: "View complete tournament schedule",
  },
  {
    icon: Shield,
    title: "Safety & Rules",
    description: "Important guidelines for attendees",
  },
];

const Services: React.FC<LoadingPageProps> = ({ themeClass }) => {
  return (
    <div className={` ${themeClass} py-20 bg-gray-50 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fan ID Benefits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your digital Fan ID provides access to multiple services and
            benefits throughout the tournament.
          </p>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 `}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group  ${themeClass}`}
            >
              <service.icon
                className={`w-12 h-12 text-green-700 mb-4 group-hover:text-red-700 transition-colors`}
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a
                href="#"
                className="text-green-700 font-medium flex items-center group-hover:text-red-700 transition-colors"
              >
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;