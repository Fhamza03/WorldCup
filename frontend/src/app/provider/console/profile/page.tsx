"use client";

import { useState, useEffect } from "react";
import ProviderProfile from "@/components/Provider/ProviderProfile";
import SidebarPr from "@/components/Layout/Provider/SidebarPr";
import ProtectedRoute from "@/route/ProtectedRoute";
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
        <div className={`${showSidebar ? 'fixed inset-y-0 left-0 z-40 transform translate-x-0' : 'fixed inset-y-0 left-0 z-40 transform -translate-x-full'} md:relative md:transform-none transition-transform duration-300 ease-in-out`}>
          <SidebarPr 
            isDarkMode={isDarkMode} 
            firstName="John" 
            lastName="Doe"
            onCategoryClick={() => {
              if (window.innerWidth < 768) {
                setShowSidebar(false);
              }
            }}
          />
        </div>
        
        {/* Overlay to close sidebar on mobile */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
            onClick={() => setShowSidebar(false)}
          ></div>
        )}
        
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