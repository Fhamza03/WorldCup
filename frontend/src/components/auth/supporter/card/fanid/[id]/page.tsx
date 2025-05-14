"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Camera, Download, Share2, RefreshCw } from "lucide-react";
import Header from "@/components/dashboard/profile/supporter/header";
import Footer from "../../../../footer";

// Define interfaces for type safety
interface Supporter {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    nationalCode: string;
    profilePicture?: string;
    card?: Card;
    isFanIdValid?: boolean;
}

interface Card {
    cardId: number;
    cardNumber: string;
    cardType: string;
    issueDate: string;
    expiryDate: string;
    supporter?: Supporter;
}

export default function FanIdCard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cardId = searchParams.get("id");
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [cardData, setCardData] = useState<Card | null>(null);
    const [supporterData, setSupporterData] = useState<Supporter | null>(null);
    const [profilePhoto, setProfilePhoto] = useState("/logo.png");

    // Toggle theme function
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    // Theme class based on dark mode state
    const themeClass = isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-white text-gray-700";

    // Fetch card and supporter data
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setIsDarkMode(savedTheme === "dark");

        const fetchCardData = async () => {
            if (!cardId) {
                router.push("/dashboard/supporter/profile");
                return;
            }

            try {
                setIsLoading(true);
                const token = localStorage.getItem("token");
                
                if (!token) {
                    router.push("/auth/supporter/login");
                    return;
                }

                // Fetch card data
                const cardResponse = await fetch(`http://localhost:8083/card/getCard/${cardId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!cardResponse.ok) {
                    throw new Error("Failed to fetch card data");
                }

                const card = await cardResponse.json();
                setCardData(card);

                // Fetch supporter data
                if (card.supporter && card.supporter.userId) {
                    const supporterResponse = await fetch(`http://localhost:8083/supporter/getSupporter/${card.supporter.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!supporterResponse.ok) {
                        throw new Error("Failed to fetch supporter data");
                    }

                    const supporter = await supporterResponse.json();
                    setSupporterData(supporter);
                    
                    // Set profile photo if available
                    if (supporter.profilePicture) {
                        setProfilePhoto(supporter.profilePicture);
                    }
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load Fan ID data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCardData();
    }, [cardId, router]);

    // Handle download card (for demo purposes - would normally generate PDF)
    const handleDownloadCard = () => {
        alert("Download functionality would be implemented here");
        // In a real implementation, this would generate a PDF version of the card
    };

    // Handle share card
    const handleShareCard = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My FIFA World Cup 2026 Fan ID',
                text: 'Check out my official Fan ID for the FIFA World Cup 2026!',
                url: window.location.href,
            })
            .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert("Link copied to clipboard!");
            });
        }
    };

    return (
        <div className={`min-h-screen ${themeClass} flex flex-col`}>
            {/* Navigation */}
            <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                profilePhoto={profilePhoto}
            />

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center relative py-8">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
                        opacity: "0.2",
                    }}
                ></div>

                {/* Card Container */}
                <div className={`${themeClass} p-6 rounded-lg shadow-2xl shadow-gray-500/40 w-full max-w-3xl relative z-10`}>
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image src="/logo.png" alt="Logo" width={90} height={90} />
                    </div>

                    {/* Card Title */}
                    <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-6`}>
                        FIFA World Cup 2026 Fan ID
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    ) : cardData && supporterData ? (
                        <>
                            {/* Success message */}
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                                <span className="block sm:inline">Fan ID created successfully! Your card is now ready.</span>
                            </div>

                            {/* Fan ID Card - Front */}
                            <div className="mb-6">
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-3`}>
                                    Front Side
                                </h3>
                                <div className="bg-gradient-to-r from-green-700 to-red-700 rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105">
                                    <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} m-1 rounded-lg p-6`}>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-3">
                                                <Image src="/logo.png" alt="World Cup 2026" width={50} height={50} />
                                                <div>
                                                    <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>FIFA World Cup 2026</h4>
                                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Official Fan ID</p>
                                                </div>
                                            </div>
                                            <div className={`text-right ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                <p className="font-semibold">FAN ID</p>
                                                <p className="font-mono">{cardData.cardNumber}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
                                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-700">
                                                    {supporterData.profilePicture ? (
                                                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                            <Camera size={40} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="md:w-2/3 md:pl-6">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                    <div>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Name</p>
                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {supporterData.firstName} {supporterData.lastName}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nationality</p>
                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {supporterData.nationality}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date of Birth</p>
                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {supporterData.birthDate}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>National ID/Passport</p>
                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {supporterData.nationalCode}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Issue Date</p>
                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {cardData.issueDate}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {cardData.expiryDate}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fan ID Card - Back */}
                            <div className="mb-6">
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-3`}>
                                    Back Side
                                </h3>
                                <div className="bg-gradient-to-r from-red-700 to-green-700 rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105">
                                    <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} m-1 rounded-lg p-6`}>
                                        <div className="flex justify-center mb-6">
                                            <Image src="/logo.png" alt="World Cup 2026" width={60} height={60} />
                                        </div>
                                        <div className="text-center mb-4">
                                            <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                FIFA World Cup 2026 - United States, Mexico & Canada
                                            </h4>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                                                This card grants stadium access for matches with valid tickets
                                            </p>
                                        </div>

                                        <div className="flex justify-center mb-4">
                                            {/* Barcode/QR placeholder */}
                                            <div className="w-48 h-48 bg-white p-2 rounded">
                                                <div className="w-full h-full border border-gray-300 rounded flex items-center justify-center">
                                                    <div className="text-center">
                                                        <p className="text-black font-mono text-xs mb-2">SCAN FOR VERIFICATION</p>
                                                        {/* Simple QR code placeholder */}
                                                        <div className="w-32 h-32 mx-auto bg-black p-2">
                                                            <div className="w-full h-full bg-white grid grid-cols-5 grid-rows-5 gap-1">
                                                                {Array(25).fill(0).map((_, i) => (
                                                                    <div 
                                                                        key={i} 
                                                                        className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                                                                    ></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-black font-mono text-xs mt-2">{cardData.cardNumber}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                This card is personal and non-transferable. Must be presented with valid ID.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap justify-center gap-4 mt-8">
                                <button
                                    onClick={handleDownloadCard}
                                    className="flex items-center space-x-2 py-2 px-4 rounded-md bg-green-700 hover:bg-green-800 text-white transition"
                                >
                                    <Download size={16} />
                                    <span>Download Card</span>
                                </button>

                                <button
                                    onClick={handleShareCard}
                                    className="flex items-center space-x-2 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                                >
                                    <Share2 size={16} />
                                    <span>Share</span>
                                </button>

                                <button
                                    onClick={() => router.push('/dashboard/supporter/profile')}
                                    className={`flex items-center space-x-2 py-2 px-4 rounded-md transition ${
                                        isDarkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                    }`}
                                >
                                    <RefreshCw size={16} />
                                    <span>Back to Profile</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p>No Fan ID data found. Please go back and create a Fan ID.</p>
                            <button
                                onClick={() => router.push('/dashboard/supporter/profile')}
                                className="mt-4 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                            >
                                Back to Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}