"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Menu, X, Upload, Camera } from "lucide-react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from 'next/link';

export default function SignUpForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    typeUser: "supporter",
    firstName: "",
    lastName: "",
    birthDate: "",
    countryOfOrigin: "",
    nationalId: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState(true);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Créer l'objet avec toutes les données
    const userData = {
      ...formData,
      profilePhotoId: profilePhoto // Normalement, vous enverriez l'image au serveur et stockeriez une référence
    };

    console.log("Signup form submitted", userData);
    // Logique d'inscription avec toutes les données
  };

  // Liste des pays (exemple simplifié)
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
                <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
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
                value={formData.typeUser}
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
              <Link href="/auth/login" className="text-green-700 hover:text-green-600 font-semibold">
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