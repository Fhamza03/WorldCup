"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
    ArrowLeft, Plus, Minus, X, User, MapPin, Phone, CreditCard, 
    DollarSign, Clock, ShoppingCart, Check, ChevronDown, ChevronUp,
    Info, Star, Sun, Moon, AlignLeft, Save
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
    selected: boolean;
}

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string | null;
    hasSupplements: boolean;
    supplements: Supplement[];
    quantity: number;
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

export default function RestaurantOrder() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    
    // Customer Form Details
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: ""
    });
    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }

        // Fetch restaurant data
        fetchRestaurantData();
    }, []);

    const fetchRestaurantData = async () => {
        setIsLoading(true);
        
        try {
            // Simulate API call with dummy data
            setTimeout(() => {
                // Restaurant data
                const dummyRestaurant: Restaurant = {
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
                };
                
                // Menu and product data
                const dummyMenus: Menu[] = [
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
                                    { id: 1, name: "Extra Bacon", price: 2.5, selected: false },
                                    { id: 2, name: "Add Cheese", price: 1.5, selected: false }
                                ],
                                quantity: 0
                            },
                            {
                                id: 2,
                                name: "French Toast",
                                price: 9.99,
                                description: "Served with maple syrup and fresh berries",
                                image: null,
                                hasSupplements: false,
                                supplements: [],
                                quantity: 0
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
                                    { id: 1, name: "Add Egg (Croque Madame)", price: 1.5, selected: false },
                                    { id: 2, name: "Add Fries", price: 3.0, selected: false }
                                ],
                                quantity: 0
                            },
                            {
                                id: 2,
                                name: "Niçoise Salad",
                                price: 14.99,
                                description: "Fresh tuna, potatoes, eggs, tomatoes, olives, and greens",
                                image: null,
                                hasSupplements: true,
                                supplements: [
                                    { id: 1, name: "Extra Tuna", price: 3.5, selected: false },
                                    { id: 2, name: "Add Anchovies", price: 2.0, selected: false }
                                ],
                                quantity: 0
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "Dinner Menu",
                        description: "Evening specialties prepared with care",
                        orderNumber: 3,
                        products: [
                            {
                                id: 1,
                                name: "Coq au Vin",
                                price: 21.99,
                                description: "Chicken braised with wine, mushrooms, and garlic",
                                image: null,
                                hasSupplements: true,
                                supplements: [
                                    { id: 1, name: "Add Mashed Potatoes", price: 4.0, selected: false },
                                    { id: 2, name: "Add Green Beans", price: 3.5, selected: false }
                                ],
                                quantity: 0
                            },
                            {
                                id: 2,
                                name: "Beef Bourguignon",
                                price: 24.99,
                                description: "Slow-cooked beef stew with red wine, carrots, and herbs",
                                image: null,
                                hasSupplements: true,
                                supplements: [
                                    { id: 1, name: "Add Baguette", price: 2.5, selected: false },
                                    { id: 2, name: "Add Cheese Plate", price: 6.0, selected: false }
                                ],
                                quantity: 0
                            }
                        ]
                    },
                    {
                        id: 4,
                        name: "Desserts",
                        description: "Sweet treats to complete your meal",
                        orderNumber: 4,
                        products: [
                            {
                                id: 1,
                                name: "Crème Brûlée",
                                price: 8.99,
                                description: "Classic custard dessert with caramelized sugar top",
                                image: null,
                                hasSupplements: false,
                                supplements: [],
                                quantity: 0
                            },
                            {
                                id: 2,
                                name: "Chocolate Mousse",
                                price: 7.99,
                                description: "Smooth and rich chocolate dessert with whipped cream",
                                image: null,
                                hasSupplements: true,
                                supplements: [
                                    { id: 1, name: "Add Berries", price: 2.0, selected: false },
                                    { id: 2, name: "Add Hazelnut Crumble", price: 1.5, selected: false }
                                ],
                                quantity: 0
                            }
                        ]
                    }
                ];
                
                setRestaurant(dummyRestaurant);
                setMenus(dummyMenus);
                if (dummyMenus.length > 0) {
                    setActiveMenu(dummyMenus[0].id);
                }
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
            setError("Failed to load restaurant data. Please try again later.");
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

    const handleCustomerInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openProductModal = (product: Product) => {
        const productWithResetSupplements = {
            ...product,
            supplements: product.supplements.map(supp => ({
                ...supp,
                selected: false
            })),
            quantity: 1
        };
        setSelectedProduct(productWithResetSupplements);
        setIsProductModalOpen(true);
    };

    const closeProductModal = () => {
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const toggleSupplement = (supplementId: number) => {
        if (!selectedProduct) return;
        
        setSelectedProduct({
            ...selectedProduct,
            supplements: selectedProduct.supplements.map(supp => 
                supp.id === supplementId ? { ...supp, selected: !supp.selected } : supp
            )
        });
    };

    const changeProductQuantity = (change: number) => {
        if (!selectedProduct) return;
        
        const newQuantity = Math.max(1, selectedProduct.quantity + change);
        setSelectedProduct({
            ...selectedProduct,
            quantity: newQuantity
        });
    };

    const addToCart = () => {
        if (!selectedProduct) return;
        
        // Create a unique identifier for the product with its selected supplements
        const selectedSupplementsIds = selectedProduct.supplements
            .filter(supp => supp.selected)
            .map(supp => supp.id)
            .sort()
            .join('-');
            
        const uniqueId = `${selectedProduct.id}-${selectedSupplementsIds}`;
        
        // Check if this exact product with the same supplements is already in cart
        const existingCartItemIndex = cart.findIndex(item => {
            const itemSupplementsIds = item.supplements
                .filter(supp => supp.selected)
                .map(supp => supp.id)
                .sort()
                .join('-');
            return item.id === selectedProduct.id && itemSupplementsIds === selectedSupplementsIds;
        });
        
        if (existingCartItemIndex !== -1) {
            // Update quantity if already in cart
            const updatedCart = [...cart];
            updatedCart[existingCartItemIndex].quantity += selectedProduct.quantity;
            setCart(updatedCart);
        } else {
            // Add as new item
            setCart([...cart, selectedProduct]);
        }
        
        closeProductModal();
    };

    const removeFromCart = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const changeCartItemQuantity = (index: number, change: number) => {
        const newCart = [...cart];
        const newQuantity = Math.max(1, newCart[index].quantity + change);
        newCart[index].quantity = newQuantity;
        setCart(newCart);
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => {
            const itemTotal = item.price * item.quantity;
            const supplementsTotal = item.supplements
                .filter(supp => supp.selected)
                .reduce((suppTotal, supp) => suppTotal + supp.price, 0) * item.quantity;
            return total + itemTotal + supplementsTotal;
        }, 0);
    };

    const getDeliveryFee = () => {
        return orderType === 'delivery' ? 3.99 : 0;
    };

    const getTotal = () => {
        return getSubtotal() + getDeliveryFee();
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add some items before checking out.");
            return;
        }
        
        if (getSubtotal() < (restaurant?.minOrder || 0) && orderType === 'delivery') {
            alert(`The minimum order for delivery is $${restaurant?.minOrder.toFixed(2)}. Please add more items.`);
            return;
        }
        
        setIsCheckoutOpen(true);
    };

    const handleSubmitOrder = () => {
        // Validate form
        if (!customerInfo.name || !customerInfo.phone || (orderType === 'delivery' && !customerInfo.address)) {
            alert("Please fill in all required fields.");
            return;
        }
        
        // Here you would submit the order to your backend
        console.log("Order submitted:", {
            restaurant: restaurant?.id,
            items: cart,
            customerInfo,
            orderType,
            paymentMethod,
            subtotal: getSubtotal(),
            deliveryFee: getDeliveryFee(),
            total: getTotal()
        });
        
        alert("Your order has been placed successfully!");
        router.push('/order/confirmation');
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const inputBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    if (isLoading) {
        return (
            <div className={`min-h-screen ${themeClass} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p>Loading restaurant menu...</p>
                </div>
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className={`min-h-screen ${themeClass} flex items-center justify-center px-4`}>
                <div className="text-center max-w-md">
                    <X size={48} className="mx-auto mb-4 text-red-500" />
                    <h2 className="text-xl font-bold mb-2">Error Loading Restaurant</h2>
                    <p className="mb-4">{error || "Restaurant not found"}</p>
                    <Link href="/dashboard/supporter/services/Restoration">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Back to Restaurants
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex">
                <Sidebar />

                <div className="flex-1 pb-16 relative">
                    <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    
                    {/* Restaurant Header */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
                        <img 
                            src="/logo.png" 
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="flex items-center mb-2">
                                <Link href="/dashboard/supporter/services/Restoration">
                                    <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 mr-3">
                                        <ArrowLeft size={18} />
                                    </button>
                                </Link>
                                <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded-md flex items-center">
                                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                    <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{restaurant.name}</h1>
                            <div className="flex flex-wrap items-center mt-1 text-white">
                                <span className="mr-4 text-sm flex items-center">
                                    <Clock size={14} className="mr-1" /> 
                                    {restaurant.deliveryTime}
                                </span>
                                <span className="mr-4 text-sm flex items-center">
                                    <MapPin size={14} className="mr-1" /> 
                                    {restaurant.address}
                                </span>
                                <span className="text-sm flex items-center">
                                    <DollarSign size={14} className="mr-1" /> 
                                    Min. ${restaurant.minOrder.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Order Type Toggle */}
                    <div className="max-w-7xl mx-auto px-4 py-4 flex space-x-4">
                        <button
                            onClick={() => setOrderType('delivery')}
                            className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                                orderType === 'delivery' 
                                    ? 'bg-green-500 text-white' 
                                    : `border ${borderClass} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                            }`}
                        >
                            <MapPin size={18} className="mr-2" />
                            Delivery
                        </button>
                        <button
                            onClick={() => setOrderType('takeaway')}
                            className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                                orderType === 'takeaway' 
                                    ? 'bg-green-500 text-white' 
                                    : `border ${borderClass} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                            }`}
                        >
                            <ShoppingCart size={18} className="mr-2" />
                            Takeaway
                        </button>
                    </div>
                    
                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                            {/* Menu Section */}
                            <div className="w-full lg:w-2/3">
                                {/* Menu Categories */}
                                <div className="mb-4 border-b pb-3 overflow-auto">
                                    <div className="flex space-x-4">
                                        {menus.map(menu => (
                                            <button
                                                key={menu.id}
                                                onClick={() => setActiveMenu(menu.id)}
                                                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                                    activeMenu === menu.id
                                                        ? 'bg-green-500 text-white'
                                                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                                                }`}
                                            >
                                                {menu.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Active Menu Items */}
                                <div className="mb-8">
                                    {menus.find(menu => menu.id === activeMenu)?.products.map(product => (
                                        <div 
                                            key={product.id} 
                                            className={`p-4 ${cardBgClass} border ${borderClass} rounded-lg mb-4 hover:shadow-md transition-shadow cursor-pointer`}
                                            onClick={() => openProductModal(product)}
                                        >
                                            <div className="flex justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-lg">{product.name}</h3>
                                                    <p className={`text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {product.description}
                                                    </p>
                                                    {product.hasSupplements && product.supplements.length > 0 && (
                                                        <div className="flex items-center text-xs text-green-500 mb-2">
                                                            <Info size={12} className="mr-1" />
                                                            <span>Customizable options available</span>
                                                        </div>
                                                    )}
                                                    <div className="font-medium text-green-500">
                                                        ${product.price.toFixed(2)}
                                                    </div>
                                                </div>
                                                {product.image ? (
                                                    <div className="ml-4 w-20 h-20 rounded-lg overflow-hidden">
                                                        <img
                                                            src="/logo.png"
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="ml-4 flex items-center justify-center w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700">
                                                        <Plus size={20} className="text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Cart Section */}
                            <div className="w-full lg:w-1/3">
                                <div className={`p-4 ${cardBgClass} border ${borderClass} rounded-lg sticky top-24`}>
                                    <h2 className="text-xl font-bold mb-4 flex items-center">
                                        <ShoppingCart size={20} className="mr-2" />
                                        Your Order
                                    </h2>
                                    
                                    {cart.length === 0 ? (
                                        <div className="text-center py-8">
                                            <ShoppingCart size={36} className="mx-auto mb-4 text-gray-400" />
                                            <p className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Your cart is empty
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Add some delicious items from the menu
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="space-y-4 mb-6 max-h-80 overflow-auto">
                                                {cart.map((item, index) => (
                                                    <div key={index} className={`p-3 border ${borderClass} rounded-lg`}>
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <div className="flex items-start justify-between">
                                                                    <h3 className="font-medium">{item.name}</h3>
                                                                    <button
                                                                        onClick={() => removeFromCart(index)}
                                                                        className="text-red-500 hover:text-red-600 ml-2"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>
                                                                
                                                                {item.supplements.filter(s => s.selected).length > 0 && (
                                                                    <div className="mt-1 space-y-1">
                                                                        {item.supplements.filter(s => s.selected).map(supp => (
                                                                            <div key={supp.id} className="flex justify-between text-sm text-gray-500">
                                                                                <span>+ {supp.name}</span>
                                                                                <span>${supp.price.toFixed(2)}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                
                                                                <div className="flex items-center justify-between mt-2">
                                                                    <div className="flex items-center border rounded-md">
                                                                        <button
                                                                            onClick={() => changeCartItemQuantity(index, -1)}
                                                                            className={`px-2 py-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                                                        >
                                                                            <Minus size={14} />
                                                                        </button>
                                                                        <span className="px-2">{item.quantity}</span>
                                                                        <button
                                                                            onClick={() => changeCartItemQuantity(index, 1)}
                                                                            className={`px-2 py-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                                                        >
                                                                            <Plus size={14} />
                                                                        </button>
                                                                    </div>
                                                                    <div className="font-medium">
                                                                        ${((item.price + item.supplements
                                                                            .filter(s => s.selected)
                                                                            .reduce((total, s) => total + s.price, 0)) * item.quantity).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className={`pt-4 border-t ${borderClass}`}>
                                                <div className="flex justify-between mb-2">
                                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                                                    <span>${getSubtotal().toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Delivery Fee</span>
                                                    <span>${getDeliveryFee().toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between font-bold text-lg mt-3">
                                                    <span>Total</span>
                                                    <span>${getTotal().toFixed(2)}</span>
                                                </div>
                                                
                                                {orderType === 'delivery' && getSubtotal() < restaurant.minOrder && (
                                                    <div className="mt-3 p-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-sm rounded-lg">
                                                        Add ${(restaurant.minOrder - getSubtotal()).toFixed(2)} more to meet the minimum order amount for delivery.
                                                    </div>
                                                )}
                                                
                                                <button
                                                    onClick={handleCheckout}
                                                    className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mt-4 font-medium"
                                                    disabled={orderType === 'delivery' && getSubtotal() < restaurant.minOrder}
                                                >
                                                    Proceed to Checkout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Product Modal */}
            {isProductModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className={`w-full max-w-md ${cardBgClass} rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col`}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
                            <button
                                onClick={closeProductModal}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-4 overflow-auto flex-1">
                            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {selectedProduct.description}
                            </p>
                            
                            {selectedProduct.hasSupplements && selectedProduct.supplements.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Options</h4>
                                    <div className="space-y-2">
                                        {selectedProduct.supplements.map(supp => (
                                            <div 
                                                key={supp.id}
                                                className={`p-3 border ${borderClass} rounded-lg flex items-center justify-between cursor-pointer ${
                                                    supp.selected ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''
                                                }`}
                                                onClick={() => toggleSupplement(supp.id)}
                                            >
                                                <div className="flex items-center">
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                                        supp.selected 
                                                            ? 'bg-green-500 border-green-500' 
                                                            : `border-gray-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`
                                                    }`}>
                                                        {supp.selected && <Check size={12} className="text-white" />}
                                                    </div>
                                                    <span>{supp.name}</span>
                                                </div>
                                                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    +${supp.price.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center border rounded-md">
                                    <button
                                        onClick={() => changeProductQuantity(-1)}
                                        className={`px-3 py-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-4">{selectedProduct.quantity}</span>
                                    <button
                                        onClick={() => changeProductQuantity(1)}
                                        className={`px-3 py-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="font-medium text-lg">
                                    ${(selectedProduct.price + selectedProduct.supplements
                                        .filter(s => s.selected)
                                        .reduce((total, s) => total + s.price, 0)).toFixed(2)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 border-t">
                            <button
                                onClick={addToCart}
                                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                            >
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Checkout Modal */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className={`w-full max-w-2xl ${cardBgClass} rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col`}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-bold">Complete Your Order</h3>
                            <button
                                onClick={() => setIsCheckoutOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-4 overflow-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Customer Information */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">Your Information</h4>
                                    
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Name*
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User size={16} className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={customerInfo.name}
                                                onChange={handleCustomerInfoChange}
                                                className={`w-full ${inputBgClass} border ${borderClass} rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                                placeholder="Your full name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Phone Number*
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone size={16} className="text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={customerInfo.phone}
                                                onChange={handleCustomerInfoChange}
                                                className={`w-full ${inputBgClass} border ${borderClass} rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                                placeholder="Your phone number"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={customerInfo.email}
                                            onChange={handleCustomerInfoChange}
                                            className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                            placeholder="Your email address"
                                        />
                                    </div>
                                    
                                    {orderType === 'delivery' && (
                                        <div className="space-y-1">
                                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Delivery Address*
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPin size={16} className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={customerInfo.address}
                                                    onChange={handleCustomerInfoChange}
                                                    className={`w-full ${inputBgClass} border ${borderClass} rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                                    placeholder="Your full address"
                                                    required={orderType === 'delivery'}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="space-y-1">
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Order Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={customerInfo.notes}
                                            onChange={handleCustomerInfoChange}
                                            className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                                            placeholder="Any special instructions or requests"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                
                                {/* Order Summary */}
                                <div>
                                    <h4 className="font-medium mb-4">Order Summary</h4>
                                    
                                    <div className={`p-4 border ${borderClass} rounded-lg mb-4`}>
                                        <h5 className="font-medium mb-2">Items ({cart.length})</h5>
                                        <div className="space-y-3 max-h-40 overflow-auto mb-3">
                                            {cart.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <div>
                                                        <div className="flex items-start">
                                                            <span className="mr-1">{item.quantity}x</span>
                                                            <div>
                                                                <span>{item.name}</span>
                                                                {item.supplements.filter(s => s.selected).length > 0 && (
                                                                    <ul className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                        {item.supplements.filter(s => s.selected).map(supp => (
                                                                            <li key={supp.id}>+ {supp.name}</li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span>${((item.price + item.supplements
                                                        .filter(s => s.selected)
                                                        .reduce((total, s) => total + s.price, 0)) * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="border-t pt-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal</span>
                                                <span>${getSubtotal().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Delivery Fee</span>
                                                <span>${getDeliveryFee().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between font-bold pt-2 border-t">
                                                <span>Total</span>
                                                <span>${getTotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Payment Method */}
                                    <div className="mb-4">
                                        <h5 className="font-medium mb-2">Payment Method</h5>
                                        <div className="flex space-x-3">
                                            <div
                                                className={`flex-1 p-3 border rounded-lg cursor-pointer flex items-center ${
                                                    paymentMethod === 'card' 
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                                        : borderClass
                                                }`}
                                                onClick={() => setPaymentMethod('card')}
                                            >
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                                                    paymentMethod === 'card' 
                                                        ? 'bg-green-500 border-green-500' 
                                                        : `border-gray-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`
                                                }`}>
                                                    {paymentMethod === 'card' && <Check size={12} className="text-white" />}
                                                </div>
                                                <CreditCard size={18} className="mr-2" />
                                                <span>Card</span>
                                            </div>
                                            <div
                                                className={`flex-1 p-3 border rounded-lg cursor-pointer flex items-center ${
                                                    paymentMethod === 'cash' 
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                                        : borderClass
                                                }`}
                                                onClick={() => setPaymentMethod('cash')}
                                            >
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                                                    paymentMethod === 'cash' 
                                                        ? 'bg-green-500 border-green-500' 
                                                        : `border-gray-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`
                                                }`}>
                                                    {paymentMethod === 'cash' && <Check size={12} className="text-white" />}
                                                </div>
                                                <DollarSign size={18} className="mr-2" />
                                                <span>Cash</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 border-t flex justify-between">
                            <button
                                onClick={() => setIsCheckoutOpen(false)}
                                className={`px-4 py-2 border ${borderClass} rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                            >
                                Back to Order
                            </button>
                            <button
                                onClick={handleSubmitOrder}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}