"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Menu {
    id: number;
    name: string;
    description: string;
    products: Product[];
}

interface Restaurant {
    id: number;
    name: string;
    description: string;
    address: string;
    image?: string;
    rating?: number;
    deliveryTime?: string;
}

export default function RestaurantOrderPage({ params }: { params: { restaurantId: string } }) {
    const { restaurantId } = params;
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (restaurantId) {
            fetchRestaurantData(restaurantId);
        }
    }, [restaurantId]);

    const fetchRestaurantData = async (id: string) => {
        setIsLoading(true);
        try {
            const restaurantResponse = await axios.get(`http://localhost:8083/api/restaurants/${id}`);
            setRestaurant(restaurantResponse.data);

            const menuResponse = await axios.get(`http://localhost:8083/api/menus/restaurant/${id}`);
            setMenus(menuResponse.data);

            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching restaurant data:", err);
            setError("Failed to load restaurant data. Please try again later.");
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!restaurant) {
        return <div>Restaurant not found.</div>;
    }

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <div>
                {menus.map((menu) => (
                    <div key={menu.id}>
                        <h2>{menu.name}</h2>
                        <ul>
                            {menu.products.map((product) => (
                                <li key={product.id}>{product.name} - ${product.price}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}