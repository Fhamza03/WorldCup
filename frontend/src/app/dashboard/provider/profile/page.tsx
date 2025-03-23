"use client";

import { useState, useEffect } from "react";
import ProviderProfile from "@/components/dashboard/profile/provider/profile";
import ProtectedRoute from "@/components/route/ProtectedRoute";
const ProviderConsoleProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    
    // Hide sidebar by default on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 relative">
        {/* Sidebar - always visible on desktop, conditionally on mobile */}
          
        
        {/* Main content area */}
        <div className="flex-grow">
    <ProtectedRoute>
      <ProviderProfile />
      </ProtectedRoute>
        </div>
      </div>
    </div>
  );
};

export default ProviderConsoleProfilePage;