"use client";

import { useState, useEffect } from "react";
import { Menu, X, HelpCircle, Briefcase } from "lucide-react";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';
import ManagementFooter from "../Layout/Footers/ManagementFooter";
import HeaderProvider from "../Layout/Headers/HeaderProvider";
export default function ProviderLogin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                // Stocker les informations d'authentification
                localStorage.setItem("token", data.token);
                localStorage.setItem("userType", data.userType);
                localStorage.setItem("userId", data.userId);
                
                // Redirection vers la page de profil
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
            <HeaderProvider 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
                toggleSidebar={toggleSidebar} 
            />


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
            <ManagementFooter isDarkMode={isDarkMode} />

        </div>
    );
}