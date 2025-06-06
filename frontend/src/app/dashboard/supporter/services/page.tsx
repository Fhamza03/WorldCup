"use client";

import { useState } from 'react';
import ServicesPage from '@/components/dashboard/services/supporter/services/page';
import Header from '@/components/dashboard/profile/supporter/header';
import Footer from "@/components/auth/footer";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";

  return (
    <div className={`min-h-screen ${themeClass}`}>
      <div className="min-h-screen flex flex-col">
        <Header
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          profilePhoto={profilePhoto}
        />
        <main className="flex-grow">
          <ServicesPage />
        </main>
        <Footer />
      </div>
    </div>
  );
}