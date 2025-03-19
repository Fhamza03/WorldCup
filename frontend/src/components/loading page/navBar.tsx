import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
  themeClass: string;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

function NavBar({
  themeClass,
  isDarkMode,
  setIsDarkMode,
  isMenuOpen,
  setIsMenuOpen,
}: Props) {
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };
  return (
    <nav className={`${themeClass} shadow-lg fixed w-full z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Using Next.js optimized Image component */}
              <Image
                src="/logo.png"
                alt="Logo"
                width={60} // adjust width as needed
                height={60} // adjust height as needed
                className="mr-2"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-8 ${themeClass}`}
          >
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
            <button className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800 transition">
              <Link href="/auth/login">Apply Now</Link>
            </button>

            {/* Toggle theme switch */}
            <div className="flex items-center ml-4">
              <label
                htmlFor="theme-toggle"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    id="theme-toggle"
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="hidden"
                  />
                  <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      isDarkMode ? "transform translate-x-full" : ""
                    }`}
                  ></div>
                </div>
              </label>
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
  );
}

export default NavBar;
