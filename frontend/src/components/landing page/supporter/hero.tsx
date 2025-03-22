import { LoadingPageProps } from "@/interfaces";
import React from "react";

const Hero: React.FC<LoadingPageProps> = ({ themeClass }) => {
  return (
    <div
      className={` ${themeClass} relative bg-gradient-to-r from-green-700 to-red-700 h-screen flex items-center`}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
          opacity: "0.2",
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Gateway to the World Cup
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Apply for your digital Fan ID to access matches, venues, and enjoy a
            seamless tournament experience.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Get Your Fan ID
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;