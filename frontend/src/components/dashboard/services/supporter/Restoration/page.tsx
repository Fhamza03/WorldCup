"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
    Search, MapPin, Star, Clock, ArrowRight, ChevronDown, Filter,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/auth/provider/header";
import Footer from "@/components/auth/footer";
import Sidebar from "@/components/dashboard/layout/sidebar";
import axios from "axios";

interface Restaurant {
    id: number;
    name: string;
    description: string;
    image?: string;
    cuisineType: string;
    address: string;
    rating?: number;
    deliveryTime?: string;
}

interface Menu {
    id: number;
    name: string;
    description: string;
    products: Product[];
}

interface Product {
    id: number;
    name: string;
    price: number | null;
    description: string;
}

export default function RestaurantBrowse() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [menus, setMenus] = useState<{ [key: number]: Menu[] }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        setIsLoading(true);
        try {
            const restaurantResponse = await axios.get("http://localhost:8083/api/restaurants");
            const restaurantData: Restaurant[] = restaurantResponse.data;

            setRestaurants(restaurantData);

            // Fetch menus and products for each restaurant
            const menuPromises = restaurantData.map(async (restaurant) => {
                try {
                    const menuResponse = await axios.get(`http://localhost:8083/api/menus/restaurant/${restaurant.id}`);
                    const menus: Menu[] = menuResponse.data;

                    // Fetch products for each menu
                    const productPromises = menus.map(async (menu) => {
                        try {
                            const productResponse = await axios.get(`http://localhost:8083/api/products/menu/${menu.id}`);
                            menu.products = productResponse.data;
                            return menu;
                        } catch (err) {
                            console.error(`Error fetching products for menu ${menu.id}:`, err);
                            menu.products = []; // Set empty products if the API call fails
                            return menu;
                        }
                    });

                    const menusWithProducts = await Promise.all(productPromises);
                    return { restaurantId: restaurant.id, menus: menusWithProducts };
                } catch (err) {
                    console.error(`Error fetching menus for restaurant ${restaurant.id}:`, err);
                    return { restaurantId: restaurant.id, menus: [] }; // Set empty menus if the API call fails
                }
            });

            const menuData = await Promise.all(menuPromises);
            const menusByRestaurant: { [key: number]: Menu[] } = {};
            menuData.forEach(({ restaurantId, menus }) => {
                menusByRestaurant[restaurantId] = menus;
            });

            setMenus(menusByRestaurant);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError("Failed to load data. Please try again later.");
            setIsLoading(false);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex">

                <div className="flex-1 pb-16">
                    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

                    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Find Restaurants
                        </h1>

                        {/* Search Section */}
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <div className="pl-3">
                                <Search size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for restaurants..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className={`w-full px-3 py-3 ${cardBgClass} focus:outline-none`}
                            />
                        </div>

                        {/* Results Section */}
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                            </div>
                        ) : error ? (
                            <div className="p-6 text-center">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredRestaurants.map((restaurant) => (
                                    <div
                                        key={restaurant.id}
                                        className={`${cardBgClass} border ${borderClass} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
                                    >
                                        <div className="relative h-48">
                                            <img
                                                src={restaurant.image && restaurant.image.trim() !== "" ? restaurant.image : "/logo.png"}
                                                alt={restaurant.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-transparent px-2 py-1 rounded-md flex items-center">
                                                <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                                <span className="font-medium">{restaurant.rating?.toFixed(1) || "N/A"}</span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="font-bold text-lg">{restaurant.name}</h3>
                                            <p className="text-sm mb-3 line-clamp-2">{restaurant.description}</p>
                                            <div className="flex items-start space-x-1 text-sm mb-3">
                                                <MapPin size={16} className="text-gray-500 mt-0.5" />
                                                <span>{restaurant.address}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm mb-4">
                                                <Clock size={16} className="text-gray-500" />
                                                <span>Delivery: {restaurant.deliveryTime || "N/A"}</span>
                                            </div>

                                            {/* Menus */}
                                            {menus[restaurant.id]?.map((menu) => (
                                                <div key={menu.id} className="mt-4">
                                                    <h4 className="font-semibold">{menu.name}</h4>
                                                    <p className="text-sm">{menu.description}</p>

                                                    {/* Products */}
                                                    <div className="mt-2">
                                                        {menu.products.map((product) => (
                                                            <div key={product.id} className="ml-4">
                                                                <p>
                                                                    {product.name} - $
                                                                    {product.price !== null && product.price !== undefined
                                                                        ? product.price.toFixed(2)
                                                                        : "0.00"}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <Link href={`/dashboard/supporter/services/Restoration/order/${restaurant.id}`}>
                                                <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center mt-4">
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

            <Footer />
        </div>
    );
}