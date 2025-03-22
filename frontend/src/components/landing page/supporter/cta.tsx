import { LoadingPageProps } from "@/interfaces";
import React from "react";

const Cta: React.FC<LoadingPageProps> = ({ themeClass }) => {
  return (
    <div
      className={` ${themeClass} bg-gradient-to-r from-green-700 to-red-700 py-16`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for the World Cup?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Don&apos;t miss out on the biggest football event. Apply for your
            Fan ID today!
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cta;