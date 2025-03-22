"use client";

import { useState, useEffect } from "react";
// import { FormEvent } from "react";
import Header from "@/components/landing page/provider/header";
import Hero from "@/components/landing page/provider/hero";
import Services from "@/components/landing page/provider/services";
import AppSteps from "@/components/landing page/provider/appSteps";

import Help from "@/components/landing page/provider/help";
import Footer from "@/components/landing page/shared/footer";
import Cta from "@/components/landing page/provider/cta";
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [isSignup, setIsSignup] = useState(false); // État pour gérer si c'est Login ou Signup
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // État pour la validation des mots de passe
  // const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const themeClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-700";

  // // Fonction pour vérifier si les mots de passe correspondent
  // const validatePasswords = () => {
  //   if (confirmPassword !== password) {
  //     setPasswordMatch(false);
  //   } else {
  //     setPasswordMatch(true);
  //   }
  // };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // Logique de connexion
  // };
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen ${themeClass}`}>
      
      {/* Navigation */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />


      {/* Hero Section */}
      <Hero themeClass={`${themeClass}`} />

      {/* Services Section */}
      <Services themeClass={`${themeClass}`} />

      {/* Application Steps */}
      <AppSteps themeClass={`${themeClass}`} />

      {/* CTA Section */}
      <Cta themeClass={`${themeClass}`} />

      {/* Help Section */}
      <Help themeClass={`${themeClass}`} />

      {/* Footer */}
      <Footer themeClass={`${themeClass}`} />
    </div>
  );
}