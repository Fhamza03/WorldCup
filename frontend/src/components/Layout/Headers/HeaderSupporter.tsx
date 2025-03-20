"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

interface HeaderSupporterProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    profilePhoto: string | null;
}

export default function HeaderSupporter({
    isDarkMode,
    toggleTheme,
    profilePhoto
}: HeaderSupporterProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("userId");

                window.location.href = "/auth/login";
            } else {
                setErrorMessage(data.message || "Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            setErrorMessage("An error occurred during logout. Please try again.");
        }
    };

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
                        <div className="relative ml-4">
                            <div
                                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-green-700"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <User size={24} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <div
                                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}
                                    onBlur={() => setTimeout(() => setIsProfileMenuOpen(false), 100)}
                                >
                                    <Link
                                        href=""
                                        className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <User size={16} className="mr-2" />
                                            Profile
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsProfileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <div className="flex items-center">
                                            <LogOut size={16} className="mr-2" />
                                            Déconnexion
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className={`md:hidden ${themeClass} flex items-center`}>
                        {/* Mobile Profile Photo */}
                        <div className="relative mr-4">
                            <div
                                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-green-700"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <User size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                    </div>
                                )}
                            </div>

                            {/* Mobile Profile Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <div
                                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}
                                >
                                    <Link
                                        href=""
                                        className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <User size={16} className="mr-2" />
                                            Profile
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsProfileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <div className="flex items-center">
                                            <Link href="/auth/login">
                                                <LogOut size={16} className="mr-2" />
                                                Déconnexion
                                            </Link>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
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