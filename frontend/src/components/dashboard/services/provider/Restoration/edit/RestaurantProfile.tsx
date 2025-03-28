"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
    Menu, X, Upload, Camera, Edit, User, Mail, Calendar, Save,
    Plus, Trash2, Star, DollarSign, Clock, MapPin, ChevronUp, ChevronDown, Eye
} from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "@/components/auth/provider/header";
import Footer from "@/components/auth/footer";
import Sidebar from "@/components/dashboard/layout/sidebar";

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

export default function RestaurantProfile() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Restaurant Form Data
    const [restaurantData, setRestaurantData] = useState({
        id: 1,
        name: "Le Parisien Bistro",
        description: "Authentic French cuisine in a cozy atmosphere. We serve traditional dishes made with fresh ingredients sourced locally.",
        address: "123 Main Street, Paris, France",
        phone: "+33 1 23 45 67 89",
        cuisine: "French",
        openingHours: "Mon-Fri: 11AM-10PM, Sat-Sun: 10AM-11PM",
        email: "contact@leparisien.com",
        website: "www.leparisien.com",
        features: {
            delivery: true,
            takeaway: true,
            dineIn: true,
            outdoor: true,
            parking: false,
            wifi: true,
        },
        rating: 4.7
    });

    // Menus Array
    const [menus, setMenus] = useState<Menu[]>([
        {
            id: 1,
            name: "Breakfast Menu",
            description: "Morning delights to start your day",
            orderNumber: 1,
            products: [
                {
                    id: 1,
                    name: "Classic Breakfast",
                    price: 12.99,
                    description: "Eggs, bacon, toast, and potatoes",
                    image: null,
                    hasSupplements: true,
                    supplements: [
                        { id: 1, name: "Extra Bacon", price: 2.5 },
                        { id: 2, name: "Add Cheese", price: 1.5 }
                    ]
                },
                {
                    id: 2,
                    name: "French Toast",
                    price: 9.99,
                    description: "Served with maple syrup and fresh berries",
                    image: null,
                    hasSupplements: false,
                    supplements: []
                }
            ]
        },
        {
            id: 2,
            name: "Lunch Menu",
            description: "Midday favorites for a perfect lunch",
            orderNumber: 2,
            products: [
                {
                    id: 1,
                    name: "Croque Monsieur",
                    price: 11.50,
                    description: "Classic French grilled ham and cheese sandwich",
                    image: null,
                    hasSupplements: true,
                    supplements: [
                        { id: 1, name: "Add Egg (Croque Madame)", price: 1.5 },
                        { id: 2, name: "Add Fries", price: 3.0 }
                    ]
                }
            ]
        }
    ]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }

        // Simulate fetching restaurant data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const handleLogout = async () => {
        try {
            // Logout API call would go here
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            localStorage.removeItem("userId");
            router.push("/auth/restaurant/login");
        } catch (error) {
            console.error("Error during logout:", error);
            setErrorMessage("An error occurred during logout. Please try again.");
        }
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const inputBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    const handleRestaurantChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (name.startsWith('features.')) {
            const featureName = name.split('.')[1];
            setRestaurantData(prev => ({
                ...prev,
                features: {
                    ...prev.features,
                    [featureName]: (e.target as HTMLInputElement).checked
                }
            }));
        } else {
            setRestaurantData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setProfilePhoto(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAddMenu = () => {
        const newMenuId = menus.length > 0 ? Math.max(...menus.map(menu => menu.id)) + 1 : 1;
        setMenus([...menus, {
            id: newMenuId,
            name: `New Menu ${newMenuId}`,
            description: "",
            orderNumber: menus.length + 1,
            products: []
        }]);
        setEditingMenuId(newMenuId);
    };

    const handleRemoveMenu = (menuId: number) => {
        setMenus(menus.filter(menu => menu.id !== menuId));
        if (editingMenuId === menuId) {
            setEditingMenuId(null);
        }
    };

    const handleMenuChange = (menuId: number, field: string, value: any) => {
        setMenus(menus.map(menu =>
            menu.id === menuId ? { ...menu, [field]: value } : menu
        ));
    };

    const handleAddProduct = (menuId: number) => {
        const targetMenu = menus.find(menu => menu.id === menuId);
        if (!targetMenu) return;

        const newProductId = targetMenu.products.length > 0
            ? Math.max(...targetMenu.products.map(product => product.id)) + 1
            : 1;

        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: [...menu.products, {
                        id: newProductId,
                        name: `New Product ${newProductId}`,
                        price: 0,
                        description: "",
                        image: null,
                        hasSupplements: false,
                        supplements: []
                    }]
                }
                : menu
        ));
        
        setEditingProductId(newProductId);
    };

    const handleRemoveProduct = (menuId: number, productId: number) => {
        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.filter(product => product.id !== productId)
                }
                : menu
        ));
        
        if (editingProductId === productId) {
            setEditingProductId(null);
        }
    };

    const handleProductChange = (menuId: number, productId: number, field: string, value: any) => {
        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.map(product =>
                        product.id === productId
                            ? { ...product, [field]: value }
                            : product
                    )
                }
                : menu
        ));
    };

    const handleAddSupplement = (menuId: number, productId: number) => {
        const targetMenu = menus.find(menu => menu.id === menuId);
        if (!targetMenu) return;

        const targetProduct = targetMenu.products.find(product => product.id === productId);
        if (!targetProduct) return;

        const newSupplementId = targetProduct.supplements.length > 0
            ? Math.max(...targetProduct.supplements.map(supp => supp.id)) + 1
            : 1;

        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.map(product =>
                        product.id === productId
                            ? {
                                ...product,
                                hasSupplements: true,
                                supplements: [...product.supplements, {
                                    id: newSupplementId,
                                    name: `New Supplement ${newSupplementId}`,
                                    price: 0
                                }]
                            }
                            : product
                    )
                }
                : menu
        ));
    };

    const handleRemoveSupplement = (menuId: number, productId: number, supplementId: number) => {
        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.map(product =>
                        product.id === productId
                            ? {
                                ...product,
                                supplements: product.supplements.filter(supp => supp.id !== supplementId)
                            }
                            : product
                    )
                }
                : menu
        ));
    };

    const handleSupplementChange = (menuId: number, productId: number, supplementId: number, field: string, value: any) => {
        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.map(product =>
                        product.id === productId
                            ? {
                                ...product,
                                supplements: product.supplements.map(supp =>
                                    supp.id === supplementId
                                        ? { ...supp, [field]: value }
                                        : supp
                                )
                            }
                            : product
                    )
                }
                : menu
        ));
    };

    const handleMoveMenu = (menuId: number, direction: 'up' | 'down') => {
        const menuIndex = menus.findIndex(menu => menu.id === menuId);
        if (menuIndex === -1) return;

        if (direction === 'up' && menuIndex > 0) {
            const newMenus = [...menus];
            [newMenus[menuIndex - 1], newMenus[menuIndex]] = [newMenus[menuIndex], newMenus[menuIndex - 1]];
            // Update order numbers
            newMenus.forEach((menu, idx) => {
                menu.orderNumber = idx + 1;
            });
            setMenus(newMenus);
        } else if (direction === 'down' && menuIndex < menus.length - 1) {
            const newMenus = [...menus];
            [newMenus[menuIndex], newMenus[menuIndex + 1]] = [newMenus[menuIndex + 1], newMenus[menuIndex]];
            // Update order numbers
            newMenus.forEach((menu, idx) => {
                menu.orderNumber = idx + 1;
            });
            setMenus(newMenus);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // Here you would submit the data to your backend
            console.log("Restaurant data:", restaurantData);
            console.log("Menus data:", menus);

            alert("Restaurant details successfully saved!");
            setIsEditing(false);
            setEditingMenuId(null);
            setEditingProductId(null);
        } catch (error) {
            console.error("Error saving restaurant data:", error);
            alert("Failed to save restaurant data. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className={`min-h-screen ${themeClass} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p>Loading restaurant data...</p>
                </div>
            </div>
        );
    }

    const renderRestaurantInfo = () => (
        <div className={`p-6 ${cardBgClass} border ${borderClass} rounded-lg shadow-md relative mb-6`}>
            <div className="absolute top-4 right-4">
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                    {isEditing ? <Save size={20} className="text-green-500" /> : <Edit size={20} className="text-blue-500" />}
                </button>
            </div>
            
            <div className="flex flex-col md:flex-row">
                <div className="mb-6 md:mb-0 md:mr-6">
                    <div className="w-32 h-32 relative overflow-hidden rounded-lg border-2 border-gray-300">
                        {profilePhoto ? (
                            <Image
                                src={profilePhoto}
                                alt={restaurantData.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <User size={40} className="text-gray-400" />
                            </div>
                        )}
                        
                        {isEditing && (
                            <label className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center cursor-pointer">
                                <Upload size={12} className="inline mr-1" />
                                Change
                                <input
                                    type="file"
                                    onChange={handleProfilePhotoChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        )}
                    </div>
                    
                    {!isEditing && (
                        <div className="mt-3 flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" />
                            <span className="font-medium">{restaurantData.rating}</span>
                        </div>
                    )}
                </div>
                
                <div className="flex-1">
                    {isEditing ? (
                        <div className="space-y-4">
                            {/* Restaurant Name */}
                            <div className="space-y-1">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Restaurant Name*
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={restaurantData.name}
                                    onChange={handleRestaurantChange}
                                    className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                    required
                                />
                            </div>
                            
                            {/* Restaurant Description */}
                            <div className="space-y-1">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={restaurantData.description}
                                    onChange={handleRestaurantChange}
                                    className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                    rows={3}
                                />
                            </div>
                            
                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Email Address*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={restaurantData.email}
                                        onChange={handleRestaurantChange}
                                        className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Phone Number*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={restaurantData.phone}
                                        onChange={handleRestaurantChange}
                                        className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Address */}
                            <div className="space-y-1">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Address*
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={restaurantData.address}
                                    onChange={handleRestaurantChange}
                                    className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                    required
                                />
                            </div>
                            
                            {/* Cuisine and Website */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Cuisine Type*
                                    </label>
                                    <select
                                        name="cuisine"
                                        value={restaurantData.cuisine}
                                        onChange={handleRestaurantChange}
                                        className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                        required
                                    >
                                        <option value="">Select cuisine</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Japanese">Japanese</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                        <option value="American">American</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Thai">Thai</option>
                                        <option value="French">French</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={restaurantData.website}
                                        onChange={handleRestaurantChange}
                                        className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                    />
                                </div>
                            </div>
                            
                            {/* Opening Hours */}
                            <div className="space-y-1">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Opening Hours
                                </label>
                                <input
                                    type="text"
                                    name="openingHours"
                                    value={restaurantData.openingHours}
                                    onChange={handleRestaurantChange}
                                    placeholder="e.g. Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
                                    className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                />
                            </div>
                            
                            {/* Features */}
                            <div className="space-y-2">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Features
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="features.delivery"
                                            checked={restaurantData.features.delivery}
                                            onChange={handleRestaurantChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Delivery
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="features.takeaway"
                                            checked={restaurantData.features.takeaway}
                                            onChange={handleRestaurantChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Takeaway
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="features.dineIn"
                                            checked={restaurantData.features.dineIn}
                                            onChange={handleRestaurantChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Dine-in
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="features.outdoor"
                                            checked={restaurantData.features.outdoor}
                                            onChange={handleRestaurantChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Outdoor Seating
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="features.parking"
                                            checked={restaurantData.features.parking}
                                            onChange={handleRestaurantChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Parking
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="features.wifi"
                                            checked={restaurantData.features.wifi}
                                            onChange={handleRestaurantChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Free Wi-Fi
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{restaurantData.name}</h2>
                            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{restaurantData.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-start space-x-2">
                                    <Mail size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                    <span>{restaurantData.email}</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <User size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                    <span>{restaurantData.phone}</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <MapPin size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                    <span>{restaurantData.address}</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Clock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                    <span>{restaurantData.openingHours}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                    {restaurantData.cuisine}
                                </span>
                                {restaurantData.features.delivery && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'}`}>
                                        Delivery
                                    </span>
                                )}
                                {restaurantData.features.takeaway && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-amber-800 text-amber-200' : 'bg-amber-100 text-amber-800'}`}>
                                        Takeaway
                                    </span>
                                )}
                                {restaurantData.features.dineIn && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                                        Dine-in
                                    </span>
                                )}
                                {restaurantData.features.outdoor && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-teal-800 text-teal-200' : 'bg-teal-100 text-teal-800'}`}>
                                        Outdoor
                                    </span>
                                )}
                                {restaurantData.features.parking && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
                                        Parking
                                    </span>
                                )}
                                {restaurantData.features.wifi && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-pink-800 text-pink-200' : 'bg-pink-100 text-pink-800'}`}>
                                        Wi-Fi
                                    </span>
                                )}
                            </div>
                            
                            {restaurantData.website && (
                                <div className="mt-2">
                                    <a
                                        href={restaurantData.website.startsWith('http') ? restaurantData.website : `https://${restaurantData.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 hover:underline"
                                    >
                                        {restaurantData.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {isEditing && (
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={() => setIsEditing(false)}
                        className={`px-4 py-2 rounded border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );

    const renderMenusSection = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Menus</h3>
                
                <button
                    onClick={handleAddMenu}
                    className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    <Plus size={16} className="mr-1" />
                    Add Menu
                </button>
            </div>

            {menus.length === 0 ? (
                <div className={`p-6 ${cardBgClass} border ${borderClass} rounded-lg text-center`}>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No menus available. Add your first menu to get started.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {menus.map((menu) => (
                        <div key={menu.id} className={`p-6 ${cardBgClass} border ${borderClass} shadow-md rounded-lg space-y-5`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                        {menu.orderNumber}
                                    </div>
                                    <h4 className={`font-medium text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {menu.name}
                                    </h4>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleMoveMenu(menu.id, 'up')}
                                        className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                        disabled={menu.orderNumber === 1}
                                    >
                                        <ChevronUp size={18} className={menu.orderNumber === 1 ? 'text-gray-400' : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                    </button>
                                    <button
                                        onClick={() => handleMoveMenu(menu.id, 'down')}
                                        className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                        disabled={menu.orderNumber === menus.length}
                                    >
                                        <ChevronDown size={18} className={menu.orderNumber === menus.length ? 'text-gray-400' : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                                    </button>
                                    <button
                                        onClick={() => setEditingMenuId(editingMenuId === menu.id ? null : menu.id)}
                                        className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                    >
                                        {editingMenuId === menu.id ? <Save size={18} className="text-green-500" /> : <Edit size={18} className="text-blue-500" />}
                                    </button>
                                </div>
                            </div>

                            {editingMenuId === menu.id ? (
                                <div className="space-y-4">
                                    {/* Menu Name */}
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Menu Name*
                                        </label>
                                        <input
                                            type="text"
                                            value={menu.name}
                                            onChange={(e) => handleMenuChange(menu.id, 'name', e.target.value)}
                                            className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                            placeholder="Menu Name"
                                            required
                                        />
                                    </div>

                                    {/* Menu Description */}
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Description
                                        </label>
                                        <textarea
                                            value={menu.description}
                                            onChange={(e) => handleMenuChange(menu.id, 'description', e.target.value)}
                                            className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                            placeholder="Menu Description"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{menu.description}</p>
                                </div>
                            )}

                            {/* Products Section */}
                            <div className="space-y-4 mt-6">
                                <div className="flex justify-between items-center">
                                    <h5 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Products ({menu.products.length})</h5>
                                    <button
                                        onClick={() => handleAddProduct(menu.id)}
                                        className="flex items-center text-sm font-medium text-green-600 hover:text-green-500"
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Add Product
                                    </button>
                                </div>

                                {menu.products.length === 0 ? (
                                    <div className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} rounded-lg text-center`}>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No products added yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {menu.products.map((product) => (
                                            <div key={product.id} className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} rounded-lg space-y-4`}>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <h6 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                            {product.name}
                                                        </h6>
                                                        <span className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => setEditingProductId(editingProductId === product.id ? null : product.id)}
                                                            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                                        >
                                                            {editingProductId === product.id ? <Save size={16} className="text-green-500" /> : <Edit size={16} className="text-blue-500" />}
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveProduct(menu.id, product.id)}
                                                            className="p-1 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {editingProductId === product.id ? (
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {/* Product Name */}
                                                            <div className="space-y-1">
                                                                <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                    Product Name*
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={product.name}
                                                                    onChange={(e) => handleProductChange(menu.id, product.id, 'name', e.target.value)}
                                                                    className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                                                    placeholder="Product Name"
                                                                    required
                                                                />
                                                            </div>

                                                            {/* Product Price */}
                                                            <div className="space-y-1">
                                                                <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                    Price*
                                                                </label>
                                                                <div className="relative">
                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                        <DollarSign size={16} className="text-gray-400" />
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        value={product.price}
                                                                        onChange={(e) => handleProductChange(menu.id, product.id, 'price', parseFloat(e.target.value))}
                                                                        className={`w-full ${inputBgClass} border ${borderClass} rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                                                        placeholder="0.00"
                                                                        step="0.01"
                                                                        min="0"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Product Description */}
                                                        <div className="space-y-1">
                                                            <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                Description
                                                            </label>
                                                            <textarea
                                                                value={product.description}
                                                                onChange={(e) => handleProductChange(menu.id, product.id, 'description', e.target.value)}
                                                                className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                                                placeholder="Product Description"
                                                                rows={2}
                                                            />
                                                        </div>

                                                        {/* Product Image */}
                                                        <div className="space-y-1">
                                                            <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                Product Image
                                                            </label>
                                                            <div className="flex items-center">
                                                                <div className="w-16 h-16 overflow-hidden rounded-lg mr-4 border-2 border-dashed border-gray-400 flex items-center justify-center">
                                                                    {product.image ? (
                                                                        <Image
                                                                            src={product.image}
                                                                            alt={product.name}
                                                                            width={64}
                                                                            height={64}
                                                                            className="w-full h-full object-cover"
                                                                            unoptimized
                                                                        />
                                                                    ) : (
                                                                        <Camera size={24} className="text-gray-400" />
                                                                    )}
                                                                </div>
                                                                <label className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                                                    <Upload size={14} className="mr-1" />
                                                                    Upload Image
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            if (e.target.files && e.target.files[0]) {
                                                                                const reader = new FileReader();
                                                                                reader.onload = (event) => {
                                                                                    if (event.target && event.target.result) {
                                                                                        handleProductChange(menu.id, product.id, 'image', event.target.result as string);
                                                                                    }
                                                                                };
                                                                                reader.readAsDataURL(e.target.files[0]);
                                                                            }
                                                                        }}
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Supplements Toggle */}
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`has-supplements-${menu.id}-${product.id}`}
                                                                checked={product.hasSupplements}
                                                                onChange={(e) => handleProductChange(menu.id, product.id, 'hasSupplements', e.target.checked)}
                                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                            />
                                                            <label
                                                                htmlFor={`has-supplements-${menu.id}-${product.id}`}
                                                                className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                                            >
                                                                This product has supplements/options
                                                            </label>
                                                        </div>

                                                        {/* Supplements Section */}
                                                        {product.hasSupplements && (
                                                            <div className="space-y-3 pl-4 border-l-2 border-green-500">
                                                                <div className="flex justify-between items-center">
                                                                    <h6 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                        Supplements/Options
                                                                    </h6>
                                                                    <button
                                                                        onClick={() => handleAddSupplement(menu.id, product.id)}
                                                                        className="flex items-center text-xs font-medium text-green-600 hover:text-green-500"
                                                                    >
                                                                        <Plus size={14} className="mr-1" />
                                                                        Add Option
                                                                    </button>
                                                                </div>

                                                                {product.supplements.length === 0 ? (
                                                                    <div className={`p-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} rounded-lg text-center`}>
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No supplements added yet</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="space-y-2">
                                                                        {product.supplements.map((supplement) => (
                                                                            <div key={supplement.id} className={`p-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/80'} rounded-lg`}>
                                                                                <div className="flex justify-between items-center mb-2">
                                                                                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                                        Option #{supplement.id}
                                                                                    </span>
                                                                                    <button
                                                                                        onClick={() => handleRemoveSupplement(menu.id, product.id, supplement.id)}
                                                                                        className="text-red-500 hover:text-red-600"
                                                                                    >
                                                                                        <Trash2 size={14} />
                                                                                    </button>
                                                                                </div>

                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    <div className="space-y-1">
                                                                                        <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                                            Name*
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            value={supplement.name}
                                                                                            onChange={(e) => handleSupplementChange(menu.id, product.id, supplement.id, 'name', e.target.value)}
                                                                                            className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm`}
                                                                                            placeholder="Option Name"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <label className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                                            Price*
                                                                                        </label>
                                                                                        <div className="relative">
                                                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                                <DollarSign size={14} className="text-gray-400" />
                                                                                            </div>
                                                                                            <input
                                                                                                type="number"
                                                                                                value={supplement.price}
                                                                                                onChange={(e) => handleSupplementChange(menu.id, product.id, supplement.id, 'price', parseFloat(e.target.value))}
                                                                                                className={`w-full ${inputBgClass} border ${borderClass} rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm`}
                                                                                                placeholder="0.00"
                                                                                                step="0.01"
                                                                                                min="0"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className={`mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            {product.description}
                                                        </p>
                                                        
                                                        {product.hasSupplements && product.supplements.length > 0 && (
                                                            <div className="mt-2">
                                                                <h6 className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                    Options:
                                                                </h6>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {product.supplements.map(supp => (
                                                                        <span key={supp.id} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                                            {supp.name} (+${supp.price.toFixed(2)})
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {editingMenuId === menu.id && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => handleRemoveMenu(menu.id)}
                                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={16} className="mr-1" />
                                        Remove Menu
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex">
                <Sidebar />  {/* Sidebar à gauche */}

                <div className="flex-1 pb-16"> {/* Contenu principal */}
                    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    
                    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Restaurant Profile
                        </h1>
                        
                        {renderRestaurantInfo()}
                        {renderMenusSection()}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}