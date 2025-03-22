import { LoadingPageProps } from "@/interfaces";
import React from "react";
import Link from "next/link";
const Cta: React.FC<LoadingPageProps> = ({ themeClass }) => {
  return (
    <div className={`${themeClass} bg-gradient-to-r from-green-700 to-red-700 py-16`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Join the Yalla FanID Network?
        </h2>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Become an official partner and contribute to the success of the World Cup!
        </p>
        <Link href="/signup">
          <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Cta;