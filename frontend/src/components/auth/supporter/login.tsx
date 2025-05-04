"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';
import Header from "./header";
import Footer from "../footer";
export default function LoginForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Gérer le changement de thème
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
        const response = await fetch("http://localhost:8083/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, userType: "SUPPORTER" }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          // Stocker les informations d'authentification
          localStorage.setItem("token", data.token);
          localStorage.setItem("userType", data.userType);
          localStorage.setItem("userId", data.userId);
          
          // Redirection vers la page de profil
          window.location.href = "/dashboard/supporter/profile";
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
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />


      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
            opacity: "0.2",
          }}
        ></div>

        {/* Auth Form Container */}
        <div
          className={`${themeClass} p-6 rounded-lg shadow-2xl shadow-gray-500/40 w-full max-w-lg sm:max-w-xl relative z-10`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Logo" width={90} height={90} />
          </div>

          {/* Form Title */}
          <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-6`}>
            Welcome to Yalla Fan ID
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-gradient-to-r from-green-700 to-red-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Login
            </button>
          </form>

          {/* Don't have an account - Signup Link */}
          <div className="mt-4 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <Link href="/auth/supporter/signup" className="text-red-700 hover:text-red-600 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={() =>
              signIn("google", { callbackUrl: window.location.href })
            }
            className={`w-full flex items-center justify-center space-x-3 text-black py-3 rounded-md mt-4 transition  ${isDarkMode ? "bg-gray-900 text-white" : ""
              }`}
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />

    </div>
  );
}