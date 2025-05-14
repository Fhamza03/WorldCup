"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Camera, Download, Share2, RefreshCw } from "lucide-react";
import Header from "@/components/dashboard/profile/supporter/header";
import Footer from "@/components/auth/footer";

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
    const params = useParams();
    const cardId = params?.id;

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [cardData, setCardData] = useState<Card | null>(null);
    const [supporterData, setSupporterData] = useState<Supporter | null>(null);
    const [profilePhoto, setProfilePhoto] = useState("/logo.png");

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700";

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

                const cardResponse = await fetch(`http://localhost:8083/card/getCard/${cardId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!cardResponse.ok) throw new Error("Failed to fetch card data");

                const card = await cardResponse.json();
                setCardData(card);

                if (card.supporter && card.supporter.userId) {
                    const supporterResponse = await fetch(
                        `http://localhost:8083/supporter/getSupporter/${card.supporter.userId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );

                    if (!supporterResponse.ok) throw new Error("Failed to fetch supporter data");

                    const supporter = await supporterResponse.json();
                    setSupporterData(supporter);

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



    const handleShareCard = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "My FIFA World Cup 2026 Fan ID",
                    text: "Check out my official Fan ID for the FIFA World Cup 2026!",
                    url: window.location.href
                })
                .catch((error) => console.log("Error sharing", error));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Link copied to clipboard!");
            });
        }
    };

    return (
        <div className={`min-h-screen ${themeClass} flex flex-col`}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} profilePhoto={profilePhoto} />

            <div className="flex-grow flex items-center justify-center relative py-8">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
                        opacity: "0.2"
                    }}
                ></div>

                <div className={`${themeClass} p-6 rounded-lg shadow-2xl w-full max-w-3xl relative z-10`}>
                    <div className="flex justify-center mb-6">
                        <Image src="/logo.png" alt="Logo" width={90} height={90} />
                    </div>

                    <h2 className={`text-2xl font-bold text-center mb-6`}>
                        FIFA World Cup 2026 Fan ID
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    ) : cardData && supporterData ? (
                        <>
                          

                            <div className="bg-gradient-to-r from-green-700 to-red-700 rounded-lg shadow-xl mb-6">
                                <div className={`${isDarkMode ? "bg-gray-800/90" : "bg-white/90"} m-1 p-6 rounded-lg`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <Image src="/logo.png" alt="Logo" width={50} height={50} />
                                            <div>
                                                <h4 className="font-bold text-lg">FIFA World Cup 2026</h4>
                                                <p className="text-sm">Official Fan ID</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">FAN ID</p>
                                            <p className="font-mono">{cardData.cardNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-700">
                                                {profilePhoto ? (
                                                    <img
                                                        src={profilePhoto}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                        <Camera size={40} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="md:w-2/3 md:pl-6 grid grid-cols-2 gap-x-4 gap-y-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Name</p>
                                                <p className="font-semibold">
                                                    {supporterData.firstName} {supporterData.lastName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Nationality</p>
                                                <p className="font-semibold">{supporterData.nationality}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Birth Date</p>
                                                <p className="font-semibold">{supporterData.birthDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">National ID</p>
                                                <p className="font-semibold">{supporterData.nationalCode}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Issue Date</p>
                                                <p className="font-semibold">{cardData.issueDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Expiry Date</p>
                                                <p className="font-semibold">{cardData.expiryDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                        </>
                    ) : (
                        <p className="text-center py-12">No Fan ID found for this ID.</p>
                    )}
                </div>
            </div>

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}
