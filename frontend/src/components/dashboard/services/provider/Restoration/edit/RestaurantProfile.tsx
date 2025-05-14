"use client";

import { useState, useEffect } from "react";
import {
    Edit, Save, Trash2, Star, DollarSign, Clock, MapPin, ChevronUp, ChevronDown
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/auth/provider/header";
import Footer from "@/components/auth/footer";
import Sidebar from "@/components/dashboard/layout/sidebar";
import axios from "axios";

interface Features {
    delivery: boolean;
    takeaway: boolean;
    dineIn: boolean;
    outdoor: boolean;
    parking: boolean;
    wifi: boolean;
}

interface Supplement {
    id: number;
    name: string;
    price: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string | null;
    isAvailable: boolean;
    hasSupplements: boolean;
    supplements: Supplement[];
}

interface Menu {
    id: number;
    name: string;
    description: string;
    orderNumber: number;
    products: Product[];
}

interface Restaurant {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    cuisine: string;
    email: string;
    website: string;
    features: Features;
    rating: number;
    // Changed this to match backend structure
    openingHours: Record<string, string>;
}

interface ApiRestaurantResponse {
    id: number;
    name: string;
    description: string;
    address: string;
    contactPhone?: string;
    cuisineType?: string;
    email: string;
    isPartner?: boolean;
    openingHours?: Record<string, string>;
    website?: string;
    features?: Features;
    rating?: number;
    menus: ApiMenu[];
}

interface ApiMenu {
    id: number;
    name: string;
    description: string;
    isSpecialOffer?: boolean;
    originalPrice?: number;
    discountedPrice?: number;
    orderNumber?: number;
    products: ApiProduct[];
}

interface ApiProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    isAvailable?: boolean;
    image?: string | null;
}

