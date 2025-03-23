"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Menu, X, Upload, Camera } from "lucide-react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';
import Header from "./header";
import Footer from "../footer";

// Ensure consistent interface definition
interface ServiceType {
    serviceTypeId: number;
    serviceTypeName: string;
}

export default function ProviderSignUp() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "PROVIDER",
        firstName: "",
        lastName: "",
        birthDate: "",
        nationality: "",
        typeOfService: "",
        nationalId: "",
        confirmPassword: ""
    });
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [countries, setCountries] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setIsDarkMode(savedTheme === "dark");

        // Fetch countries from the JSON file
        fetchCountries();

        // Fetch service types from the backend
        fetchServiceTypes();
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

    const fetchServiceTypes = async () => {
        try {
            const response = await fetch('http://localhost:8080/serviceType/getAllServiceTypes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Service types received:", data);
            setServiceTypes(data);
        } catch (error) {
            console.error("Error fetching service types:", error);
            setServiceTypes([]);
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

    const validatePasswords = () => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    };

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!passwordMatch) return;
    
        setIsSubmitting(true);
    
        try {
            const formDataObj = new FormData();
    
            // Ajouter tous les champs de formulaire
            formDataObj.append("email", formData.email);
            formDataObj.append("password", formData.password);
            formDataObj.append("firstName", formData.firstName);
            formDataObj.append("lastName", formData.lastName);
            formDataObj.append("birthDate", formData.birthDate);
            formDataObj.append("nationality", formData.nationality);
            formDataObj.append("nationalCode", formData.nationalId);
            formDataObj.append("userType", formData.userType);
            formDataObj.append("serviceTypeId", formData.typeOfService);

            
    
            // Ajouter une image de profil si elle existe
            if (profilePhoto) {
                const response = await fetch(profilePhoto);
                const blob = await response.blob();
                const file = new File([blob], "profile-picture.jpg", { type: "image/jpeg" });
                formDataObj.append("profilePicture", file);
            }
    
            // Envoi de la requête au backend
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                body: formDataObj,
            });
    
            if (response.ok) {
                localStorage.setItem("userType", "PROVIDER");
                alert("Registration successful! Redirecting to console...");
                window.location.href = "/provider";
            } else {
                throw new Error(`Registration failed: ${response.status}`);
            }
        } catch (error) {
            console.error("Error during registration process:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className={`min-h-screen ${themeClass} flex flex-col`}>
            <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />

            <div className="flex-grow flex items-center justify-center relative py-8">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
                        opacity: "0.2",
                    }}
                ></div>

                <div className={`${themeClass} p-6 rounded-lg shadow-2xl shadow-gray-500/40 w-full max-w-2xl sm:max-w-3xl relative z-10`}>
                    <div className="flex justify-center mb-6">
                        <Image src="/logo.png" alt="Logo" width={90} height={90} />
                    </div>

                    <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-6`}>
                        Provider Registration
                    </h2>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div
                                    className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                        }`}
                                >
                                    {profilePhoto ? (
                                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                            <Camera size={40} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                        </div>
                                    )}
                                </div>
                                <label
                                    htmlFor="profile-photo"
                                    className={`absolute bottom-0 right-0 w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                        } flex items-center justify-center cursor-pointer hover:opacity-80`}
                                >
                                    <Upload size={18} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                                    <input
                                        type="file"
                                        id="profile-photo"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfilePhotoChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="hidden"
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                required
                            />
                        </div>

                        {/* First Name and Last Name (on same line) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={validatePasswords}
                                    className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border ${passwordMatch ? "border-slate-200" : "border-red-500"
                                        } rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={validatePasswords}
                                    className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border ${passwordMatch ? "border-slate-200" : "border-red-500"
                                        } rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
                                    required
                                />
                            </div>
                        </div>

                        {!passwordMatch && (
                            <p className="text-red-500 text-sm -mt-4">Passwords do not match</p>
                        )}

                        {/* Email */}
                        <div className="relative">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                required
                            />
                        </div>

                        {/* Date of Birth and National ID (on same line) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    National ID / Passport Number
                                </label>
                                <input
                                    type="text"
                                    name="nationalId"
                                    placeholder="ID or passport number"
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Country of Origin and Type of Service (on same line) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Country of Origin
                                </label>
                                <select
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                >
                                    <option value="">Select your country</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Type of Service
                                </label>
                                <select
                                    name="typeOfService"
                                    value={formData.typeOfService}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                >
                                    <option value="">Select your service</option>
                                    {serviceTypes.length > 0 ? (
                                        serviceTypes.map(service => (
                                            <option 
                                                key={service.serviceTypeId} 
                                                value={service.serviceTypeId.toString()}
                                            >
                                                {service.serviceTypeName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Loading services...</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`mt-6 w-full rounded-md bg-gradient-to-r from-green-700 to-red-700 py-3 px-4 border border-transparent text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none ${!passwordMatch || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!passwordMatch || isSubmitting}
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p>Already have an account? <Link href="/auth/provider/login" className="text-green-700">Login</Link></p>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}