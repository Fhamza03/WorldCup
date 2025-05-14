"use client";

import { useState } from "react";
import {
    Search, MapPin, ArrowRight, Utensils, ClipboardList, ChevronLeft
} from "lucide-react";
import Link from "next/link";

export default function RestorationChoicePage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const choices = [
        {
            id: 1,
            title: "Effectuer une commande",
            icon: <Utensils size={24} className="text-green-600" />,
            description: "Passez une nouvelle commande de restauration pour votre événement ou besoin personnel.",
            link: "/dashboard/supporter/services/Restoration",
            image: "/logo.png",
            details: "Commander maintenant"
        },
        {
            id: 2,
            title: "Consulter vos commandes",
            icon: <ClipboardList size={24} className="text-blue-600" />,
            description: "Accédez à l'historique et au statut de vos commandes de restauration passées.",
            link: "/dashboard/supporter/services/Restoration/commandes/liste",
            image: "/logo.png",
            details: "Voir l'historique"
        }
    ];

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";
    const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const borderClass = isDarkMode ? "border-gray-700" : "border-gray-300";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

            <div className="flex items-center justify-between">
                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Service de Restauration
                </h1>
                <Link href="/dashboard/supporter/services/">
                    <button className="ml-auto flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <ChevronLeft size={18} className="mr-1" />
                        Back to Services
                    </button>
                </Link>
            </div>

            <p className={`text-lg mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Veuillez sélectionner une option ci-dessous pour gérer vos commandes de restauration.
            </p>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {choices.map((choice) => (
                    <div
                        key={choice.id}
                        className={`${cardBgClass} border ${borderClass} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
                    >
                        <div className="relative h-48">
                            <img
                                src={choice.image || "/logo.png"}
                                alt={choice.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-gradient-to-l from-red-500 to-green-500 px-3 py-1 rounded-md">
                                <span className="text-white font-medium">{choice.title}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-3">{choice.title}</h3>
                            <p className="text-md mb-4">{choice.description}</p>

                            <div className="flex items-center space-x-2 text-md mb-6">
                                {choice.icon}
                                <span className="ml-1">{choice.details}</span>
                            </div>

                            <Link href={choice.link}>
                                <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                                    Continuer
                                    <ArrowRight size={18} className="ml-2" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}