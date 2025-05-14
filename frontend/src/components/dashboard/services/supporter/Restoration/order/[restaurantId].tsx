"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/dashboard/profile/supporter/header";
import Footer from "@/components/auth/footer";
import PrintOrderComponent from "./PrintOrderComponent";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Rest of the imports remain the same...

interface Restaurant {
    id: number;
    name: string;
    description: string;
    address: string;
    image?: string;
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
    price: number;
    description: string;
}

interface CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
}

interface OrderResponse {
    id: number;
    orderDate: string;
    totalAmount: number;
    deliveryAddress: string;
    phoneNumber: string;
    orderStatus: string;
    paymentStatus: string;
    orderItems: {
        id: number;
        productName: string;
        quantity: number;
        price: number;
    }[];
}

interface OrderItemDTO {
    productId: number;
    quantity: number;
    price: number;
}

interface OrderPayload {
    orderDate: string;
    deliveryAddress: string;
    phoneNumber: string;
    orderItems: OrderItemDTO[];
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
}

export default function RestaurantOrder() {
    const params = useParams();
    const restaurantId = params?.restaurantId as string;

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    // Checkout related states
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");


    // Order response state to store completed order data
    const [completedOrder, setCompletedOrder] = useState<OrderResponse | null>(null);

    useEffect(() => {
        if (restaurantId) {
            fetchRestaurantData(restaurantId);
        }
    }, [restaurantId]);

    const fetchRestaurantData = async (id: string) => {
        setIsLoading(true);
        try {
            // Fetch restaurant details
            const restaurantResponse = await axios.get(`http://localhost:8083/api/restaurants/${id}`);
            setRestaurant(restaurantResponse.data);

            // Fetch menus
            const menuResponse = await axios.get(`http://localhost:8083/api/menus/restaurant/${id}`);
            const menusData = menuResponse.data;

            // Fetch products for each menu
            const menusWithProducts = await Promise.all(
                menusData.map(async (menu: Menu) => {
                    try {
                        const productResponse = await axios.get(`http://localhost:8083/api/products/menu/${menu.id}`);
                        return {
                            ...menu,
                            products: productResponse.data
                        };
                    } catch (err) {
                        console.error(`Error fetching products for menu ${menu.id}:`, err);
                        return {
                            ...menu,
                            products: []
                        };
                    }
                })
            );

            setMenus(menusWithProducts);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching restaurant data:", err);
            setError("Failed to load restaurant data. Please try again later.");
            setIsLoading(false);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, {
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    quantity: 1
                }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter(item => item.productId !== productId);
            }
        });
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // New function to open the print view in a new window
    const openPrintView = () => {
        if (completedOrder && restaurant) {
            const printWindow = window.open(`/print-view?orderId=${completedOrder.id}&restaurantId=${restaurantId}`, '_blank', 'width=800,height=600');

            if (!printWindow) {
                alert("Please allow pop-ups to print your receipt");
            }
        }
    };

    const handleCheckout = async () => {
        // Récupérer l'ID du supporter depuis le localStorage
        const supporterId = localStorage.getItem('userId');

        // Vérifier si l'ID du supporter est disponible
        if (!supporterId) {
            setCheckoutError("Vous devez être connecté pour passer une commande");
            return;
        }

        if (cart.length === 0) {
            setCheckoutError("Votre panier est vide");
            return;
        }

        if (!deliveryAddress) {
            setCheckoutError("Veuillez entrer une adresse de livraison");
            return;
        }

        if (!phoneNumber) {
            setCheckoutError("Veuillez entrer un numéro de téléphone");
            return;
        }

        setIsCheckingOut(true);
        setCheckoutError(null);

        try {
            // Préparer les articles de la commande à partir du panier
            const orderItems: OrderItemDTO[] = cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }));

            const orderPayload: OrderPayload = {
                orderDate: new Date().toISOString(),
                deliveryAddress,
                phoneNumber,
                orderItems,
                totalAmount: getCartTotal(),
                orderStatus: "PENDING", // Statut par défaut
                paymentStatus: "UNPAID"  // Statut de paiement par défaut
            };

            // Envoyer la commande à l'API avec l'ID du supporter récupéré du localStorage
            const response = await axios.post(
                `http://localhost:8083/api/orders/restaurant/${restaurantId}/supporter/${supporterId}`,
                orderPayload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Commande créée avec succès:", response.data);

            // Fetch the full order details with product names
            const orderDetailsResponse = await axios.get(
                `http://localhost:8083/api/orders/${response.data.id}/details`
            );

            // Store the completed order data
            setCompletedOrder(orderDetailsResponse.data);

            // Effacer le panier et afficher un message de succès
            setCart([]);
            setCheckoutSuccess(true);
            setDeliveryAddress("");
            setPhoneNumber("");
        } catch (err) {
            console.error("Erreur lors de la création de la commande:", err);
            setCheckoutError("Échec de la création de la commande. Veuillez réessayer.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
    const inputClass = `w-full p-2 rounded-md border ${borderClass} ${isDarkMode ? "bg-gray-700" : "bg-white"} mb-3`;

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex no-print">
                <div className="flex-1 pb-16">
                    <Header
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                        profilePhoto={profilePhoto}
                    />
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                            </div>
                        ) : error ? (
                            <div className="p-6 text-center">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : restaurant ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Restaurant Info */}
                                <div className="lg:col-span-2">

                                    <div className={`${cardBgClass} border ${borderClass} rounded-lg overflow-hidden`}>
                                        <div className="relative h-48 md:h-64">
                                            <img
                                                src={restaurant.image && restaurant.image.trim() !== "" ? restaurant.image : "/logo.png"}
                                                alt={restaurant.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            
                                            <div className="flex justify-between items-center mb-4">
                                                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                                                {restaurant.rating && (
                                                    <div className="flex items-center">
                                                        <span className="text-yellow-400">★</span>
                                                        <span className="ml-1">{restaurant.rating.toFixed(1)}</span>
                                                    </div>
                                                )}
                                                  <Link href="/dashboard/supporter/services/Restoration">
                                                <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                                    <ChevronLeft size={18} className="mr-1" />
                                                    Back to Restaurants
                                                </button>
                                            </Link>
                                            </div>
                                          
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">{restaurant.description}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h3 className="font-medium">Address</h3>
                                                    <p className="text-gray-600 dark:text-gray-300">{restaurant.address}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">Delivery Time</h3>
                                                    <p className="text-gray-600 dark:text-gray-300">{restaurant.deliveryTime || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menus */}
                                    <div className="mt-8">
                                        <h2 className="text-xl font-bold mb-4">Menu</h2>
                                        {menus.length > 0 ? (
                                            menus.map((menu) => (
                                                <div key={menu.id} className={`${cardBgClass} border ${borderClass} rounded-lg p-6 mb-6`}>
                                                    <h3 className="text-lg font-semibold mb-2">{menu.name}</h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{menu.description}</p>

                                                    {menu.products.length > 0 ? (
                                                        <div className="space-y-4">
                                                            {menu.products.map((product) => (
                                                                <div
                                                                    key={product.id}
                                                                    className={`border ${borderClass} rounded-lg p-4 flex justify-between items-center`}
                                                                >
                                                                    <div>
                                                                        <h4 className="font-medium">{product.name}</h4>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
                                                                        <p className="text-green-600 dark:text-green-400 font-medium mt-1">${product.price.toFixed(2)}</p>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => addToCart(product)}
                                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                                    >
                                                                        Add to Order
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500">No products available for this menu.</p>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No menus available for this restaurant.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <div className={`${cardBgClass} border ${borderClass} rounded-lg p-6 sticky top-8`}>
                                        <h2 className="text-xl font-bold mb-4">Your Order</h2>

                                        {checkoutSuccess ? (
                                            <div>
                                                <div className="p-4 bg-green-100 dark:bg-green-800 rounded-md mb-4 text-center">
                                                    <p className="text-green-700 dark:text-green-200 font-medium">
                                                        Order placed successfully! Thank you for your order.
                                                    </p>
                                                </div>

                                                {/* Print Receipt Button */}
                                                <button
                                                    onClick={openPrintView}
                                                    className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                    </svg>
                                                    Print Receipt
                                                </button>

                                                {/* Place New Order Button */}
                                                <button
                                                    onClick={() => {
                                                        setCheckoutSuccess(false);
                                                        setCompletedOrder(null);
                                                    }}
                                                    className="w-full mt-3 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                >
                                                    Place New Order
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {cart.length > 0 ? (
                                                    <>
                                                        <div className="space-y-4 mb-6">
                                                            {cart.map((item) => (
                                                                <div key={item.productId} className="flex justify-between items-center">
                                                                    <div>
                                                                        <p className="font-medium">{item.productName}</p>
                                                                        <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)} x {item.quantity}</p>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <button
                                                                            onClick={() => removeFromCart(item.productId)}
                                                                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <span>{item.quantity}</span>
                                                                        <button
                                                                            onClick={() => addToCart({ id: item.productId, name: item.productName, price: item.price, description: '' })}
                                                                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="border-t border-b py-4 mb-6">
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-bold">Total</span>
                                                                <span className="font-bold">${getCartTotal().toFixed(2)}</span>
                                                            </div>
                                                        </div>

                                                        {/* Delivery Information */}
                                                        <div className="mb-6">
                                                            <h3 className="font-medium mb-2">Delivery Information</h3>
                                                            <input
                                                                type="text"
                                                                placeholder="Delivery Address"
                                                                value={deliveryAddress}
                                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                                className={inputClass}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Phone Number"
                                                                value={phoneNumber}
                                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                                className={inputClass}
                                                            />
                                                        </div>

                                                        {checkoutError && (
                                                            <div className="p-3 mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
                                                                {checkoutError}
                                                            </div>
                                                        )}

                                                        <button
                                                            onClick={handleCheckout}
                                                            disabled={isCheckingOut}
                                                            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-500">Your order is empty. Add items from the menu.</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Restaurant not found.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}