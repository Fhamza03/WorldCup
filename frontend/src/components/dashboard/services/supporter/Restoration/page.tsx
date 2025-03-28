"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
    Search, Map, Filter, Coffee, MapPin, Star, Clock, ArrowRight,
    ChevronDown, Check, X, Sun, Moon, Menu as MenuIcon
} from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "@/components/auth/provider/header";
import Footer from "@/components/auth/footer";
import Sidebar from "@/components/dashboard/layout/sidebar";

interface Restaurant {
    id: number;
    name: string;
    description: string;
    image: string;
    cuisine: string;
    address: string;
    rating: number;
    openingHours: string;
    deliveryTime: string;
    minOrder: number;
    features: {
        delivery: boolean;
        takeaway: boolean;
        dineIn: boolean;
        outdoor: boolean;
        parking: boolean;
        wifi: boolean;
    };
}

export default function RestaurantBrowse() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    
    // Filters
    const [cuisineFilter, setCuisineFilter] = useState<string[]>([]);
    const [featuresFilter, setFeaturesFilter] = useState({
        delivery: false,
        takeaway: false,
        dineIn: false,
        outdoor: false,
        parking: false,
        wifi: false,
    });
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }

        // Fetch restaurant data
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        setIsLoading(true);
        
        try {
            // Simulate API call with dummy data
            setTimeout(() => {
                const dummyRestaurants: Restaurant[] = [
                    {
                        id: 1,
                        name: "Le Parisien Bistro",
                        description: "Authentic French cuisine in a cozy atmosphere with traditional dishes made with fresh ingredients.",
                        image: "/logo.png",
                        cuisine: "French",
                        address: "123 Main Street, Paris, France",
                        rating: 4.7,
                        openingHours: "Mon-Fri: 11AM-10PM, Sat-Sun: 10AM-11PM",
                        deliveryTime: "25-35 min",
                        minOrder: 15,
                        features: {
                            delivery: true,
                            takeaway: true,
                            dineIn: true,
                            outdoor: true,
                            parking: false,
                            wifi: true,
                        }
                    },
                    {
                        id: 2,
                        name: "Milano Pizza",
                        description: "Authentic Italian pizzas baked in a wood-fired oven using traditional recipes and premium ingredients.",
                        image: "/logo.png",
                        cuisine: "Italian",
                        address: "456 Pizza Avenue, Milan, Italy",
                        rating: 4.5,
                        openingHours: "Daily: 11AM-11PM",
                        deliveryTime: "20-30 min",
                        minOrder: 12,
                        features: {
                            delivery: true,
                            takeaway: true,
                            dineIn: true,
                            outdoor: false,
                            parking: true,
                            wifi: true,
                        }
                    },
                    {
                        id: 3,
                        name: "Tokyo Sushi Bar",
                        description: "Fresh and premium quality sushi prepared by experienced Japanese chefs using traditional techniques.",
                        image: "/logo.png",
                        cuisine: "Japanese",
                        address: "789 Sushi Street, Tokyo, Japan",
                        rating: 4.8,
                        openingHours: "Mon-Sat: 12PM-10PM, Sun: Closed",
                        deliveryTime: "30-40 min",
                        minOrder: 20,
                        features: {
                            delivery: true,
                            takeaway: true,
                            dineIn: true,
                            outdoor: false,
                            parking: false,
                            wifi: false,
                        }
                    },
                    {
                        id: 4,
                        name: "Taj Mahal Indian Restaurant",
                        description: "Authentic Indian cuisine featuring flavorful curries, tandoori specialties, and freshly baked naan.",
                        image: "/logo.png",
                        cuisine: "Indian",
                        address: "101 Curry Lane, New Delhi, India",
                        rating: 4.6,
                        openingHours: "Daily: 11:30AM-10:30PM",
                        deliveryTime: "25-35 min",
                        minOrder: 18,
                        features: {
                            delivery: true,
                            takeaway: true,
                            dineIn: true,
                            outdoor: true,
                            parking: true,
                            wifi: true,
                        }
                    },
                    {
                        id: 5,
                        name: "El Mariachi Mexican Grill",
                        description: "Vibrant Mexican restaurant offering tacos, burritos, enchiladas and more with authentic flavors.",
                        image: "/logo.png",
                        cuisine: "Mexican",
                        address: "222 Taco Street, Mexico City, Mexico",
                        rating: 4.3,
                        openingHours: "Tue-Sun: 12PM-11PM, Mon: Closed",
                        deliveryTime: "20-30 min",
                        minOrder: 15,
                        features: {
                            delivery: true,
                            takeaway: true,
                            dineIn: true,
                            outdoor: true,
                            parking: false,
                            wifi: true,
                        }
                    }
                ];
                
                setRestaurants(dummyRestaurants);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            setError("Failed to load restaurants. Please try again later.");
            setIsLoading(false);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleCuisineFilter = (cuisine: string) => {
        if (cuisineFilter.includes(cuisine)) {
            setCuisineFilter(cuisineFilter.filter(c => c !== cuisine));
        } else {
            setCuisineFilter([...cuisineFilter, cuisine]);
        }
    };

    const toggleFeatureFilter = (feature: keyof typeof featuresFilter) => {
        setFeaturesFilter({
            ...featuresFilter,
            [feature]: !featuresFilter[feature]
        });
    };

    const setRating = (rating: number) => {
        if (ratingFilter === rating) {
            setRatingFilter(null);
        } else {
            setRatingFilter(rating);
        }
    };

    const resetFilters = () => {
        setCuisineFilter([]);
        setFeaturesFilter({
            delivery: false,
            takeaway: false,
            dineIn: false,
            outdoor: false,
            parking: false,
            wifi: false
        });
        setRatingFilter(null);
    };

    const filteredRestaurants = restaurants.filter(restaurant => {
        // Search term filter
        if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        
        // Cuisine filter
        if (cuisineFilter.length > 0 && !cuisineFilter.includes(restaurant.cuisine)) {
            return false;
        }
        
        // Features filter
        for (const [key, value] of Object.entries(featuresFilter)) {
            if (value && !restaurant.features[key as keyof typeof restaurant.features]) {
                return false;
            }
        }
        
        // Rating filter
        if (ratingFilter !== null && restaurant.rating < ratingFilter) {
            return false;
        }
        
        return true;
    });

    const cuisines = [...new Set(restaurants.map(r => r.cuisine))];

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const inputBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex">
                <Sidebar />

                <div className="flex-1 pb-16">
                    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    
                    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Find Restaurants
                        </h1>

                        {/* Search and Filter Section */}
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-2/3">
                                <div className={`flex items-center border ${borderClass} rounded-lg overflow-hidden`}>
                                    <div className="pl-3">
                                        <Search size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search for restaurants..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className={`w-full px-3 py-3 ${inputBgClass} focus:outline-none`}
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center justify-center px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                            >
                                <Filter size={20} className="mr-2" />
                                Filters
                                <ChevronDown size={16} className="ml-2" />
                            </button>
                        </div>
                        
                        {/* Filters Panel */}
                        {isFilterOpen && (
                            <div className={`p-6 ${cardBgClass} border ${borderClass} rounded-lg shadow-md`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium">Filter Options</h3>
                                    <button
                                        onClick={resetFilters}
                                        className="text-sm text-blue-500 hover:text-blue-600"
                                    >
                                        Reset All
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Cuisine Filter */}
                                    <div>
                                        <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Cuisine</h4>
                                        <div className="space-y-2">
                                            {cuisines.map(cuisine => (
                                                <div key={cuisine} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`cuisine-${cuisine}`}
                                                        checked={cuisineFilter.includes(cuisine)}
                                                        onChange={() => toggleCuisineFilter(cuisine)}
                                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                    />
                                                    <label
                                                        htmlFor={`cuisine-${cuisine}`}
                                                        className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                    >
                                                        {cuisine}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Features Filter */}
                                    <div>
                                        <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Features</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="feature-delivery"
                                                    checked={featuresFilter.delivery}
                                                    onChange={() => toggleFeatureFilter('delivery')}
                                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="feature-delivery"
                                                    className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                >
                                                    Delivery
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="feature-takeaway"
                                                    checked={featuresFilter.takeaway}
                                                    onChange={() => toggleFeatureFilter('takeaway')}
                                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="feature-takeaway"
                                                    className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                >
                                                    Takeaway
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="feature-dineIn"
                                                    checked={featuresFilter.dineIn}
                                                    onChange={() => toggleFeatureFilter('dineIn')}
                                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="feature-dineIn"
                                                    className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                >
                                                    Dine-in
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="feature-outdoor"
                                                    checked={featuresFilter.outdoor}
                                                    onChange={() => toggleFeatureFilter('outdoor')}
                                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="feature-outdoor"
                                                    className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                >
                                                    Outdoor Seating
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Rating Filter */}
                                    <div>
                                        <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Minimum Rating</h4>
                                        <div className="space-y-2">
                                            {[3, 3.5, 4, 4.5].map(rating => (
                                                <div key={rating} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`rating-${rating}`}
                                                        name="rating"
                                                        checked={ratingFilter === rating}
                                                        onChange={() => setRating(rating)}
                                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                                    />
                                                    <label
                                                        htmlFor={`rating-${rating}`}
                                                        className={`ml-2 flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                    >
                                                        {rating}+ <Star size={14} className="ml-1 text-yellow-400 fill-current" />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Results Section */}
                        <div className="mt-8">
                            <div className="mb-4 flex justify-between items-center">
                                <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {filteredRestaurants.length} Restaurants
                                </h2>
                            </div>
                            
                            {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                                </div>
                            ) : error ? (
                                <div className="p-6 text-center">
                                    <p className="text-red-500">{error}</p>
                                    <button
                                        onClick={fetchRestaurants}
                                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : filteredRestaurants.length === 0 ? (
                                <div className={`p-8 ${cardBgClass} border ${borderClass} rounded-lg text-center`}>
                                    <Coffee size={48} className="mx-auto mb-4 text-gray-400" />
                                    <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>No restaurants found</p>
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Try adjusting your filters or search term</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredRestaurants.map(restaurant => (
                                        <div key={restaurant.id} className={`${cardBgClass} border ${borderClass} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
                                            <div className="relative h-48">
                                                <img 
                                                    src="/logo.png" 
                                                    alt={restaurant.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 right-2 bg-transparent px-2 py-1 rounded-md flex items-center">
                                                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                                    <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                                        {restaurant.cuisine}
                                                    </span>
                                                </div>
                                                
                                                <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {restaurant.description}
                                                </p>
                                                
                                                <div className="flex items-start space-x-1 text-sm mb-3">
                                                    <MapPin size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`} />
                                                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{restaurant.address}</span>
                                                </div>
                                                
                                                <div className="flex items-center space-x-1 text-sm mb-4">
                                                    <Clock size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Delivery: {restaurant.deliveryTime}</span>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {restaurant.features.delivery && (
                                                        <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'}`}>
                                                            Delivery
                                                        </span>
                                                    )}
                                                    {restaurant.features.takeaway && (
                                                        <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-amber-800 text-amber-200' : 'bg-amber-100 text-amber-800'}`}>
                                                            Takeaway
                                                        </span>
                                                    )}
                                                    {restaurant.features.outdoor && (
                                                        <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-teal-800 text-teal-200' : 'bg-teal-100 text-teal-800'}`}>
                                                            Outdoor
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <Link href={`/order/${restaurant.id}`}>
                                                    <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                                                        Order Now
                                                        <ArrowRight size={16} className="ml-1" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}