"use client";

import { useState, useEffect } from "react";
import { Search, Clock, ArrowRight, ChevronLeft, Package, Filter, AlertCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/dashboard/profile/supporter/header";
import Footer from "@/components/auth/footer";
import axios from "axios";

interface Order {
    id: number;
    orderDate: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    notes: string;
    phoneNumber: string;
    restaurant: {
        id: number;
        name: string;
        image?: string;
    };
}

interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

interface OrderDetails extends Order {
    orderItems: OrderItem[];
}

export default function SupporterOrders() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");


    useEffect(() => {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchOrders(parseInt(userId));
        } else {
            setError("User ID not found. Please log in again.");
            setIsLoading(false);
        }
    }, []);

    const fetchOrders = async (userId: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8083/api/orders/supporter/${userId}`);
            setOrders(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders. Please try again later.");
            setIsLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId: number) => {
        try {
            const response = await axios.get(`http://localhost:8083/api/orders/${orderId}/details`);
            setSelectedOrder(response.data);
            setIsDetailsOpen(true);
        } catch (err) {
            console.error("Error fetching order details:", err);
            alert("Failed to load order details. Please try again.");
        }
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const closeDetails = () => {
        setIsDetailsOpen(false);
        setSelectedOrder(null);
    };

    const filteredOrders = orders.filter((order) =>
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
    );

    const formatDate = (dateString: string) => {
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
        switch (status) {
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
        switch (status) {
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
                <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
                    <div className="flex justify-between items-center">
                        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            My Orders
                        </h1>
                        <Link href="/dashboard/supporter/services/Restoration">
                            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                <ChevronLeft size={18} className="mr-1" />
                                Back to Restaurants
                            </button>
                        </Link>
                    </div>

                    {/* Search Section */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <div className="pl-3">
                            <Search size={20} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by restaurant name, status or order ID..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={`w-full px-3 py-3 ${cardBgClass} focus:outline-none`}
                        />
                    </div>

                    {/* Orders List */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-center">
                            <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                            <p className="text-red-500 text-lg">{error}</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="p-6 text-center">
                            <Package size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-xl font-medium">No orders found</p>
                            <p className="text-gray-500 mt-2">You haven't placed any orders yet, or your search returned no results.</p>
                            <Link href="/dashboard/supporter/services/Restoration">
                                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                    Browse Restaurants
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className={`min-w-full border ${borderClass} mt-4`}>
                                <thead className={tableHeadClass}>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Restaurant</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Payment</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    { }
                                                    <div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Clock size={16} className="mr-1 text-gray-500" />
                                                    <span>{formatDate(order.orderDate)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                ${order.totalAmount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => fetchOrderDetails(order.id)}
                                                    className="text-blue-600 hover:text-blue-900 font-medium"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {isDetailsOpen && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className={`${cardBgClass} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>
                                    <button
                                        onClick={closeDetails}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Order Information</h3>
                                        <p><span className="font-medium">Date:</span> {formatDate(selectedOrder.orderDate)}</p>
                                        <p><span className="font-medium">Phone:</span> {selectedOrder.phoneNumber}</p>
                                        <p><span className="font-medium">Notes/Address:</span> {selectedOrder.notes || "None"}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Status</h3>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                {selectedOrder.status}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                                                Payment: {selectedOrder.paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4">Items</h3>
                                    <div className={`border ${borderClass} rounded-lg overflow-hidden`}>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className={tableHeadClass}>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {selectedOrder.orderItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className={`${tableHeadClass} border-t-2 ${borderClass}`}>
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-4 text-right font-bold">Total:</td>
                                                    <td className="px-6 py-4 font-bold">${selectedOrder.totalAmount.toFixed(2)}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={closeDetails}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
}