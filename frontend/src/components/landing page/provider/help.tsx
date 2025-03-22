import { LoadingPageProps } from "@/interfaces";
import { HelpCircle } from "lucide-react";
import React from "react";
import { useState } from "react";


const Help: React.FC<LoadingPageProps> = ({ themeClass }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${themeClass} py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between`}>
        <div className="flex items-center mb-6 md:mb-0">
          <HelpCircle className="w-12 h-12 text-green-700 mr-4" />
          <div>
            <h3 className={`text-xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Need Help?</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our support team is available 24/7
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition">
            Live Chat
          </button>
          <button className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white transition">
            FAQ
          </button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default Help;