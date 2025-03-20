"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import {
  Menu,
  X,
  Settings,
  Globe2,
  Building,
  Calendar,
  Shield,
  HelpCircle,
  UserCog,
  Users,
  ArrowRightCircle,
  Sun,
  Moon
} from "lucide-react";


interface ConsoleHeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
  }
  
const ConsoleHeader = ({ isDarkMode, toggleTheme } :ConsoleHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isModeHovering, setIsModeHovering] = useState(false);

  const themeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700';

  return (
    <nav className={`${themeClass} shadow-lg fixed w-full z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="w-15 h-15 mr-2" />
              <span className="font-bold text-xl">Yalla Provider</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${themeClass}`}>
            <a href="/provider/console" className="text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              Support
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              FAQ
            </a>
            <button className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800 transition">
              <Link href="/provider/console/login">Login</Link>
            </button>

            {/* Mode switcher */}
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
                  <Link href="/provider/console" className={`block p-4 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                    <div className="flex items-center">
                      <UserCog size={20} className="mr-3 text-green-700" />
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Provider Mode</p>
                        <p className="text-xs text-gray-500">For service providers</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/" className={`block p-4 hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}>
                    <div className="flex items-center">
                      <Users size={20} className="mr-3 text-red-600" />
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>User Mode</p>
                        <p className="text-xs text-gray-500">For fans and attendees</p>
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
            
            {/* Theme toggle */}
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
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile theme toggle */}
            <label htmlFor="theme-toggle-mobile" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="theme-toggle-mobile"
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="hidden"
                />
                <div className="flex items-center justify-between w-12 h-6 p-1 bg-gray-300 rounded-full dark:bg-gray-700 transition-colors duration-300">
                  <Sun size={12} className="text-yellow-500" />
                  <Moon size={12} className="text-blue-400" />
                  <div className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </label>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/provider/console" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              Home
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              Services
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              Support
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-500">
              FAQ
            </a>
            <Link href="/provider/console/login">
              <span className="block px-3 py-2 rounded-md text-base font-medium bg-red-700 text-white hover:bg-red-800 transition">
                Login
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ConsoleHeader;