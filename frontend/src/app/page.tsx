"use client";

import { useState, useEffect } from "react";
// import { FormEvent } from "react";
import NavBar from "@/components/loading page/navBar";
import Hero from "@/components/loading page/hero";
import Services from "@/components/loading page/services";
import AppSteps from "@/components/loading page/appSteps";
import Cta from "@/components/loading page/cta";
import Help from "@/components/loading page/help";
import Footer from "@/components/loading page/footer";
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

  return (
    <div className={`min-h-screen ${themeClass}`}>
      {/* Navigation */}
      <NavBar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        themeClass={`${themeClass}`}
      />

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
