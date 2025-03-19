"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Menu, X, Upload, Camera, Edit, User, Mail, Calendar, Globe, Heart, CreditCard, Save, Phone, Shield } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

export default function SupporterProfile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");
    const [formData, setFormData] = useState({
        email: "supporter@example.com",
        firstName: "Abdelmoughith",
        lastName: "EL AOUMARI",
        birthDate: "2002-05-11",
        countryOfOrigin: "Canada",
        nationalId: "CD987654321",
        phoneNumber: "+1 345 678 9012",
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

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

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
        "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
        "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
        "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
        "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
        "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
        "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
        "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
        "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
        "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
        "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
        "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
        "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
        "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
        "Yemen", "Zambia", "Zimbabwe"
    ];


    return (
        <div className={`min-h-screen ${themeClass} flex flex-col bg-gradient-to-b ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-white'}`}>
            {/* Header */}
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
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <div className={`${cardBgClass} rounded-xl shadow-xl overflow-hidden`}>
                        {/* Profile Header Banner */}
                        <div className="h-32 bg-gradient-to-r from-red-600  to-green-900 relative">
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
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-blue-500 hover:bg-blue-600"
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
                                        Supporter
                                    </p>
                                </div>
                                <div className={`mt-4 md:mt-0 flex items-center px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                    <Shield size={16} className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Verified Fan</span>
                                </div>
                            </div>

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
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
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
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
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
                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
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
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
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
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        Country of Origin
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe
                                                size={16}
                                                className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}
                                            />
                                        </div>

                                        <select
                                            name="countryOfOrigin"
                                            value={formData.countryOfOrigin}
                                            onChange={handleChange}
                                            className={`
        w-full ${inputBgClass} border rounded-lg pl-10 pr-3 py-2 focus:outline-none
        focus:ring-2 focus:ring-blue-500/20 transition-all duration-200
        ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'}
      `}
                                            disabled={!isEditing}
                                        >
                                            <option value="">Select your country</option>
                                            {countries.map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>




                                {/* Submit Button - Only visible when editing */}
                                {isEditing && (
                                    <button
                                        type="submit"
                                        className="mt-8 w-full rounded-lg bg-gradient-to-r from-red-600 to-green-900 py-3 px-4 text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            <footer className={`bg-gray-900 text-white py-2 ${themeClass}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Center block with logo and text */}
                    <div className="flex items-center justify-center space-x-4">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                        <div>
                            <p className="text-gray-400">Your official World Cup identification system.</p>
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