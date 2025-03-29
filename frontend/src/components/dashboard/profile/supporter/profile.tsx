"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Menu, X, Upload, Camera, Edit, User, Mail, Calendar, Globe, Heart, CreditCard, Save, Phone, Shield, LogOut } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "./header";
import Footer from "@/components/auth/footer";

export default function SupporterProfile() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        nationality: "",
        nationalCode: "",

    });

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }

        // Fetch all required data in parallel
        Promise.all([
            fetchCountries(),
            fetchSupporterData()
        ]).then(() => {
            setIsLoading(false);
        }).catch(err => {
            console.error("Error loading data:", err);
            setError("Failed to load all required data. Please refresh and try again.");
            setIsLoading(false);
        });
    }, []);

    const fetchSupporterData = async () => {
        try {
            const token = localStorage.getItem("token");
            const supporterId = localStorage.getItem("userId");

            if (!token || !supporterId) {
                throw new Error("Authentication information missing. Please login again.");
            }

            const response = await fetch(`http://localhost:8080/supporter/getSupporter/${supporterId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch supporter data: ${response.status}`);
            }

            const supporterData = await response.json();

            // Update form data with supporter information
            setFormData({
                id: supporterData.userId || 0,
                email: supporterData.email || "",
                firstName: supporterData.firstName || "",
                lastName: supporterData.lastName || "",
                birthDate: supporterData.birthDate || "",
                nationality: supporterData.nationality || "",
                nationalCode: supporterData.nationalCode || "",
            });

            // Dans fetchProviderData()
            if (supporterData.profilePicture) {
                // Vérifiez si le chemin est absolu ou relatif
                const profilePicPath = supporterData.profilePicture;

                // Si le chemin contient déjà le protocole http://, utilisez-le tel quel
                if (profilePicPath.startsWith('http')) {
                    setProfilePhoto(profilePicPath);
                }
                // Si c'est un chemin relatif, ajoutez l'URL de base
                else {
                    // Extraire le chemin relatif si nécessaire
                    const relativePath = profilePicPath.includes('uploads')
                        ? profilePicPath.substring(profilePicPath.indexOf('uploads'))
                        : profilePicPath;

                    setProfilePhoto(`http://localhost:8080/${relativePath}`);
                }
            }

            return supporterData;
        } catch (error) {
            console.error("Error fetching supporter data:", error);
            setError(error instanceof Error ? error.message : "Unknown error occurred");
            return null;
        }
    };

    const [countries, setCountries] = useState<string[]>([]);

    const fetchCountries = async () => {
        try {
            const response = await fetch('/countries.json');
            const data = await response.json();
            setCountries(data);
            return data;
        } catch (error) {
            console.error("Error fetching countries:", error);
            setCountries(["Error loading countries"]);
            return [];
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("userId");

                window.location.href = "/auth/supporter/login";
            } else {
                setErrorMessage(data.message || "Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            setErrorMessage("An error occurred during logout. Please try again.");
        }
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Authentication information missing. Please login again.");
            }

            // Create an endpoint in your backend for updating supporter data
            const response = await fetch(`http://localhost:8080/supporter/updateSupporter/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    profilePicture: profilePhoto
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to update supporter: ${response.status}`);
            }

            console.log("Profile updated successfully");
            setIsEditing(false);

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userType = localStorage.getItem("userType");

        if (!token) {
            router.push("/auth/spporter/login");
        } else if (userType !== "SUPPORTER") {
            // Redirect to appropriate page if not a supporter
            router.push("/");
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className={`min-h-screen ${themeClass} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p>Loading supporter data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${themeClass} flex items-center justify-center`}>
                <div className="text-center max-w-md p-6 rounded-lg shadow-lg bg-red-100 border border-red-300">
                    <div className="text-red-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Supporter Data</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            setError(null);
                            setIsLoading(true);
                            Promise.all([
                                fetchCountries(),
                                fetchSupporterData()
                            ]).then(() => {
                                setIsLoading(false);
                            }).catch(err => {
                                console.error("Error loading data:", err);
                                setError("Failed to load all required data. Please refresh and try again.");
                                setIsLoading(false);
                            });
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Try Again
                    </button>
                    <Link href="/auth/login" className="block mt-4 text-blue-600 hover:underline">
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${themeClass} flex flex-col bg-gradient-to-b ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-white'}`}>
            {/* Header Component */}
            <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                profilePhoto={profilePhoto}
            />

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
                                            <Image
                                                src={profilePhoto}
                                                alt="Profile"
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                                onError={() => setProfilePhoto("/logo.png")} // Fallback image
                                                unoptimized
                                            />
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

                                {/* Phone Number */}


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
                                                value={formData.nationalCode}
                                                onChange={handleChange}
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700 focus:border-gray-600' : 'border-gray-300 focus:border-gray-400'} rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Country of Origin */}
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
                                            value={formData.nationality}
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
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}