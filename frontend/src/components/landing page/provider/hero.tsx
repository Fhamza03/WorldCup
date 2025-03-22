import { LoadingPageProps } from "@/interfaces";
import React from "react";
import Link from 'next/link';


const Hero: React.FC<LoadingPageProps> = ({ themeClass }) => {
  return (
    <div className={`${themeClass} relative bg-gradient-to-r from-green-700 to-red-700 h-screen flex items-center`}>
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
        opacity: "0.2",
      }}
    ></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Yalla FanID Partners Console
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Manage your services, track your performance, and provide an exceptional experience to fans.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            <Link href="/provider/console/signup">Create Account</Link>
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition">
            <Link href="/provider/console/login">Log In</Link>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Hero;