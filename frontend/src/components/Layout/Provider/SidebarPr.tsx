import React, { JSX, useState } from "react";
import { ChevronDown, ChevronUp, Home, Utensils, Hotel, Bus, Coffee, Bed, MapPin, Key, LogOut, LogIn, User } from "lucide-react";
import Link from 'next/link';

// Définition des types pour les props
interface SidebarProps {
  isDarkMode: boolean;
  firstName: string;
  lastName: string;
  isLoggedIn?: boolean;
  onCategoryClick?: () => void;
}

export default function SidebarPr({ isDarkMode, firstName, lastName, isLoggedIn = true, onCategoryClick }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const hoverClass = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  
  // Définition du type pour les catégories
  interface SubCategory {
    id: string;
    name: string;
    icon: JSX.Element;
  }
  
  interface Category {
    id: string;
    name: string;
    icon: JSX.Element;
    subCategories: SubCategory[];
  }
  
  const categories: Category[] = [
    {
      id: 'transport',
      name: 'Transport',
      icon: <Bus size={20} />,
      subCategories: [
        { id: 'bus', name: 'Bus', icon: <Bus size={16} /> },
        { id: 'taxi', name: 'Taxi', icon: <MapPin size={16} /> },
        { id: 'metro', name: 'Metro', icon: <MapPin size={16} /> },
      ]
    },
    {
      id: 'restauration',
      name: 'Restauration',
      icon: <Utensils size={20} />,
      subCategories: [
        { id: 'restaurants', name: 'Restaurants', icon: <Utensils size={16} /> },
        { id: 'cafes', name: 'Cafés', icon: <Coffee size={16} /> },
        { id: 'fastfood', name: 'Fast Food', icon: <Coffee size={16} /> },
      ]
    },
    {
      id: 'hebergement',
      name: 'Hébergement',
      icon: <Hotel size={20} />,
      subCategories: [
        { id: 'hotels', name: 'Hôtels', icon: <Hotel size={16} /> },
        { id: 'appartements', name: 'Appartements', icon: <Key size={16} /> },
        { id: 'auberges', name: 'Auberges', icon: <Bed size={16} /> },
      ]
    },
  ];

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
    
    // Hide sidebar when clicking on a category
    if (onCategoryClick) {
      onCategoryClick();
    }
  };
  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
  const inputBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";

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

        window.location.href = "/auth/login";
      } else {
        setErrorMessage(data.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setErrorMessage("An error occurred during logout. Please try again.");
    }
  };

  return (
<div className={`w-64 pt-16 px-8 pb-8 fixed top-16 left-0 bottom-0 overflow-y-auto ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-700 border-gray-200'} border-r shadow-lg`}>{/* Navigation */}
      <div className="flex-grow py-4">
        <Link href="/">
          <div 
            className={`flex items-center px-4 py-3 mb-2 ${hoverClass} cursor-pointer`}
            onClick={onCategoryClick}
          >
            <Home size={20} className="mr-3" />
            <span>Accueil</span>
          </div>
        </Link>
        
        {/* Categories with dropdowns */}
        {categories.map((category) => (
          <div key={category.id} className="mb-1">
            <div 
              className={`flex items-center justify-between px-4 py-3 ${hoverClass} cursor-pointer`}
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                {category.icon}
                <span className="ml-3">{category.name}</span>
              </div>
              {expandedCategory === category.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            
            {/* Subcategories */}
            {expandedCategory === category.id && (
              <div className={`pl-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {category.subCategories.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    className={`flex items-center px-4 py-2 ${hoverClass} cursor-pointer`}
                    onClick={onCategoryClick}
                  >
                    {subCategory.icon}
                    <span className="ml-2 text-sm">{subCategory.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Login/Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {isLoggedIn ? (
 <button
 onClick={handleLogout}
 className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors mt-4"
>
 <LogOut size={16} />
 <span>Déconnexion</span>
</button>
        ) : (
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors">
            <LogIn size={16} />
            <span>Connexion</span>
          </button>
        )}
      </div>
    </div>
  );
}