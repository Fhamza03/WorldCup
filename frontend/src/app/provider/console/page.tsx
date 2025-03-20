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
  ChevronRight,
  Bus,
  Utensils,
  Home as HomeIcon,
  Users,
  BarChart4,
  PieChart,
  FileText,
  LogIn,
  UserPlus,
  Ticket,
  Plane,
  UserCog,
  Activity,
  Layers,
  ArrowRightCircle,
  Sun,
  Moon
} from "lucide-react";
import { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import ConsoleHeader from "@/components/Layout/Headers/ConsoleHeader";
import MainFooter from "@/components/Layout/Footers/MainFooter";


export default function ProviderConsole() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isModeHovering, setIsModeHovering] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Handle theme change
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const themeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700';

  const services = [
    {
      icon: Users,
      title: "User Management",
      description: "Manage your clients and their Fan IDs",
    },
    {
      icon: BarChart4,
      title: "Dashboard",
      description: "Analyze your performance and statistics",
    },
    {
      icon: Calendar,
      title: "Planning",
      description: "Manage events and availability",
    },
    {
      icon: Building,
      title: "Business Profile",
      description: "Configure your provider profile",
    },
    {
      icon: PieChart,
      title: "Reports",
      description: "Access detailed analytics and reports",
    },
    {
      icon: FileText,
      title: "Documents",
      description: "Manage documents and certifications",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Configure your preferences and notifications",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Protect your data and transactions",
    },
  ];

  return (
    <div className={`min-h-screen ${themeClass}`}>
      {/* Navigation */}
      <ConsoleHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />


      {/* Mobile Menu */}
      {isMenuOpen && (
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
            <button className="w-full bg-red-700 text-white py-2 px-4 rounded-full hover:bg-red-800 transition">
              <Link href="/login">Login</Link>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className={`${themeClass} relative bg-gradient-to-r from-green-700 to-red-700 h-screen flex items-center`}>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
            opacity: "0.2",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Yalla FanID Partners Console
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Manage your services, track your performance, and provide an exceptional experience to fans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                <Link href="/provider/console/signup">Create Account</Link>
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition">
                <Link href="/provider/console/login">Log In</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className={`${themeClass} py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Console Features
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Our platform provides all the tools you need to manage your services during the World Cup.
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-md hover:shadow-lg transition group`}
              >
                <service.icon className={`w-12 h-12 text-green-700 mb-4 group-hover:text-red-700 transition-colors`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{service.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{service.description}</p>
                <a
                  href="#"
                  className="text-green-700 font-medium flex items-center group-hover:text-red-700 transition-colors"
                >
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Steps */}
      <div className={`py-20 ${themeClass}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${themeClass}`}>
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How to Become a Partner
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Follow these simple steps to join our network of official partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Registration</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Create your account and fill in your business information
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Verification</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Submit your legal documents and wait for validation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Configuration</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Configure your services and start managing your clients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className={`${themeClass} py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Access Your Partner Portal
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-center`}>
                Log in to your account or create a new account to access our Fan ID management console.
              </p>
              <div className="space-y-4">
                <Link href="/provider/console/login" className="block w-full">
                  <button className="w-full flex items-center justify-center bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
                    <LogIn className="w-5 h-5 mr-2" />
                    Log In
                  </button>
                </Link>
                <Link href="/provider/console/signup" className="block w-full">
                  <button className="w-full flex items-center justify-center border-2 border-red-700 text-red-700 px-6 py-3 rounded-full hover:bg-red-700 hover:text-white transition">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </button>
                </Link>
                <button className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition">
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${themeClass} bg-gradient-to-r from-green-700 to-red-700 py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join the Yalla FanID Network?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Become an official partner and contribute to the success of the World Cup!
            </p>
            <Link href="/signup">
              <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className={`${themeClass} py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between`}>
            <div className="flex items-center mb-6 md:mb-0">
              <HelpCircle className="w-12 h-12 text-green-700 mr-4" />
              <div>
                <h3 className={`text-xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Need Help?</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our support team is available 24/7
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition">
                Live Chat
              </button>
              <button className="border-2 border-red-700 text-red-700 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white transition">
                FAQ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <MainFooter isDarkMode={isDarkMode} />

    </div>
  );
}