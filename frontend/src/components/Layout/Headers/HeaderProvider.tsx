"use client";

import { useState, useEffect } from "react";
import { Menu, X,Sun,Moon } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

interface HeaderProviderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export default function HeaderProvider({ isDarkMode, toggleTheme }: HeaderProviderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`sticky top-0 ${isDarkMode ? 'bg-gray-900/95 border-b border-gray-700' : 'bg-white/95 border-b border-gray-200'} backdrop-blur-sm shadow-sm w-full z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            
                            className={`mr-4 ${isDarkMode ? 'text-white' : 'text-gray-700'} hover:opacity-75 transition-opacity`}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center">
                            <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-2" />
                            <span className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FanID</span>
                        </div>
                    </div>
                    <div className={`hidden md:flex items-center space-x-8 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        <Link className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`} href="/">Home</Link>
                        <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                            Services
                        </a>
                        <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                            Support
                        </a>
                        <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-white hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition-colors`}>
                            FAQ
                        </a>

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
                    <div className={`md:hidden flex items-center`}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:opacity-75 transition-opacity`}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} absolute w-full border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
                    <div className="px-4 py-3 space-y-2">
                        <Link className={`block py-2 px-4 rounded-md ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'} transition-colors`} href="/">
                            Home
                        </Link>
                        <a href="#" className={`block py-2 px-4 rounded-md ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'} transition-colors`}>
                            Services
                        </a>
                        <a href="#" className={`block py-2 px-4 rounded-md ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'} transition-colors`}>
                            Support
                        </a>
                        <a href="#" className={`block py-2 px-4 rounded-md ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'} transition-colors`}>
                            FAQ
                        </a>
                        <div className="flex items-center pt-2">
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mr-3`}>
                                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                            </span>
                            <label htmlFor="mobile-theme-toggle" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        id="mobile-theme-toggle"
                                        type="checkbox"
                                        checked={isDarkMode}
                                        onChange={toggleTheme}
                                        className="hidden"
                                    />
                                    <div className={`block w-12 h-6 rounded-full transition ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                                    <div
                                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${isDarkMode ? "transform translate-x-6" : ""
                                            }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}