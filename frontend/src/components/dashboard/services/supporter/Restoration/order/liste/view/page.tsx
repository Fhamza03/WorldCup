"use client";

import { useState, useEffect } from "react";
import {
    ChevronLeft,
    Clock,
    MapPin,
    Phone,
    Check,
    AlertCircle,
    ArrowLeft,
    Loader2
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/dashboard/profile/supporter/header";
import Footer from "@/components/auth/footer";
import axios from "axios";

interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

interface OrderDetails {
    id: number;
    orderDate: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    deliveryAddress: string; // Changed from notes to match backend DTO
    phoneNumber: string;
    orderItems: OrderItem[];
    restaurant: {
        id: number;
        name: string;
        image?: string;
    };
}

export default function ViewOrderDetails() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");

    // Get order ID from the URL or localStorage
    useEffect(() => {
        // In client-side rendering, we need to ensure window is available
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const urlOrderId = params.get("id");
            const storedOrderId = localStorage.getItem("selectedOrderId");

            const orderId = urlOrderId || storedOrderId;

            if (orderId) {
                fetchOrderDetails(parseInt(orderId));
            } else {
                setError("Order ID not found");
                setIsLoading(false);
            }
        }
    }, []);

    const fetchOrderDetails = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8083/api/orders/${id}/details`);
            if (response.data) {
                // Transform backend data to match frontend interface
                const orderData = {
                    ...response.data,
                    status: response.data.orderStatus, // Map orderStatus to status
                    // Add restaurant info since it's completely missing in the API response
                    restaurant: {
                        id: 0,
                        name: "Restaurant information unavailable"
                    }
                };
                setOrder(orderData);
            } else {
                setError("Order details not found");
            }
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching order details:", err);
            setError("Failed to load order details. Please try again later.");
            setIsLoading(false);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        if (!status) return "bg-gray-100 text-gray-800";

        switch (status.toUpperCase()) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "CONFIRMED":
                return "bg-blue-100 text-blue-800";
            case "PREPARING":
                return "bg-purple-100 text-purple-800";
            case "READY":
                return "bg-indigo-100 text-indigo-800";
            case "COMPLETED":
                return "bg-green-100 text-green-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPaymentStatusColor = (status: string) => {
        if (!status) return "bg-gray-100 text-gray-800";

        switch (status.toUpperCase()) {
            case "PAID":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "FAILED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        if (!status) return <Clock className="mr-2 h-4 w-4" />;

        switch (status.toUpperCase()) {
            case "COMPLETED":
                return <Check className="mr-2 h-4 w-4" />;
            case "CANCELLED":
                return <AlertCircle className="mr-2 h-4 w-4" />;
            default:
                return <Clock className="mr-2 h-4 w-4" />;
        }
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
    const tableHeadClass = isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700";

    return (
        <div className={`min-h-screen ${themeClass}`}>
            <div className="min-h-screen flex flex-col">
                <Header
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    profilePhoto={profilePhoto}
                />
                <div className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
                    <div className="mb-6">
                        <Link href="/dashboard/supporter/orders">
                            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                                <ArrowLeft size={16} className="mr-1" />
                                Back to Orders
                            </button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 size={40} className="animate-spin text-green-500" />
                            <span className="ml-2 text-lg">Loading order details...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <AlertCircle size={64} className="text-red-500 mb-4" />
                            <h2 className="text-xl font-bold mb-2">Error</h2>
                            <p className="text-center text-red-500">{error}</p>
                            <Link href="/dashboard/supporter/orders">
                                <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Return to Orders
                                </button>
                            </Link>
                        </div>
                    ) : order ? (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Order #{order.id}
                                </h1>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Order Summary Card */}
                            <div className={`${cardBgClass} rounded-lg shadow-md border ${borderClass} p-6`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Clock size={20} className="mr-3 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Order Date</p>
                                                    <p className="font-medium">{formatDate(order.orderDate)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <MapPin size={20} className="mr-3 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Delivery Address/Notes</p>
                                                    <p className="font-medium">{order.deliveryAddress || "Not specified"}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <Phone size={20} className="mr-3 text-gray-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Contact Number</p>
                                                    <p className="font-medium">{order.phoneNumber || "Not specified"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Restaurant</h2>
                                        { }
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            {order.orderItems && order.orderItems.length > 0 ? (
                                <div className={`${cardBgClass} rounded-lg shadow-md border ${borderClass} overflow-hidden`}>
                                    <div className={`p-6 border-b ${borderClass}`}>
                                        <h2 className="text-xl font-bold">Order Items</h2>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className={tableHeadClass}>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {order.orderItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium">{item.productName}</div>
                                                            <div className="text-sm text-gray-500">ID: {item.productId}</div>
                                                        </td>
                                                        <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                                                                {item.quantity}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className={`${tableHeadClass} border-t-2 ${borderClass}`}>
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-4 text-right font-bold">Total Amount:</td>
                                                    <td className="px-6 py-4 font-bold text-lg">${order.totalAmount.toFixed(2)}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className={`${cardBgClass} rounded-lg shadow-md border ${borderClass} p-6 text-center`}>
                                    <AlertCircle size={32} className="mx-auto mb-2 text-yellow-500" />
                                    <p>No order items found</p>
                                </div>
                            )}

                            {/* Order Timeline */}
                            <div className={`${cardBgClass} rounded-lg shadow-md border ${borderClass} p-6`}>
                                <h2 className="text-xl font-bold mb-4">Order Timeline</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex items-center justify-center bg-green-100 rounded-full h-8 w-8 mr-4">
                                            <Check className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Order Placed</p>
                                            <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                                        </div>
                                    </div>

                                    {/* Current status */}
                                    <div className="flex items-start">
                                        <div className={`flex items-center justify-center ${order.status === "COMPLETED" ? "bg-green-100" :
                                                order.status === "CANCELLED" ? "bg-red-100" :
                                                    "bg-blue-100"
                                            } rounded-full h-8 w-8 mr-4`}>
                                            {getStatusIcon(order.status)}
                                        </div>
                                        <div>
                                            <p className="font-medium">Current Status: {order.status}</p>
                                            <p className="text-sm text-gray-500">
                                                {order.status === "COMPLETED" ? "Your order has been completed" :
                                                    order.status === "CANCELLED" ? "Your order has been cancelled" :
                                                        "Your order is being processed"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 justify-end">
                                <Link href="/dashboard/supporter/orders">
                                    <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors">
                                        Back to Orders
                                    </button>
                                </Link>
                                {order.status === "PENDING" && (
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                        Cancel Order
                                    </button>
                                )}
                                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <AlertCircle size={64} className="text-yellow-500 mb-4" />
                            <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
                            <p className="text-center">We couldn't find any details for this order.</p>
                            <Link href="/dashboard/supporter/orders">
                                <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Return to Orders
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
}