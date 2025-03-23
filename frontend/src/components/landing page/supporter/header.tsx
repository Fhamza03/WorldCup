"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import {
  Menu,
  X,
  Users,
  UserCog,
  Settings,
  ArrowRightCircle,
  Sun,
  Moon
} from "lucide-react";

interface MainHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: MainHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isModeHovering, setIsModeHovering] = useState(false);
  
  const themeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700';

  return (
    <>
      {/* Navigation */}
      <nav className={`${themeClass} shadow-lg fixed w-full z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="w-15 h-15 mr-2" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center space-x-8 ${themeClass}`}>
              <a href="#" className="text-gray-700 hover:text-green-700">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-green-700">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-green-700">
                Support
              </a>
              <a href="#" className="text-gray-700 hover:text-green-700">
                FAQ
              </a>
              <button
                className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800 transition"
              >
                <Link href="/auth/supporter/login">Apply Now</Link>
              </button>
              
              {/* Switcher de mode provider créatif */}
              <div className="relative">
                <button
                  className={`group flex items-center px-5 py-3 rounded-lg transition-all duration-300
                    ${isDarkMode ? 'bg-transparent' : 'bg-transparent'}
                    border-2 ${isModeHovering ? 'border-blue-500' : 'border-transparent'}
                    transform hover:scale-105`}
                  onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                  onMouseEnter={() => setIsModeHovering(true)}
                  onMouseLeave={() => setIsModeHovering(false)}
                >
                  <div className="flex items-center">
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} mr-2 font-medium`}>Mode</span>
                    <div className="ml-1 flex items-center">
                      {isDarkMode ? (
                        <div className="flex items-center">
                        </div>
                      ) : (
                        <div className="flex items-center">
                        </div>
                      )}
                    </div>
                    <div className={`ml-2 transition-transform duration-300 ${isModeDropdownOpen ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </div>
                  </div>
                </button>
                {isModeDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl z-50 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200`}>
                    <div className="p-4 border-b border-gray-200">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Switch Mode
                      </h3>
                      <p className="text-sm text-gray-500">
                        Select your preferred interface
                      </p>
                    </div>
                    <Link href="/" className={`block p-4 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                      <div className="flex items-center">
                        <Users size={20} className="mr-3 text-green-700" />
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>User Mode</p>
                          <p className="text-xs text-gray-500">For fans and attendees</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/provider" className={`block p-4 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                      <div className="flex items-center">
                        <UserCog size={20} className="mr-3 text-red-600" />
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Provider Mode</p>
                          <p className="text-xs text-gray-500">For service providers</p>
                        </div>
                        <ArrowRightCircle size={16} className="ml-auto text-red-600" />
                      </div>
                    </Link>
                    <div className="bg-gray-50 p-3 text-center text-xs text-gray-500">
                      You can switch anytime
                    </div>
                  </div>
                )}
              </div>
              
              {/* Toggle theme switch */}
              <div className="flex items-center ml-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center p-2 rounded-md bg-transparent transition-colors duration-300"
                  aria-label={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
                >
                  {isDarkMode ? (
                    <Sun size={20} className="text-green-600" />
                  ) : (
                    <Moon size={20} className="text-red-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className={`md:hidden ${themeClass} flex items-center`}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${themeClass} fixed inset-x-0 top-16 p-4 border-t shadow-md z-40`}>
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              Support
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              FAQ
            </a>
            <Link href="/auth/supporter/login" className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800 transition text-center">
              Apply Now
            </Link>
            
            {/* Mode switcher mobile */}
            <div className={`flex flex-col p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Switch Mode
              </h3>
              
              <div className="flex items-center justify-between p-2 mb-2 rounded-md hover:bg-gray-200 transition-all">
                <div className="flex items-center">
                  <Users size={20} className="mr-3 text-green-700" />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>User Mode</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              
              <Link href="/provider/console" className="w-full">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200 transition-all">
                  <div className="flex items-center">
                    <UserCog size={20} className="mr-3 text-blue-700" />
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Provider Mode</p>
                    </div>
                  </div>
                  <ArrowRightCircle size={16} className="text-blue-600" />
                </div>
              </Link>
            </div>
            
            {/* Toggle theme dans le menu mobile */}
            <div className="flex items-center justify-between py-2">
              <span>Dark Mode</span>
              <label htmlFor="mobile-theme-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    id="mobile-theme-toggle"
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="hidden"
                  />
                  <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      isDarkMode ? 'transform translate-x-full' : ''
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;