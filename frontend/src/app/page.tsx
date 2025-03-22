"use client";

import { useState, useEffect  } from "react";
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import MainFooter from "@/components/Layout/Footers/MainFooter";
import {
  Menu,
  X,
  Ticket,
  Globe2,
  Plane,
  Calendar,
  Shield,
  HelpCircle,
  ChevronRight,
  Bus,
  Utensils,
  Home as HomeIcon,
  UserCog,
  Settings,
  Users,
  Activity,
  Layers,
  ArrowRightCircle,
  Sun,Moon
} from "lucide-react";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import LoginPage from "./auth/supporter/login/page";
import MainHeader from "@/components/Layout/Headers/MainHeader";
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [isModeHovering, setIsModeHovering] = useState(false);

  // État pour la validation des mots de passe
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Gérer le changement de thème
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  
  const themeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700';

  // Fonction pour vérifier si les mots de passe correspondent
  const validatePasswords = () => {
    if (confirmPassword !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logique de connexion
  };

  const services = [
    {
      icon: Ticket,
      title: "Fan ID Application",
      description: "Apply for your digital Fan ID to attend matches",
    },
    {
      icon: Globe2,
      title: "Match Access",
      description: "Your gateway to all tournament venues",
    },
    {
      icon: Plane,
      title: "Travel Entry",
      description: "Multiple entry visa for the tournament duration",
    },
    {
      icon: Bus,
      title: "Transport Services",
      description: "Free shuttle services between venues and accommodations",
    },
    {
      icon: Utensils,
      title: "Restaurants Guide",
      description: "Discover local and international dining options",
    },
    {
      icon: HomeIcon,
      title: "Hostels & Hotels",
      description: "Budget-friendly to luxury accommodation options",
    },
    {
      icon: Calendar,
      title: "Match Schedule",
      description: "View complete tournament schedule",
    },
    {
      icon: Shield,
      title: "Safety & Rules",
      description: "Important guidelines for attendees",
    },
  ];

  return (
    <div className={`min-h-screen ${themeClass}`}>

      {/* Navigation */}
      <MainHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${themeClass} fixed inset-x-0 top-16 p-4 border-t shadow-md z-40`}>
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              Support
            </a>
            <a href="#" className="text-gray-700 hover:text-green-700 py-2">
              FAQ
            </a>
            <Link href="/auth/login" className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800 transition text-center">
              Apply Now
            </Link>
            
            {/* Mode switcher mobile */}
            <div className={`flex flex-col p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Switch Mode
              </h3>
              
              <div className="flex items-center justify-between p-2 mb-2 rounded-md hover:bg-gray-200 transition-all">
                <div className="flex items-center">
                  <Users size={20} className="mr-3 text-green-700" />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>User Mode</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              
              <Link href="/provider/console" className="w-full">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-200 transition-all">
                  <div className="flex items-center">
                    <UserCog size={20} className="mr-3 text-blue-700" />
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Provider Mode</p>
                    </div>
                  </div>
                  <ArrowRightCircle size={16} className="text-blue-600" />
                </div>
              </Link>
            </div>
            
            {/* Toggle theme dans le menu mobile */}
            <div className="flex items-center justify-between py-2">
              <span>Dark Mode</span>
              <label htmlFor="mobile-theme-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    id="mobile-theme-toggle"
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="hidden"
                  />
                  <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      isDarkMode ? 'transform translate-x-full' : ''
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className={` ${themeClass} relative bg-gradient-to-r from-green-700 to-red-700 h-screen flex items-center`}>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
            opacity: "0.2",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Gateway to the World Cup
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Apply for your digital Fan ID to access matches, venues, and enjoy
              a seamless tournament experience.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Get Your Fan ID
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reste du contenu inchangé */}
      {/* Services Section */}
      <div className={` ${themeClass} py-20 bg-gray-50 `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fan ID Benefits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your digital Fan ID provides access to multiple services and
              benefits throughout the tournament.
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 `}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group  ${themeClass}`}
              >
                <service.icon className={`w-12 h-12 text-green-700 mb-4 group-hover:text-red-700 transition-colors`} />
                <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
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

      {/* Application Steps */}
      <div className={`py-20  ${themeClass}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ${themeClass}`}>
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold text-gray-900 mb-4  ${themeClass}`}>
              How to Apply
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to get your Fan ID and access the
              tournament.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register Online</h3>
              <p className="text-gray-600">
                Create your account and fill in the required information
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
              <p className="text-gray-600">
                Submit your passport and photo for verification
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Fan ID</h3>
              <p className="text-gray-600">
                Receive your digital Fan ID within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={` ${themeClass} bg-gradient-to-r from-green-700 to-red-700 py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for the World Cup?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Don&apos;t miss out on the biggest football event. Apply for your
              Fan ID today!
            </p>
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Start Application
            </button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className={` ${themeClass} py-16 bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <HelpCircle className="w-12 h-12 text-green-700 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1 text-black">Need Help?</h3>
                <p className="text-gray-600">
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