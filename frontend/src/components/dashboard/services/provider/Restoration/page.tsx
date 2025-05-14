"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
    Menu, X, Upload, Camera, Edit, User, Mail, Calendar, Save,
    Plus, Trash2, Star, DollarSign, Clock, MapPin, ChevronUp, ChevronDown
} from "lucide-react";
import { Search, ChevronLeft, Building, AlertCircle } from "lucide-react";
import Swal from 'sweetalert2';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "../../../profile/provider/header";
import Footer from "@/components/auth/footer";
import axios from "axios"; // Added missing import
import { Stepper, Step, StepLabel } from "@mui/material";
import { MdRestaurantMenu, MdList, MdCheckCircle } from "react-icons/md";
import Sidebar from "../../../layout/sidebar";

export default function RestaurantProviderProfile() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [activeStep, setActiveStep] = useState(0); // Added missing state
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");
    const [isLoading, setIsLoading] = useState(true);
    const [menuTypes, setMenuTypes] = useState<any[]>([]);

    interface OpeningHours {
        [key: string]: string;
    }

    interface Restaurant {

        name: string;
        description: string;
        cuisineType: string;
        location: string;
        address: string;
        contactPhone: string;
        email: string;
        isPartner: boolean;
        openingHours: OpeningHours;
    }

    interface Supplement {
        name: string;
        price: number;
    }

    interface Product {
        name: string;
        price: number;
        description: string;
        image: string | null;
        hasSupplements: boolean;
        supplements: Supplement[];
    }

    interface Menu {
        name: string;
        description: string;
        orderNumber: number;
        menuTypeId?: number;
        isSpecialOffer?: boolean;
        requiresFanId?: boolean;
        originalPrice?: number;
        discountedPrice?: number;
        promotionDetails?: string;
        products: Product[];
    }

    const steps = [
        { darkLabel: "Menu Details", lightLabel: "Menu Details", icon: <MdRestaurantMenu /> },
        { darkLabel: "Products", lightLabel: "Products", icon: <MdList /> },
        { darkLabel: "Confirmation", lightLabel: "Confirmation", icon: <MdCheckCircle /> },
    ];

    const [restaurantData, setRestaurantData] = useState<Restaurant>({

        name: "",
        description: "",
        cuisineType: "",
        location: "",
        address: "",
        contactPhone: "",
        email: "",
        isPartner: false,
        openingHours: {
            MONDAY: "09:00-22:00",
            TUESDAY: "09:00-22:00",
            WEDNESDAY: "09:00-22:00",
            THURSDAY: "09:00-22:00",
            FRIDAY: "09:00-23:00",
            SATURDAY: "10:00-23:00",
            SUNDAY: "10:00-21:00"
        }
    });

    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantId = localStorage.getItem("restaurantId");
                const res = await fetch(`/api/restaurants/${restaurantId}`);
                const restaurant = await res.json();
                setRestaurantData(restaurant);

                const menuRes = await fetch(`/api/menus/restaurant/${restaurantId}`);
                const menuList = await menuRes.json();

                const completeMenus = await Promise.all(menuList.map(async (menu: any) => {
                    const productsRes = await fetch(`/api/products/menu/${menu.id}`);
                    const products = await productsRes.json();

                    const enrichedProducts = await Promise.all(products.map(async (product: any) => {
                        if (product.hasSupplements) {
                            const suppRes = await fetch(`/api/products/${product.id}/supplements`);
                            const supplements = await suppRes.json();
                            return { ...product, supplements };
                        }
                        return { ...product, supplements: [] };
                    }));

                    return { ...menu, products: enrichedProducts };
                }));

                setMenus(completeMenus);
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch menu types
    useEffect(() => {
        const fetchMenuTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8083/api/menu-types');
                setMenuTypes(response.data);
            } catch (error) {
                console.error("Error fetching menu types:", error);
            }
        };

        fetchMenuTypes();
    }, []);




    // Handle next/previous step
    const handleNextStep = () => {
        const nextStep = Math.min(currentStep + 1, 3);
        setCurrentStep(nextStep);
        setActiveStep(nextStep - 1);
    };

    const handlePreviousStep = () => {
        const prevStep = Math.max(currentStep - 1, 1);
        setCurrentStep(prevStep);
        setActiveStep(prevStep - 1);
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
        }
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const inputBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const providerId = localStorage.getItem("userId"); // Default to 1 if not found

    const handleRestaurantChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRestaurantData(prev => ({ ...prev, [name]: value }));
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
        setMenus([...menus, {
            name: `New Menu ${menus.length + 1}`,
            description: "",
            orderNumber: menus.length + 1,
            products: []
        }]);
    };

    const handleRemoveMenu = (menuIndex: number) => {
        setMenus(menus.filter((_, index) => index !== menuIndex));
    };
    const handleMenuChange = (menuIndex: number, field: string, value: any) => {
        setMenus(menus.map((menu, index) =>
            index === menuIndex ? { ...menu, [field]: value } : menu
        ));
    };

    const handleAddProduct = (menuIndex: number) => {
        const newProduct = {
            name: `New Product ${menus[menuIndex].products.length + 1}`,
            price: 0,
            description: "",
            image: null,
            hasSupplements: false,
            supplements: []
        };

        setMenus(menus.map((menu, index) =>
            index === menuIndex
                ? { ...menu, products: [...menu.products, newProduct] }
                : menu
        ));
    };

    const handleRemoveProduct = (menuIndex: number, productIndex: number) => {
        setMenus(menus.map((menu, index) =>
            index === menuIndex
                ? {
                    ...menu,
                    products: menu.products.filter((_, idx) => idx !== productIndex)
                }
                : menu
        ));
    };

    const handleProductChange = (menuIndex: number, productIndex: number, field: string, value: any) => {
        setMenus(menus.map((menu, index) =>
            index === menuIndex
                ? {
                    ...menu,
                    products: menu.products.map((product, idx) =>
                        idx === productIndex ? { ...product, [field]: value } : product
                    )
                }
                : menu
        ));
    };

    const handleAddSupplement = (menuIndex: number, productIndex: number) => {
        const newSupplement = {
            name: `New Supplement ${menus[menuIndex].products[productIndex].supplements.length + 1}`,
            price: 0
        };

        setMenus(menus.map((menu, index) =>
            index === menuIndex
                ? {
                    ...menu,
                    products: menu.products.map((product, idx) =>
                        idx === productIndex
                            ? { ...product, supplements: [...product.supplements, newSupplement] }
                            : product
                    )
                }
                : menu
        ));
    };

    const handleRemoveSupplement = (menuIndex: number, productIndex: number, supplementIndex: number) => {
        setMenus(menus.map((menu, index) =>
            index === menuIndex
                ? {
                    ...menu,
                    products: menu.products.map((product, idx) =>
                        idx === productIndex
                            ? {
                                ...product,
                                supplements: product.supplements.filter((_, suppIdx) => suppIdx !== supplementIndex)
                            }
                            : product
                    )
                }
                : menu
        ));
    };

    const handleSupplementChange = (menuIndex: number, productIndex: number, supplementIndex: number, field: string, value: any) => {
        setMenus(menus.map((menu, index) =>
            index === menuIndex
                ? {
                    ...menu,
                    products: menu.products.map((product, idx) =>
                        idx === productIndex
                            ? {
                                ...product,
                                supplements: product.supplements.map((supp, suppIdx) =>
                                    suppIdx === supplementIndex ? { ...supp, [field]: value } : supp
                                )
                            }
                            : product
                    )
                }
                : menu
        ));
    };
    const handleMoveMenu = (menuIndex: number, direction: 'up' | 'down') => {
        if (menuIndex < 0 || menuIndex >= menus.length) return;

        const newMenus = [...menus];

        if (direction === 'up' && menuIndex > 0) {
            // Échange les positions avec le menu précédent
            [newMenus[menuIndex - 1], newMenus[menuIndex]] = [newMenus[menuIndex], newMenus[menuIndex - 1]];
        } else if (direction === 'down' && menuIndex < menus.length - 1) {
            // Échange les positions avec le menu suivant
            [newMenus[menuIndex], newMenus[menuIndex + 1]] = [newMenus[menuIndex + 1], newMenus[menuIndex]];
        }

        // Met à jour les numéros d'ordre
        newMenus.forEach((menu, idx) => {
            menu.orderNumber = idx + 1;
        });

        setMenus(newMenus);
    };
    const handleSubmit = async () => {
        try {
            // Étape 1 : Ajouter le restaurant
            const url = `http://localhost:8083/api/restaurants/provider/${providerId}`;
            const restaurantResponse = await axios.post(url, restaurantData);
            const createdRestaurant = restaurantResponse.data;
            console.log("Restaurant created:", createdRestaurant);

            if (!createdRestaurant.id) {
                throw new Error("Failed to retrieve the restaurant ID.");
            }

            // Étape 2 : Ajouter les menus
            for (const menu of menus) {
                if (!menu.menuTypeId || typeof menu.menuTypeId !== 'number') {
                    throw new Error(`Invalid menuTypeId for menu: ${menu.name}`);
                }

                const menuResponse = await axios.post(
                    `http://localhost:8083/api/menus/restaurant/${createdRestaurant.id}/type/${menu.menuTypeId}`,
                    menu
                );
                const createdMenu = menuResponse.data;

                // Étape 3 : Ajouter les produits
                for (const product of menu.products) {
                    const productResponse = await axios.post(
                        `http://localhost:8083/api/products/without-add`,
                        {
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            image: product.image || null,
                            hasSupplements: product.hasSupplements || false,
                            supplements: product.supplements || []
                        }
                    );
                    const createdProduct = productResponse.data;

                    await axios.post(
                        `http://localhost:8083/api/products/${createdProduct.id}/menu/${createdMenu.id}`,
                        null
                    );
                }
            }

            // ✅ Afficher l'alerte de succès
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Restaurant, menus et produits ajoutés avec succès.',
                confirmButtonText: 'OK',
            }).then(() => {
                // Rediriger après confirmation
                router.push('/dashboard/provider/services/Restoration/liste');
            });

        } catch (error) {
            console.error("Error saving data:", error);

            // ❌ Afficher une alerte d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "Une erreur s'est produite lors de l'enregistrement des données.",
            });
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
            <h3 className={`text-xl font-bold pt-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Restaurant Basic Information
            </h3>

            <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Restaurant Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={restaurantData.name}
                        onChange={handleRestaurantChange}
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                        required
                    />
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                    <textarea
                        name="description"
                        value={restaurantData.description}
                        onChange={handleRestaurantChange}
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                        rows={3}
                    />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email*</label>
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
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number*</label>
                        <input
                            type="tel"
                            name="contactPhone"
                            value={restaurantData.contactPhone}
                            onChange={handleRestaurantChange}
                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                            required
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address*</label>
                    <input
                        type="text"
                        name="address"
                        value={restaurantData.address}
                        onChange={handleRestaurantChange}
                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                        required
                    />
                </div>

                {/* Cuisine and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cuisine Type*</label>
                        <select
                            name="cuisineType"
                            value={restaurantData.cuisineType}
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
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location*</label>
                        <input
                            type="text"
                            name="location"
                            value={restaurantData.location}
                            onChange={handleRestaurantChange}
                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                            required
                        />
                    </div>
                </div>

                {/* Opening Hours */}
                {/* Restyled Opening Hours */}
                <div className="space-y-1">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Opening Hours</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(restaurantData.openingHours).map(([day, hours]) => (
                            <div key={day} className="flex items-center gap-2">
                                <label className="w-24 capitalize text-sm font-medium">{day.toLowerCase()}</label>
                                <input
                                    type="text"
                                    name={`openingHours.${day}`}
                                    value={hours}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        setRestaurantData(prev => ({
                                            ...prev,
                                            openingHours: {
                                                ...prev.openingHours,
                                                [day]: value
                                            }
                                        }));
                                    }}
                                    className={`flex-1 ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-500/20`}
                                    placeholder="e.g., 09:00-22:00"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


    const renderMenusStep = () => (
        <div className="space-y-6">
            <h3 className={`text-xl font-bold pt-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Menus</h3>

            {menus.map((menu, menuIndex) => (
                <div
                    key={menuIndex}
                    className={`p-6 ${cardBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-md rounded-lg space-y-5 relative`}
                >
                    <div className="flex justify-between items-center">
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Menu #{menu.orderNumber}</h4>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleMoveMenu(menuIndex, 'up')}
                                className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                disabled={menuIndex === 0}
                            >
                                <ChevronUp size={18} className={menuIndex === 0 ? 'text-gray-400' : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                            </button>
                            <button
                                onClick={() => handleMoveMenu(menuIndex, 'down')}
                                className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                disabled={menuIndex === menus.length - 1}
                            >
                                <ChevronDown size={18} className={menuIndex === menus.length - 1 ? 'text-gray-400' : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Menu Name */}
                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Menu Name*</label>
                            <input
                                type="text"
                                value={menu.name}
                                onChange={(e) => handleMenuChange(menuIndex, 'name', e.target.value)}
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                placeholder="Menu Name"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                            <textarea
                                value={menu.description}
                                onChange={(e) => handleMenuChange(menuIndex, 'description', e.target.value)}
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                rows={2}
                            />
                        </div>

                        {/* Menu Type */}
                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Menu Type*</label>
                            <select
                                value={menu.menuTypeId || ""}
                                onChange={(e) => handleMenuChange(menuIndex, 'menuTypeId', parseInt(e.target.value, 10))}
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                required
                            >
                                <option value="">Select Type</option>
                                {menuTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Additional Fields */}
                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Special Offer</label>
                            <input
                                type="checkbox"
                                checked={menu.isSpecialOffer || false}
                                onChange={(e) => handleMenuChange(menuIndex, 'isSpecialOffer', e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Requires Fan ID</label>
                            <input
                                type="checkbox"
                                checked={menu.requiresFanId || false}
                                onChange={(e) => handleMenuChange(menuIndex, 'requiresFanId', e.target.checked)}
                                className="rounded"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Original Price</label>
                            <input
                                type="number"
                                value={menu.originalPrice || ""}
                                onChange={(e) => handleMenuChange(menuIndex, 'originalPrice', parseFloat(e.target.value))}
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Discounted Price</label>
                            <input
                                type="number"
                                value={menu.discountedPrice || ""}
                                onChange={(e) => handleMenuChange(menuIndex, 'discountedPrice', parseFloat(e.target.value))}
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Promotion Details</label>
                            <textarea
                                value={menu.promotionDetails || ""}
                                onChange={(e) => handleMenuChange(menuIndex, 'promotionDetails', e.target.value)}
                                className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                rows={2}
                            />
                        </div>

                        {/* Products Section */}
                        <div className="space-y-4">
                            <h5 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Products</h5>
                            {menu.products.map((product, productIndex) => (
                                <div
                                    key={productIndex}
                                    className={`p-4 ${cardBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg space-y-3`}
                                >
                                    {/* Product Name */}
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Product Name*</label>
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) => handleProductChange(menuIndex, productIndex, 'name', e.target.value)}
                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                            placeholder="Product Name"
                                            required
                                        />
                                    </div>

                                    {/* Product Price */}
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price*</label>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) => handleProductChange(menuIndex, productIndex, 'price', parseFloat(e.target.value))}
                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                    </div>

                                    {/* Product Description */}
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                                        <textarea
                                            value={product.description}
                                            onChange={(e) => handleProductChange(menuIndex, productIndex, 'description', e.target.value)}
                                            className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                            rows={2}
                                        />
                                    </div>

                                    {/* Product Supplements */}
                                    {product.hasSupplements && (
                                        <div className="space-y-1">
                                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Supplements</label>
                                            {product.supplements.map((supplement, supplementIndex) => (
                                                <div key={supplementIndex} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={supplement.name}
                                                        onChange={(e) => handleSupplementChange(menuIndex, productIndex, supplementIndex, 'name', e.target.value)}
                                                        className={`w-full ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                                        placeholder="Supplement Name"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={supplement.price}
                                                        onChange={(e) => handleSupplementChange(menuIndex, productIndex, supplementIndex, 'price', parseFloat(e.target.value))}
                                                        className={`w-24 ${inputBgClass} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg px-3 py-2`}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
                                                    />
                                                    <button
                                                        onClick={() => handleRemoveSupplement(menuIndex, productIndex, supplementIndex)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => handleAddSupplement(menuIndex, productIndex)}
                                                className="text-sm text-green-600 hover:text-green-700"
                                            >
                                                Add Supplement
                                            </button>
                                        </div>
                                    )}

                                    {/* Remove Product Button */}
                                    <button
                                        onClick={() => handleRemoveProduct(menuIndex, productIndex)}
                                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={16} className="mr-1" />
                                        Remove Product
                                    </button>
                                </div>
                            ))}

                            {/* Add Product Button */}
                            <button
                                onClick={() => handleAddProduct(menuIndex)}
                                className={`flex items-center justify-center w-full p-2 border-2 border-dashed ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'} rounded-lg text-sm font-medium ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} transition-colors duration-200`}
                            >
                                <Plus size={18} className="mr-2" />
                                Add New Product
                            </button>
                        </div>
                    </div>

                    {/* Remove Menu Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => handleRemoveMenu(menuIndex)}
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
                className={`flex items-center justify-center w-full p-4 border-2 border-dashed ${isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'} rounded-lg text-sm font-medium ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} transition-colors duration-200`}
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
                        <Link href="/dashboard/provider/services/Restoration/liste ">
                            <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                <ChevronLeft size={18} className="mr-1" />
                                Back to list
                            </button>
                        </Link>
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
