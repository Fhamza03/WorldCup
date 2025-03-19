"use client";

import { useState, useEffect } from "react";
import { Menu, X, HelpCircle, Briefcase } from "lucide-react";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';

export default function ProviderLogin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    // Handle theme change
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const themeClass = isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-white text-gray-700";

        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            setErrorMessage(null);
        
            try {
              const response = await fetch("http://localhost:8080/api/auth/signin", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, userType: "PROVIDER" }),
              });
        
              const data = await response.json();
        
              if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userType", data.userType);
                localStorage.setItem("userId", data.userId);
                
                window.location.href = "/provider/console/profile";
              } else {
                setErrorMessage(data.message || "Login failed. Please try again.");
              }
            } catch (error) {
              console.error("Error during login:", error);
              setErrorMessage("An error occurred during login. Please try again.");
            }
          };

    return (
        <div className={`min-h-screen ${themeClass} flex flex-col`}>
            {/* Navigation */}
            <nav className={`${themeClass} shadow-lg w-full z-50`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Image src="/logo.png" alt="Logo" width={60} height={60} className="mr-2" />
                            <span className="font-bold text-green-700">Provider Portal</span>
                        </div>
                        <div className={`hidden md:flex items-center space-x-8 ${themeClass}`}>
                            <Link className={`${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`} href="/provider/console">Home</Link>
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
                                            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isDarkMode ? "transform translate-x-full" : ""
                                                }`}
                                        ></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {/* Mobile menu button */}
                        <div className={`md:hidden ${themeClass} flex items-center`}>
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

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center relative py-8">
            {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                          'url("https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
                        opacity: "0.2",
                      }}
                ></div>

                {/* Auth Form Container */}
                <div
                    className={`${themeClass} p-6 rounded-lg shadow-2xl shadow-gray-500/40 w-full max-w-lg sm:max-w-xl relative z-10`}
                >
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <Image src="/logo.png" alt="Logo" width={90} height={90} />
                    </div>

                    {/* Form Title */}
                    <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                        Provider Portal
                    </h2>
                    <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                        Access your Yalla Fan ID provider dashboard
                    </p>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Provider Email
                            </label>
                            <input
                                type="email"
                                placeholder="company@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-400 hover:border-slate-300 shadow-sm focus:shadow"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-400 hover:border-slate-300 shadow-sm focus:shadow"
                                required
                            />
                        </div>

                      

                        <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-gradient-to-r from-green-700 to-red-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Provider Login
                        </button>
                    </form>

                    {/* Account application */}
                    <div className="mt-4 text-center">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Need a provider account?{' '}
                            <Link href="/provider/console/signup" className="text-green-700 hover:text-green-600 font-semibold">
                                Apply Here
                            </Link>
                        </p>
                    </div>

                    {/* Google Sign-In Button */}
                    <button
                        onClick={() =>
                            signIn("google", { callbackUrl: window.location.href })
                        }
                        className={`w-full flex items-center justify-center space-x-3 text-black py-3 rounded-md mt-4 transition border ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "border-gray-200"
                            }`}
                    >
                        <FcGoogle size={24} />
                        <span>Sign in with Google</span>
                    </button>

                    {/* Provider support section */}
                    
                </div>
            </div>
            {/* Footer */}
            <footer className={`bg-gray-900 text-white py-2 ${themeClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Center block with logo and text */}
                    <div className="flex items-center justify-center space-x-4">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                        <div>
                            <p className="text-gray-400">Your official World Cup identification system.</p>
                            <p className="text-green-600 text-sm">Provider Portal</p>
                        </div>
                    </div>

                    {/* Center block with copyright text */}
                    <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400">
                        <p>&copy; 2025 FanID. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}