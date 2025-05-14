"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, AlertCircle, Clock, User, Phone, CreditCard, Tag, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/auth/footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import Header from "@/components/dashboard/profile/supporter/header";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  restaurantId: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  notes: string;
  phoneNumber: string;
  supporter: {
    userId: number;
    firstName: string;
    lastName: string;
  };
  orderItems?: OrderItem[];
}

interface OrderDetailsDTO {
  id: number;
  orderDate: string;
  totalAmount: number;
  deliveryAddress: string;
  phoneNumber: string;
  orderStatus: string;
  paymentStatus: string;
  orderItems: OrderItemDetailsDTO[];
}

interface OrderItemDetailsDTO {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export default function RestaurantOrders() {
  const params = useParams();
  const restaurantId = params.id;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurant, setRestaurant] = useState<{ id: number; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsDTO | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    console.log("Restaurant ID:", restaurantId); // Debug log
    if (restaurantId) {
      fetchRestaurant(Number(restaurantId));
      fetchOrders(Number(restaurantId));
    } else {
      setError("Restaurant ID is missing");
      setIsLoading(false);
    }
  }, [restaurantId]);

  const fetchRestaurant = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8083/api/restaurants/${id}`);
      setRestaurant({ id: response.data.id, name: response.data.name });
    } catch (err) {
      console.error("Error fetching restaurant:", err);
      setError("Failed to load restaurant information.");
    }
  };

  const fetchOrders = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8083/api/orders/restaurant/${id}`);
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
    } catch (err) {
      console.error("Error fetching order details:", err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load order details.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleUpdatePaymentStatus = async (orderId: number, currentStatus: string) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Update Payment Status',
      input: 'select',
      inputOptions: {
        'PENDING': 'Pending',
        'PAID': 'Paid',
        'FAILED': 'Failed'
      },
      inputValue: currentStatus,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to select a status!';
        }
      }
    });

    if (newStatus && newStatus !== currentStatus) {
      try {
        await axios.patch(`http://localhost:8083/api/orders/${orderId}/payment-status?paymentStatus=${newStatus}`);

        // Update the orders list
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, paymentStatus: newStatus } : order
        ));

        // Update selected order if it's open
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
        }

        Swal.fire({
          title: 'Updated!',
          text: 'Payment status has been updated successfully.',
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      } catch (err) {
        console.error("Error updating payment status:", err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update payment status.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, currentStatus: string) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Update Order Status',
      input: 'select',
      inputOptions: {
        'PENDING': 'Pending',
        'CONFIRMED': 'Confirmed',
        'PREPARING': 'Preparing',
        'READY': 'Ready',
        'COMPLETED': 'Completed',
        'CANCELLED': 'Cancelled'
      },
      inputValue: currentStatus,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to select a status!';
        }
      }
    });

    if (newStatus && newStatus !== currentStatus) {
      try {
        await axios.patch(`http://localhost:8083/api/orders/${orderId}/status?status=${newStatus}`);

        // Update the orders list
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ));

        // Update selected order if it's open
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
        }

        Swal.fire({
          title: 'Updated!',
          text: 'Order status has been updated successfully.',
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      } catch (err) {
        console.error("Error updating order status:", err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update order status.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'PREPARING': return 'bg-purple-100 text-purple-800';
      case 'READY': return 'bg-indigo-100 text-indigo-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.supporter?.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order.supporter?.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      (order.phoneNumber || '').includes(searchTerm);

    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";
  const buttonClass = isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300";

  return (
 
    
<div className={`min-h-screen  w-full  flex flex-col items-center ${themeClass}`}>

  <Header
    isDarkMode={isDarkMode}
    toggleTheme={toggleTheme}
    profilePhoto={profilePhoto}
  />
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
    <div className="flex justify-between items-center">
      <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        Orders {restaurant && `for ${restaurant.name}`}
      </h1>
      <Link href="/dashboard/provider/services/Restoration/liste">
        <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
          <ChevronLeft size={18} className="mr-1" />
          Back to Restaurants
        </button>
      </Link>
    </div>

    {/* Search and Filter Section */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex items-center border rounded-lg overflow-hidden flex-1">
        <div className="pl-3">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by customer name, order ID, or phone..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`w-full px-3 py-3 ${cardBgClass} focus:outline-none`}
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'ALL' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('ALL')}
        >
          All
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'PENDING' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('PENDING')}
        >
          Pending
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'CONFIRMED' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('CONFIRMED')}
        >
          Confirmed
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'PREPARING' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('PREPARING')}
        >
          Preparing
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'READY' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('READY')}
        >
          Ready
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'COMPLETED' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('COMPLETED')}
        >
          Completed
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${filterStatus === 'CANCELLED' ? 'bg-green-500 text-white' : buttonClass}`}
          onClick={() => setFilterStatus('CANCELLED')}
        >
          Cancelled
        </button>
      </div>
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
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-xl font-medium">No orders found</p>
        <p className="text-gray-500 mt-2">There are no orders matching your search criteria.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 mt-8">
        {filteredOrders.map((order) => (
          <div key={order.id} className={`border ${borderClass} rounded-lg overflow-hidden shadow-md ${cardBgClass}`}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Order #{order.id}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span>{formatDate(order.orderDate)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="mb-2 md:mb-0">
                  <div className="flex items-center text-sm mb-1">
                    <User size={16} className="mr-2" />
                    <span className="font-medium">{order.supporter?.firstName} {order.supporter?.lastName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="mr-2" />
                    <span>{order.phoneNumber || 'No phone number'}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <CreditCard size={16} className="mr-2" />
                  <span className="font-medium">{order.totalAmount.toFixed(2)} MAD</span>
                </div>
              </div>

              <div className="border-t pt-3 mt-3 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                <div>
                  <Tag size={16} className="inline mr-2" />
                  <span className="text-sm">{order.notes || 'No delivery notes'}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => fetchOrderDetails(order.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order.id, order.status)}
                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => handleUpdatePaymentStatus(order.id, order.paymentStatus)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Update Payment Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Order Details Modal */}
  {selectedOrder && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${cardBgClass} rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Order #{selectedOrder.id} Details</h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Order Date:</p>
              <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount:</p>
              <p className="font-medium">{selectedOrder.totalAmount.toFixed(2)} MAD</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Status:</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.orderStatus)}`}>
                {selectedOrder.orderStatus}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status:</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                {selectedOrder.paymentStatus}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number:</p>
              <p className="font-medium">{selectedOrder.phoneNumber || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Address:</p>
              <p className="font-medium">{selectedOrder.deliveryAddress || 'Not provided'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Order Items</h3>
            <div className={`border ${borderClass} rounded-lg overflow-hidden`}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrder.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.price.toFixed(2)} MAD
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {(item.price * item.quantity).toFixed(2)} MAD
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      Total:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                      {selectedOrder.totalAmount.toFixed(2)} MAD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => handleUpdateOrderStatus(selectedOrder.id, selectedOrder.orderStatus)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Update Status
            </button>
            <button
              onClick={() => handleUpdatePaymentStatus(selectedOrder.id, selectedOrder.paymentStatus)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Update Payment Status
            </button>

            <button
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
       
    </div>
  )}
  <div className="w-full">
  <Footer  />
  </div>

 
</div>

  );
}