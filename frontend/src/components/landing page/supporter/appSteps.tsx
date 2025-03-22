import { LoadingPageProps } from "@/interfaces";
import React from "react";

const AppSteps: React.FC<LoadingPageProps> = ({ themeClass }) => {
  return (
    <div className={`py-20  ${themeClass}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ${themeClass}`}>
        <div className="text-center mb-16">
          <h2
            className={`text-3xl font-bold text-gray-900 mb-4  ${themeClass}`}
          >
            How to Apply
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to get your Fan ID and access the
            tournament.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Register Online</h3>
            <p className="text-gray-600">
              Create your account and fill in the required information
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
            <p className="text-gray-600">
              Submit your passport and photo for verification
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Your Fan ID</h3>
            <p className="text-gray-600">
              Receive your digital Fan ID within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSteps;