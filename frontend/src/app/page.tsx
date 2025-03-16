"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-700">
                Fan<span className="text-red-700">ID</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
                Apply Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-700"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-700"
              >
                Services
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-700"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-700"
              >
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-red-700 h-screen flex items-center">
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

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group"
              >
                <service.icon className="w-12 h-12 text-green-700 mb-4 group-hover:text-red-700 transition-colors" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
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
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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
      <div className="bg-gradient-to-r from-green-700 to-red-700 py-16">
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
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <HelpCircle className="w-12 h-12 text-green-700 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Need Help?</h3>
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Fan<span className="text-red-500">ID</span>
              </h3>
              <p className="text-gray-400">
                Your official World Cup identification system.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FanID. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