export default function RestaurantProfile() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openingHoursDisplay, setOpeningHoursDisplay] = useState<string>("");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setIsDarkMode(savedTheme === "dark");

        const providerId = localStorage.getItem("userId");
        if (!providerId) {
            setError("Provider ID not found in localStorage.");
            setIsLoading(false);
            return;
        }

        axios.get<ApiRestaurantResponse>(`http://localhost:8083/api/restaurants/provider/${providerId}/details`)
            .then(response => {
                const apiData = response.data;

                // Handle opening hours as object instead of string
                let openingHoursObj: Record<string, string> = {};
                let displayHours = "";
                
                if (apiData.openingHours) {
                    if (typeof apiData.openingHours === "object") {
                        openingHoursObj = apiData.openingHours;
                        displayHours = Object.entries(apiData.openingHours)
                            .map(([day, hour]) => `${day}: ${hour}`)
                            .join(", ");
                    } else if (typeof apiData.openingHours === "string") {
                        // Try to parse the string if it's in a format we can handle
                        displayHours = apiData.openingHours;
                        // Attempt to convert from string format back to object if needed
                        try {
                            const pairs = apiData.openingHours.split(", ");
                            pairs.forEach(pair => {
                                const [day, hours] = pair.split(": ");
                                if (day && hours) {
                                    openingHoursObj[day] = hours;
                                }
                            });
                        } catch (e) {
                            console.error("Could not parse opening hours:", e);
                        }
                    }
                }

                setOpeningHoursDisplay(displayHours);

                const formattedMenus: Menu[] = apiData.menus.map(menu => ({
                    id: menu.id,
                    name: menu.name,
                    description: menu.description,
                    orderNumber: menu.orderNumber || 0,
                    products: menu.products.map(product => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        image: product.image || null,
                        isAvailable: product.isAvailable ?? true,
                        hasSupplements: false,
                        supplements: []
                    }))
                }));

                setRestaurantData({
                    id: apiData.id,
                    name: apiData.name,
                    description: apiData.description,
                    address: apiData.address,
                    phone: apiData.contactPhone || "",
                    cuisine: apiData.cuisineType || "",
                    email: apiData.email,
                    openingHours: openingHoursObj,
                    website: apiData.website || "",
                    features: apiData.features || {
                        delivery: false,
                        takeaway: false,
                        dineIn: false,
                        outdoor: false,
                        parking: false,
                        wifi: false
                    },
                    rating: apiData.rating || 0
                });

                setMenus(formattedMenus);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch restaurant:", err);
                setError("Could not load restaurant data.");
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (field: keyof Restaurant, value: string) => {
        if (!restaurantData) return;
        
        // Special handling for fields that need specific formatting
        if (field === "openingHours") {
            setOpeningHoursDisplay(value);
            // We don't update the actual openingHours object here
            // That will be handled in saveChanges
            return;
        }
        
        setRestaurantData({ ...restaurantData, [field]: value });
    };

    const handleMenuChange = (menuId: number, field: keyof Menu, value: string) => {
        setMenus(menus.map(menu => menu.id === menuId ? { ...menu, [field]: value } : menu));
    };

    const handleProductChange = (menuId: number, productId: number, field: keyof Product, value: string | number) => {
        setMenus(menus.map(menu =>
            menu.id === menuId ? {
                ...menu,
                products: menu.products.map(product =>
                    product.id === productId ? { ...product, [field]: value } : product
                )
            } : menu
        ));
    };

    const parseOpeningHoursToObject = (displayStr: string): Record<string, string> => {
        const result: Record<string, string> = {};
        try {
            const pairs = displayStr.split(", ");
            pairs.forEach(pair => {
                const [day, hours] = pair.split(": ");
                if (day && hours) {
                    result[day] = hours;
                }
            });
        } catch (e) {
            console.error("Could not parse opening hours:", e);
        }
        return result;
    };

    const saveChanges = async () => {
        if (!restaurantData) return;
        
        try {
            // Prepare data for saving
            const dataToSave = {
                ...restaurantData,
                // Convert back from display format to object format
                contactPhone: restaurantData.phone,
                cuisineType: restaurantData.cuisine,
                // Handle opening hours specifically to ensure proper format
                openingHours: parseOpeningHoursToObject(openingHoursDisplay)
            };
            
            await axios.put(`http://localhost:8083/api/restaurants/${restaurantData.id}`, dataToSave);
            
            // Now update opening hours separately since it has a dedicated endpoint
            await axios.put(
                `http://localhost:8083/api/restaurants/${restaurantData.id}/opening-hours`, 
                dataToSave.openingHours
            );
            
            setIsEditing(false);
            alert("Modifications enregistrées avec succès.");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement des modifications.");
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white text-gray-700">
            <div className="min-h-screen flex">
                <div className="flex-1 pb-16">
                    <Header isDarkMode={isDarkMode} toggleTheme={() => {
                        const newMode = !isDarkMode;
                        setIsDarkMode(newMode);
                        localStorage.setItem("theme", newMode ? "dark" : "light");
                    }} />

                    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold">Restaurant Profile</h1>
                            <button
                                onClick={() => isEditing ? saveChanges() : setIsEditing(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {isEditing ? <Save size={18} /> : <Edit size={18} />}
                                {isEditing ? "Sauvegarder" : "Modifier"}
                            </button>
                        </div>

                        {restaurantData && (
                            <div className="p-6 rounded-lg shadow border bg-gray-50 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Handle special fields */}
                                    <div>
                                        <label className="block font-medium mb-1">Name</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="text"
                                            value={restaurantData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Description</label>
                                        <textarea
                                            className="w-full border rounded p-2"
                                            value={restaurantData.description}
                                            onChange={(e) => handleInputChange("description", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Address</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="text"
                                            value={restaurantData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Phone</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="text"
                                            value={restaurantData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Cuisine</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="text"
                                            value={restaurantData.cuisine}
                                            onChange={(e) => handleInputChange("cuisine", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Email</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="email"
                                            value={restaurantData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Website</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="text"
                                            value={restaurantData.website}
                                            onChange={(e) => handleInputChange("website", e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Opening Hours</label>
                                        <input
                                            className="w-full border rounded p-2"
                                            type="text"
                                            value={openingHoursDisplay}
                                            onChange={(e) => handleInputChange("openingHours", e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Format: DAY: hours, DAY: hours (e.g. MONDAY: 9-17, TUESDAY: 9-17)"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 className="text-xl font-bold mb-4">Menus</h3>
                            {menus.map(menu => (
                                <div key={menu.id} className="p-4 mb-6 border rounded shadow bg-gray-50">
                                    <input
                                        className="font-semibold text-lg w-full mb-2 border-b p-1"
                                        value={menu.name}
                                        onChange={e => handleMenuChange(menu.id, "name", e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    <textarea
                                        className="w-full border p-2 rounded mb-3"
                                        value={menu.description}
                                        onChange={e => handleMenuChange(menu.id, "description", e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    <ul className="space-y-2">
                                        {menu.products.map(product => (
                                            <li key={product.id} className="border rounded p-2">
                                                <input
                                                    type="text"
                                                    value={product.name}
                                                    onChange={e => handleProductChange(menu.id, product.id, "name", e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full font-medium mb-1 border-b"
                                                />
                                                <textarea
                                                    className="w-full border rounded p-1 mb-1"
                                                    value={product.description}
                                                    onChange={e => handleProductChange(menu.id, product.id, "description", e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                                <input
                                                    type="number"
                                                    value={product.price}
                                                    onChange={e => handleProductChange(menu.id, product.id, "price", parseFloat(e.target.value))}
                                                    disabled={!isEditing}
                                                    className="w-full border rounded p-1"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}