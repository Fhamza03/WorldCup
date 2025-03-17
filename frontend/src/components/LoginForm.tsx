"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';

export default function LoginForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logique de connexion
    console.log("Login form submitted");
  };

  return (
    <div className={`min-h-screen ${themeClass} flex flex-col`}>
      {/* Navigation */}
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className={`block px-3 py-2 ${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                Home
              </a>
              <a href="#" className={`block px-3 py-2 ${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                Services
              </a>
              <a href="#" className={`block px-3 py-2 ${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                Support
              </a>
              <a href="#" className={`block px-3 py-2 ${isDarkMode ? 'text-white' : 'text-gray-700'} hover:text-green-700`}>
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>

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
              <Link href="/auth/signup" className="text-red-700 hover:text-red-600 font-semibold">
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
      <footer className={`bg-gray-900 text-white py-2 ${themeClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bloc centré avec logo et texte */}
          <div className="flex items-center justify-center space-x-4">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
            <p className="text-gray-400">Your official World Cup identification system.</p>
          </div>

          {/* Bloc avec texte centré pour le copyright */}
          <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400">
            <p>&copy; 2025 FanID. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}