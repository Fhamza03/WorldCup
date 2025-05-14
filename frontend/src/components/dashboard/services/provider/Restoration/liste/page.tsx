"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Clock, ChevronLeft, Building, AlertCircle, Edit, Trash, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Header from "@/components/dashboard/profile/provider/header";
import Footer from "@/components/auth/footer";
import axios from "axios";
import Swal from "sweetalert2";

interface Restaurant {
    id: number;
    name: string;
    description: string;
    cuisineType: string;
    location: string;
    address: string;
    contactPhone: string;
    email: string;
    isPartner: boolean;
    openingHours?: Record<string, string>;
    image?: string;
}

export default function ProviderRestaurants() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");

    useEffect(() => {
        // Get providerId from localStorage
        const providerId = localStorage.getItem("userId");
        if (providerId) {
            fetchRestaurants(parseInt(providerId));
        } else {
            setError("Provider ID not found. Please log in again.");
            setIsLoading(false);
        }
    }, []);

    const fetchRestaurants = async (providerId: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8083/api/restaurants/provider/${providerId}`);
            setRestaurants(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError("Failed to load restaurants. Please try again later.");
            setIsLoading(false);
        }
    };

    const confirmDeleteRestaurant = (id: number, name: string) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: `Voulez-vous vraiment supprimer le restaurant "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteRestaurant(id);
            }
        });
    };

    const handleDeleteRestaurant = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8083/api/restaurants/${id}`);
            // Remove the deleted restaurant from the state
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
            
            // Show success message
            Swal.fire({
                title: 'Supprimé!',
                text: 'Le restaurant a été supprimé avec succès.',
                icon: 'success',
                confirmButtonColor: '#10b981'
            });
        } catch (err) {
            console.error("Error deleting restaurant:", err);
            
            // Show error message
            Swal.fire({
                title: 'Erreur!',
                text: 'Impossible de supprimer le restaurant. Veuillez réessayer.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisineType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatOpeningHours = (openingHours?: Record<string, string>) => {
        if (!openingHours || Object.keys(openingHours).length === 0) {
            return "Hours not specified";
        }
        
        // Just return the first day's hours for the card preview
        const firstDay = Object.keys(openingHours)[0];
        return `${firstDay}: ${openingHours[firstDay]}`;
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex flex-col">
                <Header
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    profilePhoto={profilePhoto}
                />
                <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
                    <div className="flex justify-between items-center">
                        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            My Restaurants
                        </h1>
                        <div className="flex space-x-2">
                            <Link href="/dashboard/provider/profile">
                                <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                    <ChevronLeft size={18} className="mr-1" />
                                    Back to Profile
                                </button>
                            </Link>
                            <Link href="/dashboard/provider/services/Restoration">
                                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                    <Plus size={18} className="mr-1" />
                                    Add Restaurant
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <div className="pl-3">
                            <Search size={20} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by restaurant name, cuisine type or location..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={`w-full px-3 py-3 ${cardBgClass} focus:outline-none`}
                        />
                    </div>

                    {/* Restaurants List */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-center">
                            <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                            <p className="text-red-500 text-lg">{error}</p>
                        </div>
                    ) : filteredRestaurants.length === 0 ? (
                        <div className="p-6 text-center">
                            <Building size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-xl font-medium">No restaurants found</p>
                            <p className="text-gray-500 mt-2">You haven't created any restaurants yet, or your search returned no results.</p>
                            <Link href="/dashboard/provider/services/Restoration">
                                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                    Create Restaurant
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {filteredRestaurants.map((restaurant) => (
                                <div key={restaurant.id} className={`border ${borderClass} rounded-lg overflow-hidden shadow-md`}>
                                    <div className="h-40 bg-gray-300 relative">
                                        {restaurant.image ? (
                                            <img
                                                src={restaurant.image}
                                                alt={restaurant.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src="/logo.png"
                                                alt="Restaurant Logo"
                                                className="w-full h-full object-contain p-4"
                                            />
                                        )}
                                        <div className={`absolute top-2 right-2 ${restaurant.isPartner ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} px-2 py-1 rounded-full text-xs font-medium`}>
                                            {restaurant.isPartner ? "Partner" : "Non-Partner"}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                                        <p className="text-gray-500 mb-2 line-clamp-2">{restaurant.description}</p>
                                        
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MapPin size={16} className="mr-1" />
                                            <span>{restaurant.location} - {restaurant.address}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock size={16} className="mr-1" />
                                            <span>{formatOpeningHours(restaurant.openingHours)}</span>
                                        </div>
                                        
                                        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                {restaurant.cuisineType}
                                            </span>
                                            <div className="flex space-x-2">
                                                <Link href={`/dashboard/provider/services/Restoration/commandes/${restaurant.id}`}>
                                                    <button className="p-1 text-amber-600 hover:text-amber-800" title="View Orders">
                                                        <ShoppingBag size={18} />
                                                    </button>
                                                </Link>
                                                <Link href={`http://localhost:3000/dashboard/provider/services/Restoration/edit/${restaurant.id}`}>
                                                    <button className="p-1 text-blue-600 hover:text-blue-800">
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>
                                                <button 
                                                    onClick={() => confirmDeleteRestaurant(restaurant.id, restaurant.name)}
                                                    className="p-1 text-red-600 hover:text-red-800"
                                                >
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
}