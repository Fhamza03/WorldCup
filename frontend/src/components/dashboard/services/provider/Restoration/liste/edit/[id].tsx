"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { 
  Save, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  AlertCircle, 
  Building, 
  PlusCircle, 
  Trash2, 
  Plus, 
  Minus
} from "lucide-react";
import Swal from "sweetalert2";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

interface Menu {
  id: number;
  name: string;
  description: string;
  isSpecialOffer: boolean;
  originalPrice: number;
  discountedPrice: number;
  products: Product[];
}

interface RestaurantDetails {
  id: number;
  name: string;
  description: string;
  address: string;
  location: string;
  cuisineType: string;
  contactPhone: string;
  email: string;
  isPartner: boolean;
  openingHours: Record<string, string>;
  menus: Menu[];
  image?: string;
}

export default function EditRestaurantClient() {
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.id ? parseInt(params.id as string) : null;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>("/logo.png");

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantDetails();
    }
  }, [restaurantId]);

  // Function to normalize the restaurant data (handle null values, etc.)
  const normalizeRestaurantData = (data: any): RestaurantDetails => {
    // Make sure the menus array exists
    const menus = data.menus || [];
    
    // Process each menu and its products
    const processedMenus = menus.map((menu: any) => {
      // Make sure the products array exists
      const products = menu.products || [];
      
      // Process each product
      const processedProducts = products.map((product: any) => {
        return {
          ...product,
          // Set default value for isAvailable if it's null
          isAvailable: product.isAvailable === null ? false : Boolean(product.isAvailable)
        };
      });
      
      return {
        ...menu,
        products: processedProducts
      };
    });
    
    return {
      ...data,
      // Make sure the location property exists
      location: data.location || "",
      menus: processedMenus
    };
  };

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8083/api/restaurants/${restaurantId}/details`
      );
      
      // Normalize the data before setting state
      setRestaurant(normalizeRestaurantData(response.data));
    } catch (err) {
      console.error("Error fetching restaurant details:", err);
      Swal.fire({
        title: 'Erreur!',
        text: 'Impossible de charger les détails du restaurant.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantChange = (field: keyof RestaurantDetails, value: any) => {
    if (!restaurant) return;
    setRestaurant({ ...restaurant, [field]: value });
  };

  const handleMenuChange = (menuIndex: number, field: keyof Menu, value: any) => {
    if (!restaurant) return;
    const updatedMenus = [...(restaurant.menus ?? [])];
    updatedMenus[menuIndex] = {
      ...updatedMenus[menuIndex],
      [field]: value,
    };

    setRestaurant({
      ...restaurant,
      menus: updatedMenus,
    });
  };

  // Fix for isAvailable which might be null in the API response
  const handleMenuProductChange = (menuIndex: number, productIndex: number, field: keyof Product, value: any) => {
    if (!restaurant) return;
    const updatedMenus = [...(restaurant.menus ?? [])];
    const updatedProducts = [...updatedMenus[menuIndex].products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      [field]: value,
    };
    updatedMenus[menuIndex].products = updatedProducts;

    setRestaurant({
      ...restaurant,
      menus: updatedMenus,
    });
  };

  // Add a new menu
  const addMenu = () => {
    if (!restaurant) return;
    
    // Generate a temporary negative ID to ensure uniqueness
    const newMenuId = -Date.now();
    const newMenu: Menu = {
      id: newMenuId,
      name: "Nouveau Menu",
      description: "Description du menu",
      isSpecialOffer: false,
      originalPrice: 0,
      discountedPrice: 0,
      products: []
    };
    
    setRestaurant({
      ...restaurant,
      menus: [...(restaurant.menus ?? []), newMenu]
    });
  };

  // Delete a menu
  const deleteMenu = (menuIndex: number) => {
    if (!restaurant) return;
    
    Swal.fire({
      title: 'Supprimer le menu?',
      text: 'Cette action ne peut pas être annulée!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedMenus = [...(restaurant.menus ?? [])];
        updatedMenus.splice(menuIndex, 1);
        
        setRestaurant({
          ...restaurant,
          menus: updatedMenus
        });
        
        Swal.fire(
          'Supprimé!',
          'Le menu a été supprimé.',
          'success'
        );
      }
    });
  };

  // Add a new product to a menu
  const addProduct = (menuIndex: number) => {
    if (!restaurant) return;
    
    // Generate a temporary negative ID to ensure uniqueness
    const newProductId = -Date.now();
    const newProduct: Product = {
      id: newProductId,
      name: "Nouveau Produit",
      description: "Description du produit",
      price: 0,
      isAvailable: true
    };
    
    const updatedMenus = [...(restaurant.menus ?? [])];
    const updatedProducts = [...updatedMenus[menuIndex].products, newProduct];
    updatedMenus[menuIndex].products = updatedProducts;
    
    setRestaurant({
      ...restaurant,
      menus: updatedMenus
    });
  };

  // Delete a product from a menu
  const deleteProduct = (menuIndex: number, productIndex: number) => {
    if (!restaurant) return;
    
    Swal.fire({
      title: 'Supprimer le produit?',
      text: 'Cette action ne peut pas être annulée!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedMenus = [...(restaurant.menus ?? [])];
        const updatedProducts = [...updatedMenus[menuIndex].products];
        updatedProducts.splice(productIndex, 1);
        updatedMenus[menuIndex].products = updatedProducts;
        
        setRestaurant({
          ...restaurant,
          menus: updatedMenus
        });
        
        Swal.fire(
          'Supprimé!',
          'Le produit a été supprimé.',
          'success'
        );
      }
    });
  };

  const saveChanges = async () => {
    if (!restaurant || !restaurantId) return;
    
    Swal.fire({
      title: 'Confirmer les modifications',
      text: 'Êtes-vous sûr de vouloir enregistrer ces modifications?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, enregistrer',
      cancelButtonText: 'Annuler'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send details to the endpoint specified in requirements
          await axios.put(`http://localhost:8083/api/restaurants/${restaurantId}/details`, restaurant);
          
          Swal.fire({
            title: 'Succès!',
            text: 'Restaurant mis à jour avec succès!',
            icon: 'success',
            confirmButtonColor: '#10b981'
          }).then(() => {
            router.push("/dashboard/provider/services/Restoration/liste");
          });
        } catch (err) {
          console.error("Erreur lors de la mise à jour :", err);
          Swal.fire({
            title: 'Erreur!',
            text: 'Erreur lors de la mise à jour du restaurant.',
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  };

  const formatOpeningHours = (openingHours?: Record<string, string>) => {
    if (!openingHours || Object.keys(openingHours).length === 0) {
      return "Hours not specified";
    }
    
    const firstDay = Object.keys(openingHours)[0];
    return `${firstDay}: ${openingHours[firstDay]}`;
  };

  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="p-6 text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
        <p className="text-red-500 text-lg">Aucun restaurant trouvé</p>
        <Link href="/dashboard/provider/services/Restoration">
          <button className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <ChevronLeft size={18} className="mr-1 inline" />
            Retour à la liste
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClass}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Modifier le Restaurant
          </h1>
          <Link href="/dashboard/provider/services/Restoration">
            <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <ChevronLeft size={18} className="mr-1" />
              Retour à la liste
            </button>
          </Link>
        </div>

        {/* Restaurant Info Card */}
        <div className={`border ${borderClass} rounded-lg overflow-hidden shadow-md mb-8`}>
          <div className="h-40 bg-gray-300 relative">
            {restaurant.image ? (
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/logo.png"
                alt="Restaurant Logo"
                className="w-full h-full object-contain p-4"
              />
            )}
            <div className={`absolute top-2 right-2 ${restaurant.isPartner ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} px-2 py-1 rounded-full text-xs font-medium`}>
              {restaurant.isPartner ? "Partner" : "Non-Partner"}
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Nom du restaurant</label>
              <input
                className={`w-full border ${borderClass} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                value={restaurant.name}
                onChange={(e) => handleRestaurantChange("name", e.target.value)}
                placeholder="Nom du restaurant"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className={`w-full border ${borderClass} p-3 rounded-lg h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                value={restaurant.description}
                onChange={(e) => handleRestaurantChange("description", e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Type de cuisine</label>
                <input
                  className={`w-full border ${borderClass} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                  value={restaurant.cuisineType}
                  onChange={(e) => handleRestaurantChange("cuisineType", e.target.value)}
                  placeholder="Type de cuisine"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Localisation</label>
                <input
                  className={`w-full border ${borderClass} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                  value={restaurant.location || ""}
                  onChange={(e) => handleRestaurantChange("location", e.target.value)}
                  placeholder="Localisation"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Adresse</label>
              <div className="relative">
                <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className={`w-full border ${borderClass} p-3 pl-10 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                  value={restaurant.address}
                  onChange={(e) => handleRestaurantChange("address", e.target.value)}
                  placeholder="Adresse complète"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  className={`w-full border ${borderClass} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                  value={restaurant.contactPhone}
                  onChange={(e) => handleRestaurantChange("contactPhone", e.target.value)}
                  placeholder="Numéro de téléphone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  className={`w-full border ${borderClass} p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                  value={restaurant.email}
                  onChange={(e) => handleRestaurantChange("email", e.target.value)}
                  placeholder="Adresse email"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menus & Products Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Menus & Produits
          </h2>
          <button 
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={addMenu}
          >
            <PlusCircle size={18} className="mr-2" />
            Ajouter un menu
          </button>
        </div>
        
        {restaurant.menus && restaurant.menus.length > 0 ? (
          restaurant.menus.map((menu, menuIndex) => (
            <div key={menu.id} className={`border ${borderClass} rounded-lg p-6 mb-6 shadow-md ${cardBgClass}`}>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <div>
                  <div className="flex items-center">
                    <input
                      className={`text-lg font-semibold bg-transparent border-b ${borderClass} outline-none focus:border-green-500 mb-1 w-full`}
                      value={menu.name}
                      onChange={(e) => handleMenuChange(menuIndex, "name", e.target.value)}
                      placeholder="Nom du menu"
                    />
                  </div>
                  <textarea
                    className={`text-sm text-gray-500 bg-transparent border ${borderClass} rounded p-2 w-full mt-2`}
                    value={menu.description}
                    onChange={(e) => handleMenuChange(menuIndex, "description", e.target.value)}
                    placeholder="Description du menu"
                    rows={2}
                  />
                </div>
                <button 
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                  onClick={() => deleteMenu(menuIndex)}
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex items-center mb-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-green-600"
                    checked={menu.isSpecialOffer}
                    onChange={(e) => handleMenuChange(menuIndex, "isSpecialOffer", e.target.checked)}
                  />
                  <span className="ml-2 text-sm font-medium">Offre Spéciale</span>
                </label>
                
                {menu.isSpecialOffer && (
                  <div className="ml-4 flex items-center space-x-2">
                    <div>
                      <label className="block text-xs">Prix Original (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        className={`border ${borderClass} p-1 rounded w-20`}
                        value={menu.originalPrice}
                        onChange={(e) => handleMenuChange(menuIndex, "originalPrice", parseFloat(e.target.value))}
                      />
                    </div>
                    <span className="text-gray-500">→</span>
                    <div>
                      <label className="block text-xs">Prix Réduit (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        className={`border ${borderClass} p-1 rounded w-20`}
                        value={menu.discountedPrice}
                        onChange={(e) => handleMenuChange(menuIndex, "discountedPrice", parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Produits</h4>
                  <button 
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    onClick={() => addProduct(menuIndex)}
                  >
                    <Plus size={16} className="mr-1" />
                    Ajouter un produit
                  </button>
                </div>
                
                {menu.products && menu.products.length > 0 ? (
                  menu.products.map((product, productIndex) => (
                    <div key={product.id} className={`border ${borderClass} rounded-lg p-4 transition-all hover:shadow-md`}>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Produit #{productIndex + 1}</h4>
                        <div className="flex items-center">
                          <div className={`px-2 py-1 rounded-full text-xs ${product.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} mr-2`}>
                            {product.isAvailable ? "Disponible" : "Non disponible"}
                          </div>
                          <button 
                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                            onClick={() => deleteProduct(menuIndex, productIndex)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium mb-1">Nom</label>
                          <input
                            className={`w-full border ${borderClass} p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none`}
                            value={product.name}
                            onChange={(e) => handleMenuProductChange(menuIndex, productIndex, "name", e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1">Description</label>
                          <textarea
                            className={`w-full border ${borderClass} p-2 rounded h-20 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none`}
                            value={product.description}
                            onChange={(e) => handleMenuProductChange(menuIndex, productIndex, "description", e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex-1">
                            <label className="block text-xs font-medium mb-1">Prix (€)</label>
                            <input
                              className={`w-full border ${borderClass} p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none`}
                              type="number"
                              step="0.01"
                              value={product.price}
                              onChange={(e) => handleMenuProductChange(menuIndex, productIndex, "price", parseFloat(e.target.value))}
                            />
                          </div>
                          
                          <div className="ml-4">
                            <label className="block text-xs font-medium mb-1">Disponibilité</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input 
                                type="checkbox" 
                                checked={product.isAvailable === true}
                                onChange={(e) => handleMenuProductChange(menuIndex, productIndex, "isAvailable", e.target.checked)}
                                className="appearance-none absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 cursor-pointer transition-transform duration-200 ease-in transform" 
                              />
                              <label 
                                className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${product.isAvailable === true ? "bg-green-400" : ""}`}
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">Aucun produit dans ce menu</p>
                    <button 
                      className="mt-2 flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm mx-auto"
                      onClick={() => addProduct(menuIndex)}
                    >
                      <Plus size={16} className="mr-1" />
                      Ajouter un produit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center border border-gray-200 rounded-lg">
            <Building size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl font-medium">Aucun menu trouvé</p>
            <p className="text-gray-500 mt-2">Ce restaurant n'a pas encore de menus.</p>
            <button 
              className="mt-4 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mx-auto"
              onClick={addMenu}
            >
              <PlusCircle size={18} className="mr-2" />
              Ajouter un menu
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center"
            onClick={saveChanges}
          >
            <Save className="mr-2" size={20} />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}