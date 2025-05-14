"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

interface OrderType {
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

interface RestaurantType {
  name: string;
  address: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantInfo: {
    width: '50%',
  },
  orderInfo: {
    width: '50%',
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  subtext: {
    fontSize: 10,
    color: '#666',
  },
  table: {
    display: 'flex',
    width: '100%',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  tableColProduct: {
    width: '40%',
  },
  tableColQuantity: {
    width: '20%',
    textAlign: 'center',
  },
  tableColPrice: {
    width: '20%',
    textAlign: 'right',
  },
  tableColTotal: {
    width: '20%',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

const OrderPDF = ({ order, restaurant }: { order: OrderType; restaurant: RestaurantType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.logoContainer}>
        <Image src="/logo.png" style={styles.logo} />
      </View>

      <View style={styles.header}>
        <View style={styles.restaurantInfo}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtext}>{restaurant.address}</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Reçu de commande</Text>
          <Text style={styles.text}>Commande #{order.id}</Text>
          <Text style={styles.subtext}>{new Date(order.orderDate).toLocaleString()}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>Informations de livraison</Text>
        <Text style={styles.text}>Adresse : {order.deliveryAddress}</Text>
        <Text style={styles.text}>Téléphone : {order.phoneNumber}</Text>
      </View>

      <View>
        <Text style={styles.subtitle}>Articles commandés</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColProduct}>Produit</Text>
            <Text style={styles.tableColQuantity}>Quantité</Text>
            <Text style={styles.tableColPrice}>Prix</Text>
            <Text style={styles.tableColTotal}>Total</Text>
          </View>
          {order.orderItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableColProduct}>{item.productName}</Text>
              <Text style={styles.tableColQuantity}>{item.quantity}</Text>
              <Text style={styles.tableColPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.tableColTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={{ width: '80%', textAlign: 'right' }}>Montant total:</Text>
            <Text style={styles.tableColTotal}>${order.totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>Statuts</Text>
        <Text style={styles.text}>Commande : {order.orderStatus}</Text>
        <Text style={styles.text}>Paiement : {order.paymentStatus}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Merci pour votre commande !</Text>
        <Text>Contactez notre service client si vous avez des questions.</Text>
      </View>
    </Page>
  </Document>
);

export default function PrintViewPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const restaurantId = searchParams.get('restaurantId');

  const [order, setOrder] = useState<OrderType | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

  useEffect(() => {
    if (orderId && restaurantId) {
      fetch(`http://localhost:8083/api/orders/${orderId}/details`)
        .then(res => res.json())
        .then(setOrder);
      fetch(`http://localhost:8083/api/restaurants/${restaurantId}`)
        .then(res => res.json())
        .then(setRestaurant);
    }
  }, [orderId, restaurantId]);

  if (!order || !restaurant) return <div className="text-center mt-10 text-gray-600">Chargement...</div>;

  return (
    <div className="p-6 print:p-0 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto mb-4 flex justify-end print:hidden">
        <PDFDownloadLink
          document={<OrderPDF order={order} restaurant={restaurant} />}
          fileName={`commande-${order.id}.pdf`}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {({ loading }) => loading ? 'Préparation du PDF...' : 'Télécharger PDF'}
        </PDFDownloadLink>
      </div>

      <div>
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-28 object-contain" />
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow print:shadow-none print:border print:border-gray-300">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{restaurant.name}</h1>
              <p className="text-gray-500 text-sm">{restaurant.address}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-gray-700">Reçu de commande</h2>
              <p className="text-gray-600">Commande #{order.id}</p>
              <p className="text-gray-500 text-sm">{new Date(order.orderDate).toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Informations de livraison</h3>
            <p className="text-gray-600">Adresse : {order.deliveryAddress}</p>
            <p className="text-gray-600">Téléphone : {order.phoneNumber}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Articles commandés</h3>
            <div className="border rounded">
              <div className="grid grid-cols-4 bg-gray-100 p-2 font-semibold text-sm text-gray-700">
                <span>Produit</span>
                <span className="text-center">Quantité</span>
                <span className="text-right">Prix</span>
                <span className="text-right">Total</span>
              </div>
              {order.orderItems.map(item => (
                <div key={item.id} className="grid grid-cols-4 p-2 border-t text-sm">
                  <span>{item.productName}</span>
                  <span className="text-center">{item.quantity}</span>
                  <span className="text-right">${item.price.toFixed(2)}</span>
                  <span className="text-right">${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
              <div className="grid grid-cols-4 p-2 border-t font-semibold text-sm">
                <span className="col-span-3 text-right">Montant total :</span>
                <span className="text-right">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Statuts</h3>
            <p className="text-gray-600">Commande : {order.orderStatus}</p>
            <p className="text-gray-600">Paiement : {order.paymentStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
