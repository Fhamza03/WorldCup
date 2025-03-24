"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
    Menu, X, Upload, Camera, Edit, User, Mail, Calendar, Save,
    Plus, Trash2, Star, DollarSign, Clock, MapPin, ChevronUp, ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "../../profile/provider/header";
import Footer from "@/components/auth/footer";
import { Stepper, Step, StepLabel } from "@mui/material";
import { MdRestaurantMenu, MdList, MdCheckCircle } from "react-icons/md";
import Sidebar from "../../layout/sidebar";


export default function RestaurantProviderProfile() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState(0);



    // Restaurant Form Data
    const [restaurantData, setRestaurantData] = useState({
        id: 0,
        name: "",
        description: "",
        address: "",
        phone: "",
        cuisine: "",
        openingHours: "",
        email: "",
        website: "",
        features: {
            delivery: false,
            takeaway: false,
            dineIn: false,
            outdoor: false,
            parking: false,
            wifi: false,
        },
    });
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

    const steps = [
        { darkLabel: "Menu Details", lightLabel: "Menu Details", icon: <MdRestaurantMenu /> },
        { darkLabel: "Products", lightLabel: "Products", icon: <MdList /> },
        { darkLabel: "Confirmation", lightLabel: "Confirmation", icon: <MdCheckCircle /> },
    ];

    // Menus Array
    const [menus, setMenus] = useState<any[]>([
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
                }
            ]
        }
    ]);

    // Handle next/previous step
    const handleNextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handlePreviousStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

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
    };

    const handleRemoveMenu = (menuId: number) => {
        setMenus(menus.filter(menu => menu.id !== menuId));
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
            ? Math.max(...targetMenu.products.map((product: any) => product.id)) + 1
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
    };

    const handleRemoveProduct = (menuId: number, productId: number) => {
        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.filter((product: any) => product.id !== productId)
                }
                : menu
        ));
    };

    const handleProductChange = (menuId: number, productId: number, field: string, value: any) => {
        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.map((product: any) =>
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

        const targetProduct = targetMenu.products.find((product: any) => product.id === productId);
        if (!targetProduct) return;

        const newSupplementId = targetProduct.supplements.length > 0
            ? Math.max(...targetProduct.supplements.map((supp: any) => supp.id)) + 1
            : 1;

        setMenus(menus.map(menu =>
            menu.id === menuId
                ? {
                    ...menu,
                    products: menu.products.map((product: any) =>
                        product.id === productId
                            ? {
                                ...product,
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
                    products: menu.products.map((product: any) =>
                        product.id === productId
                            ? {
                                ...product,
                                supplements: product.supplements.filter((supp: any) => supp.id !== supplementId)
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
                    products: menu.products.map((product: any) =>
                        product.id === productId
                            ? {
                                ...product,
                                supplements: product.supplements.map((supp: any) =>
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

    const renderBasicInfoStep = () => (
        <div className="space-y-6">
            <h3 className={`text-xl font-bold pt-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Restaurant Basic Information</h3>

            <div className="space-y-4">
                {/* Restaurant Name */}
                <div className="space-y-1">
                    <label className={`block text-sm font-medium  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Restaurant Name*
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={restaurantData.name}
                        onChange={handleRestaurantChange}
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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

                {/* Restaurant Logo/Photo */}
                <div className="space-y-2">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Restaurant Logo/Photo
                    </label>
                    <div className="flex items-center">
                        <div className="w-24 h-24 overflow-hidden rounded-lg mr-4 border-2 border-dashed border-gray-400 flex items-center justify-center">
                            {profilePhoto ? (
                                <Image
                                    src={profilePhoto}
                                    alt="Restaurant"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <Upload size={32} className="text-gray-400" />
                            )}
                        </div>
                        <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                            <Upload size={16} className="mr-2" />
                            Upload Photo
                            <input
                                type="file"
                                onChange={handleProfilePhotoChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMenusStep = () => (
        <div className="space-y-6">
            <h3 className={`text-xl font-bold  pt-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Menus</h3>

            {menus.map((menu) => (
                <div key={menu.id} className={`p-6 ${cardBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-md rounded-lg space-y-5 relative`}>
                    <div className="flex justify-between items-center">
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Menu #{menu.orderNumber}</h4>
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
                        </div>
                    </div>

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
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                placeholder="Menu Description"
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="space-y-4 mt-6">
                        <div className="flex justify-between items-center">
                            <h5 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Products</h5>
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
                                {menu.products.map((product: Product) => (
                                    <div key={product.id} className={`p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} rounded-lg space-y-4`}>
                                        <div className="flex justify-between items-center">
                                            <h6 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                Product #{product.id}
                                            </h6>
                                            <button
                                                onClick={() => handleRemoveProduct(menu.id, product.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

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
                                                    className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                                                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
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
                                                        {product.supplements.map((supplement: Supplement) => (
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
                                                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm`}
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
                                                                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/20 text-sm`}
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
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Remove Menu Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => handleRemoveMenu(menu.id)}
                            className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                        >
                            <Trash2 size={16} className="mr-1" />
                            Remove Menu
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Menu Button */}
            <button
                onClick={handleAddMenu}
                className={`flex items-center justify-center w-full p-4 border-2 border-dashed ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                    } rounded-lg text-sm font-medium ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                    } transition-colors duration-200`}
            >
                <Plus size={18} className="mr-2" />
                Add New Menu
            </button>
        </div>
    );

    const renderReviewStep = () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="space-y-6 pt-5 text-center">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Review & Submit</h3>
                <p className="text-gray-600">Please review your details before submitting.</p>
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen ${themeClass} `}>
            <div className={`min-h-screen flex ${themeClass}`}>
                <Sidebar />  {/* Sidebar à gauche */}

                <div className="flex-1 pb-16"> {/* Contenu principal */}
                    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} profilePhoto={profilePhoto} />

                    <Stepper className={`pt-5 ${themeClass}`} activeStep={activeStep} alternativeLabel>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel
                                    onClick={() => setCurrentStep(index + 1)}
                                    style={{ cursor: 'pointer' }}
                                    className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <span className="w-10 h-10 rounded-full flex items-center justify-center bg-green-300 dark:bg-green-300">
                                            {step.icon}
                                        </span>
                                    </div>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {currentStep === 1 && renderBasicInfoStep()}
                        {currentStep === 2 && renderMenusStep()}
                        {currentStep === 3 && renderReviewStep()}
                    </div>

                    <div className="max-w-3xl mx-auto flex justify-between mt-6 gap-8 pb-10">
                        {currentStep > 1 && currentStep < 3 && (
                            <button onClick={handlePreviousStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
                        )}
                        {currentStep < 3 && (
                            <button onClick={handleNextStep} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Next</button>
                        )}
                    </div>
                </div>
            </div>

            <div className=" bottom-0 left-0 w-full">
                <Footer />
            </div>


        </div>
    )
};
