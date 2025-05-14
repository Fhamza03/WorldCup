"use client";

import { useParams } from "next/navigation";
import Header from "@/components/dashboard/profile/provider/header";
import ProtectedRoute from "@/components/route/ProtectedRoute";
import dynamic from "next/dynamic";

// Dynamically import the RestaurantOrders component to handle client-side rendering
const RestaurantOrders = dynamic(() => import("@/components/dashboard/services/provider/Restoration/liste/commandes/RestaurantOrders"), {
  loading: () => <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>,
  ssr: false
});

const RestorationOrdersPage = () => {
  // Get the restaurant ID from the URL params
  const params = useParams();
  const restaurantId = params.id;

  if (!restaurantId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Restaurant ID Missing</h1>
          <p className="text-gray-600">Unable to load restaurant orders without an ID.</p>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <RestaurantOrders />
        </div>
      </div>
 
  );
};

export default RestorationOrdersPage;