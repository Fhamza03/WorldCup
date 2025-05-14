"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
    Search, MapPin, ArrowRight, Utensils, Home, Car, ChevronLeft
} from "lucide-react";
import Link from "next/link";

interface Service {
    id: number;
    title: string;
    icon: React.ReactNode;
    description: string;
    link: string;
    image: string;
    location: string;
    details: string;
}

export default function ServicesPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Simuler la même structure que les restaurants
    const services: Service[] = [
        {
            id: 1,
            title: "Restauration",
            icon: <Utensils size={24} className="text-green-600" />,
            description: "Découvrez nos services de restauration pour les événements, traiteurs et options de livraison de repas.",
            link: "/dashboard/supporter/services/choices",
            image: "/logo.png",
            location: "Disponible dans toute la ville",
            details: "Service rapide et de qualité"
        },
        {
            id: 2,
            title: "Transportation",
            icon: <Car size={24} className="text-blue-600" />,
            description: "Services de transport pour tous vos besoins de déplacement, navettes et logistique.",
            link: "/dashboard/supporter/services/Transportation",
            image: "/logo.png",
            location: "Service national",
            details: "Transport sécurisé et ponctuel"
        },
        {
            id: 3,
            title: "Accommodation",
            icon: <Home size={24} className="text-purple-600" />,
            description: "Trouvez des hébergements de qualité, du logement temporaire aux séjours de longue durée.",
            link: "/dashboard/supporter/services/Accomondation",
            image: "/logo.png",
            location: "Partout en ville",
            details: "Confort et tranquillité assurés"
        },
    ];

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Découvrez Nos Services
                </h1>
                <Link href="/dashboard/supporter/profile">
                    <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <ChevronLeft size={18} className="mr-1" />
                        Back to Profile
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
                    placeholder="Rechercher un service..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={`w-full px-3 py-3 ${cardBgClass} focus:outline-none`}
                />
            </div>

            {/* Results Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className={`${cardBgClass} border ${borderClass} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
                    >
                        <div className="relative h-48">
                            <img
                                src={service.image || "/logo.png"}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-gradient-to-l from-red-500 to-green-500 px-2 py-1 rounded-md">
                                <span className="text-white font-medium">{service.title}</span>
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-lg">{service.title}</h3>
                            <p className="text-sm mb-3 line-clamp-2">{service.description}</p>
                            <div className="flex items-start space-x-1 text-sm mb-3">
                                <MapPin size={16} className="text-gray-500 mt-0.5" />
                                <span>{service.location}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm mb-4">
                                {service.icon}
                                <span className="ml-1">{service.details}</span>
                            </div>

                            <Link href={service.link}>
                                <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center mt-4">
                                    Explorer
                                    <ArrowRight size={16} className="ml-1" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}