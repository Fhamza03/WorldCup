"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Menu, X, Upload, Camera } from "lucide-react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';
import Header from "./header";
import Footer from "../footer";

export default function SignUpForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "SUPPORTER",
    firstName: "",
    lastName: "",
    birthDate: "",
    countryOfOrigin: "",
    nationalId: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    // Fetch countries from the JSON file
    fetchCountries();
  }, []);

  // Function to fetch countries from the JSON file
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

  // Fonction pour vérifier si les mots de passe correspondent
  const validatePasswords = () => {
    setPasswordMatch(formData.confirmPassword === formData.password);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    try {
        // Create FormData object for multipart/form-data submission
        const formDataObj = new FormData();

        // Add all form fields to FormData
        formDataObj.append("email", formData.email);
        formDataObj.append("password", formData.password);
        formDataObj.append("firstName", formData.firstName);
        formDataObj.append("lastName", formData.lastName);
        formDataObj.append("birthDate", formData.birthDate);
        formDataObj.append("nationality", formData.countryOfOrigin);
        formDataObj.append("nationalCode", formData.nationalId);
        formDataObj.append("userType", formData.userType);


        // Add profile picture if exists
        if (profilePhoto) {
            // Convert base64 string back to file
            const response = await fetch(profilePhoto);
            const blob = await response.blob();
            const file = new File([blob], "profile-picture.jpg", { type: "image/jpeg" });
            formDataObj.append("profilePicture", file);
        }

        // Send request to backend
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            body: formDataObj,
        });

        const data = await response.json();

        if (data.success) {
            // Store token in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userType", data.userType);
            localStorage.setItem("userId", data.userId);

            // Redirect to provider console
            window.location.href = "/dashboard/supporter/profile";
          } else {
            // Show error message
            alert(data.message || "Registration failed");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen ${themeClass} flex flex-col`}>
      {/* Navigation */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />


      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative py-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
            opacity: "0.2",
          }}
        ></div>

        {/* Auth Form Container with auto height based on content */}
        <div className={`${themeClass} p-6 rounded-lg shadow-2xl shadow-gray-500/40 w-full max-w-2xl sm:max-w-3xl relative z-10`}>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Logo" width={90} height={90} />
          </div>

          {/* Form Title */}
          <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-6`}>
            Create Your Yalla Fan ID Account
          </h2>

          {/* Profile Photo Upload */}


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
                name="typeUser"
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

            {/* Country of Origin */}
            <div className="relative">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Country of Origin
              </label>
              <select
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
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

            {/* Submit Button */}
            <button
              type="submit"
              className={`mt-6 w-full rounded-md bg-gradient-to-r from-green-700 to-red-700 py-3 px-4 border border-transparent text-center text-sm font-medium text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none ${!passwordMatch ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={!passwordMatch}
            >
              Create Account
            </button>
          </form>

          {/* Already have an account */}
          <div className="mt-4 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <Link href="/auth/supporter/login" className="text-green-700 hover:text-green-600 font-semibold">
                Login
              </Link>
            </p>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={() =>
              signIn("google", { callbackUrl: window.location.href })
            }
            className={`w-full flex items-center justify-center space-x-3 py-3 rounded-md mt-4 transition border ${isDarkMode ? "border-gray-700 text-white" : "border-gray-200 text-black"
              }`}
          >
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />

    </div>
  );
}