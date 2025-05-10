"use client";

import React, { useRef } from 'react';

interface PrintOrderProps {
  order: {
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
  };
  restaurant: {
    name: string;
    address: string;
  };
}

const PrintOrderComponent: React.FC<PrintOrderProps> = ({ order, restaurant }) => {
  const printRef = useRef<HTMLDivElement>(null);



  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      {/* Boutons */}
      <div className="my-4 text-center flex justify-center gap-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Télécharger le reçu (PDF)
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Imprimer le reçu
        </button>
      </div>

      {/* Zone imprimable */}
      <div id="print-area" ref={printRef} className="bg-white p-6">
        <div className="p-6 max-w-4xl mx-auto bg-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto mr-4 no-pdf" />
 
            <div className="flex items-center">
            <div>
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <p className="text-gray-600">{restaurant.address}</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">Order Receipt</h2>
              <p className="text-gray-600">Order #{order.id}</p>
              <p className="text-gray-600">{formatDate(order.orderDate)}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Delivery Information</h3>
            <p>Address: {order.deliveryAddress}</p>
            <p>Phone: {order.phoneNumber}</p>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Order Items</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border">Item</th>
                  <th className="text-center p-2 border">Quantity</th>
                  <th className="text-right p-2 border">Price</th>
                  <th className="text-right p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 border">{item.productName}</td>
                    <td className="text-center p-2 border">{item.quantity}</td>
                    <td className="text-right p-2 border">${item.price.toFixed(2)}</td>
                    <td className="text-right p-2 border">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td colSpan={3} className="text-right p-2 border">
                    Total Amount:
                  </td>
                  <td className="text-right p-2 border">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Status */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Order Status</h3>
            <p>
              Order Status:{" "}
              <span className="font-medium">{order.orderStatus}</span>
            </p>
            <p>
              Payment Status:{" "}
              <span className="font-medium">{order.paymentStatus}</span>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600 text-sm mt-8 pt-4 border-t">
            <p>Thank you for your order!</p>
            <p>
              For any questions or concerns, please contact customer support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintOrderComponent;
