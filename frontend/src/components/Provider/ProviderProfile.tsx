"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Menu, X, Upload, Camera, Edit, User, Mail, Calendar, Globe, Briefcase, CreditCard, Save, Phone, Shield } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import SidebarPr from "../Layout/Provider/SidebarPr";// Import the SidebarPr component
import HeaderProvider from "../Layout/Headers/HeaderProvider";
import ManagementFooter from "../Layout/Footers/ManagementFooter";

export default function ProviderProfile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");
    const [countries, setCountries] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        email: "provider@example.com",
        firstName: "John",
        lastName: "Doe",
        birthDate: "1985-05-15",
        countryOfOrigin: "United States",
        typeOfService: "Transportation",
        nationalId: "AB123456789",
        phoneNumber: "+1 234 567 8900",
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
        fetchCountries();

    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('/countries.json');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error("Error fetching countries:", error);
            // Fallback in case the file cannot be loaded
            setCountries(["Error loading countries"]);
        }
    };
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };



    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const inputBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setProfilePhoto(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        console.log("Profile updated", formData);
        // Here you would typically send the data to your API
    };



    const services = ["Transportation", "Restauration", "Accommodation"];

    return (
        <div className={`min-h-screen ${themeClass} flex flex-col bg-gradient-to-b ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-white'}`}>
       
            
            {/* Header */}
            <HeaderProvider 
               isDarkMode={isDarkMode} 
               toggleTheme={toggleTheme} 
               profilePhoto={profilePhoto} 

            />

            {/* Main Content - Adjust padding when sidebar is open */}
            <div className={`flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
                <div className="w-full max-w-3xl">
                    <div className={`${cardBgClass} rounded-xl shadow-xl overflow-hidden`}>
                        {/* Profile Header Banner */}
                        <div className="h-32 bg-gradient-to-r from-red-600 to-green-900 relative">
                            <div className="absolute -bottom-12 left-8">
                                <div className="relative">
                                    <div className={`w-24 h-24 rounded-full border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'} overflow-hidden`}>
                                        {profilePhoto ? (
                                            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                <User size={40} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <label
                                            htmlFor="profile-photo"
                                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors shadow-md"
                                        >
                                            <Camera size={16} className="text-white" />
                                            <input
                                                type="file"
                                                id="profile-photo"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleProfilePhotoChange}
                                                disabled={!isEditing}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${isEditing
                                        ? "bg-red-600 hover:bg-green-700"
                                        : "bg-red-900 hover:bg-blue-700"
                                        } text-white transition-colors shadow-md`}
                                >
                                    {isEditing ? <Save size={16} /> : <Edit size={16} />}
                                    {isEditing ? "Save" : "Edit Profile"}
                                </button>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="pt-16 px-8 pb-8">
                            <div className="flex flex-col md:flex-row justify-between mb-8">
                                <div>
                                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {formData.firstName} {formData.lastName}
                                    </h2>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {formData.typeOfService} Provider
                                    </p>
                                </div>
                                <div className={`mt-4 md:mt-0 flex items-center px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                                    <Shield size={16} className={`mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                                    <span className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Verified Provider</span>
                                </div>
                            </div>

                     
                            
                            {/* Form content continues here */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* First Name and Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-1">
                                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Date of Birth and National ID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Date of Birth
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            National ID / Passport
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CreditCard size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                            <input
                                                type="text"
                                                name="nationalId"
                                                value={formData.nationalId}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Country and Service Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Country of Origin
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Globe size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                            <select
                                                name="countryOfOrigin"
                                                value={formData.countryOfOrigin}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            >
                                                <option value="">Select your country</option>
                                                {countries.map(country => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Type of Service
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Briefcase size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                            </div>
                                            <select
                                                name="typeOfService"
                                                value={formData.typeOfService}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            >
                                                <option value="">Select your service</option>
                                                {services.map(service => (
                                                    <option key={service} value={service}>{service}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button - Only visible when editing */}
                                {isEditing && (
                                    <button
                                        type="submit"
                                        className="mt-8 w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 py-3 px-4 text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </form>

                            {/* Account Actions */}
                            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <h3 className={`text-lg font-medium mb-4 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    Account Actions
                                </h3>

                                <div className="flex flex-wrap justify-center items-center gap-4">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors shadow-sm">
                                        <Shield size={16} />
                                        Reset Password
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm">
                                        <X size={16} />
                                        Delete Account
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <ManagementFooter isDarkMode={isDarkMode} />

        </div>
    );
}