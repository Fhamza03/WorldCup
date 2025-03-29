"use client";

import { useState, useEffect } from "react";
import Header from "@/components/landing page/supporter/header";
import Hero from "@/components/landing page/supporter/hero";
import Services from "@/components/landing page/supporter/services";
import AppSteps from "@/components/landing page/supporter/appSteps";

import Help from "@/components/landing page/supporter/help";
import Footer from "@/components/landing page/shared/footer";
import Cta from "@/components/landing page/supporter/cta";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
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
