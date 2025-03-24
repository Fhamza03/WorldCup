import { LoadingPageProps } from "@/interfaces";
import React from "react";
import { useState } from "react";
import {
  Home as HomeIcon,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";


const AppSteps: React.FC<LoadingPageProps> = ({ themeClass }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`py-20 ${themeClass}`}>
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${themeClass}`}>
      <div className="text-center mb-16">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          How to Become a Partner
        </h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Follow these simple steps to join our network of official partners.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            1
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Registration</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Create your account and fill in your business information
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            2
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Verification</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Submit your legal documents and wait for validation
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            3
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Configuration</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Configure your services and start managing your clients
          </p>
        </div>
      </div>
    </div>
    <div className={`${themeClass} py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Access Your Partner Portal
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-center`}>
                Log in to your account or create a new account to access our Fan ID management console.
              </p>
              <div className="space-y-4">
                <Link href="/auth/provider/login" className="block w-full">
                  <button className="w-full flex items-center justify-center bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
                    <LogIn className="w-5 h-5 mr-2" />
                    Log In
                  </button>
                </Link>
                <Link href="/auth/provider/signup" className="block w-full">
                  <button className="w-full flex items-center justify-center border-2 border-red-700 text-red-700 px-6 py-3 rounded-full hover:bg-red-700 hover:text-white transition">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </button>
                </Link>
                <button className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition">
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  

  );
};

export default AppSteps;