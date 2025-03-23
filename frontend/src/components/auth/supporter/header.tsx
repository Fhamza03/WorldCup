"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

interface HeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    
}

export default function Header({
    isDarkMode,
    toggleTheme,
   
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";


    return (
        <nav className={`${themeClass} shadow-lg w-full z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={60} height={60} className="mr-2" />
                    </div>
                    <div className={`hidden md:flex items-center space-x-8 ${themeClass}`}>
                        <Link className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`} href="/">Home</Link>
                        <a href="#" className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                            Services
                        </a>
                        <a href="#" className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                            Support
                        </a>
                        <a href="#" className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                            FAQ
                        </a>
                        <a href="#" className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                            Provider Help
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
                        {/* Profile Photo and Menu */}

                    </div>
                    {/* Mobile menu button */}

                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className={`md:hidden ${themeClass}`}>
                    <div className={`md:hidden ${themeClass} fixed inset-0 z-40 pt-16`}>
                        <div className="p-4 space-y-4">
                            <a href="#" className="block py-2 px-4 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                Home
                            </a>
                            <a href="#" className="block py-2 px-4 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                Services
                            </a>
                            <a href="#" className="block py-2 px-4 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                Support
                            </a>
                            <a href="#" className="block py-2 px-4 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                FAQ
                            </a>
                            <a href="#" className="block py-2 px-4 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                Provider Help
                            </a>
                            <button className="w-full bg-green-700 text-white py-2 px-4 rounded-full hover:bg-green-800 transition">
                                <Link href="/login">Login</Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}