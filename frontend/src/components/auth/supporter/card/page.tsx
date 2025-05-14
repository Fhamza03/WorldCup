"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, ChevronRight, ChevronLeft, Check, X, Ticket } from "lucide-react";
import Header from "@/components/dashboard/profile/supporter/header";
import Footer from "../../footer";

export default function FanIdStepperForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form data state
    const [formData, setFormData] = useState({
        // Step 1: Personal Info
        userId: "",
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        nationality: "",
        nationalCode: "",
        profilePicture: "",

        // Step 2: Game IDs
        gameId1: "",
        gameId2: "",
        gameId3: "",

        // Step 3: Card Info (will be generated)
        cardNumber: "",
        cardType: "FAN_ID",
        issueDate: "",
        expiryDate: "",
    });

    // Games data after verification
    const [games, setGames] = useState<Array<{ id: string, teams: string, seat: string }>>([]);

    // Fetch user data on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setIsDarkMode(savedTheme === "dark");

        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                // Get user ID and token from localStorage
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");


                if (!userId || !token) {
                    router.push("/auth/supporter/login");
                    return;
                }

                // Fetch user data from API
                const response = await fetch(`http://localhost:8083/supporter/getSupporter/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const userData = await response.json();

                // Update form data with user information
                setFormData(prev => ({
                    ...prev,
                    userId: userData.userId,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    birthDate: userData.birthDate,
                    nationality: userData.nationality,
                    nationalCode: userData.nationalCode,
                    profilePicture: userData.profilePicture || ""
                }));

            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load user data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

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

    // Handle input change
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Verify game IDs
    const verifyGames = async () => {
        try {
            setIsLoading(true);
            setError("");

            const gameIds = [formData.gameId1, formData.gameId2, formData.gameId3].filter(id => id);

            if (gameIds.length < 3) {
                setError("Please enter all three game IDs");
                return false;
            }

            const verifiedGames = [];

            // Verify each game ID
            for (const gameId of gameIds) {
                const response = await fetch(`http://localhost:8083/api/games/${gameId}`);

                if (!response.ok) {
                    setError(`Game with ID ${gameId} not found`);
                    return false;
                }

                const gameData = await response.json();
                verifiedGames.push(gameData);
            }

            // If all games verified successfully
            setGames(verifiedGames);
            return true;

        } catch (error) {
            console.error("Error verifying games:", error);
            setError("Failed to verify games. Please check the IDs and try again.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Handle next step
    const handleNextStep = async () => {
        if (currentStep === 1) {
            // Move to step 2
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Verify games before moving to step 3
            const gamesVerified = await verifyGames();
            if (gamesVerified) {
                // Generate card details
                const today = new Date();
                const expiryDate = new Date();
                expiryDate.setFullYear(today.getFullYear() + 4); // Fan ID valid for 4 years

                setFormData(prev => ({
                    ...prev,
                    issueDate: today.toISOString().split('T')[0],
                    expiryDate: expiryDate.toISOString().split('T')[0],
                    cardNumber: `FID-${Math.floor(100000 + Math.random() * 900000)}` // Generate random card number
                }));

                setCurrentStep(3);
            }
        } else if (currentStep === 3) {
            // Submit the form
            handleSubmit();
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError("");

            // Create Fan ID request DTO
            const fanIdRequestDTO = {
                userId: formData.userId,
                cardNumber: formData.cardNumber,
                cardType: formData.cardType,
                issueDate: formData.issueDate,
                expiryDate: formData.expiryDate,
                gameIds: [formData.gameId1, formData.gameId2, formData.gameId3]
            };

            // Send request to create Fan ID
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8083/card/createFanId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(fanIdRequestDTO)
            });

            if (!response.ok) {
                throw new Error("Failed to create Fan ID");
            }

            const data = await response.json();

            // Set success message and redirect to Fan ID card page
            setSuccess("Fan ID created successfully!");

            // Redirect to Fan ID card page
            setTimeout(() => {
                router.push(`/auth/supporter/card/fanid/${data.cardId}`);
            }, 1500);

        } catch (error) {
            console.error("Error creating Fan ID:", error);
            setError("Failed to create Fan ID. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Step 1: Personal Information
                        </h3>

                        {/* Profile Photo Display */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div
                                    className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                                >
                                    {formData.profilePicture ? (
                                        <img src={"/logo.png"} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                            <Camera size={40} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information Form - Read-only */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    readOnly
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none cursor-not-allowed opacity-75"
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    readOnly
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none cursor-not-allowed opacity-75"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none cursor-not-allowed opacity-75"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Date of Birth
                                </label>
                                <input
                                    type="text"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    readOnly
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none cursor-not-allowed opacity-75"
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    National ID / Passport
                                </label>
                                <input
                                    type="text"
                                    name="nationalCode"
                                    value={formData.nationalCode}
                                    readOnly
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none cursor-not-allowed opacity-75"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                Nationality
                            </label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                readOnly
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none cursor-not-allowed opacity-75"
                            />
                        </div>

                        <div className="text-center mt-4">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Please verify your information above before proceeding
                            </p>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Step 2: Match Verification
                        </h3>

                        <div className="text-center mb-6">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Please enter the IDs of three World Cup 2026 matches you plan to attend
                            </p>
                        </div>

                        {/* Game ID inputs */}
                        <div className="space-y-4">
                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Match 1 ID
                                </label>
                                <input
                                    type="text"
                                    name="gameId1"
                                    placeholder="Enter match ID"
                                    value={formData.gameId1}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Match 2 ID
                                </label>
                                <input
                                    type="text"
                                    name="gameId2"
                                    placeholder="Enter match ID"
                                    value={formData.gameId2}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                                    Match 3 ID
                                </label>
                                <input
                                    type="text"
                                    name="gameId3"
                                    placeholder="Enter match ID"
                                    value={formData.gameId3}
                                    onChange={handleChange}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                            </div>
                        </div>

                        {/* Game tickets display if verified */}
                        {games.length > 0 && (
                            <div className="mt-8">
                                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
                                    Verified Matches
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {games.map((game, index) => (
                                        <div
                                            key={game.id}
                                            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                                        >
                                            <div className="p-4">
                                                <div className="flex justify-center mb-2">
                                                    <Image src="/logo.png" alt="World Cup 2026" width={60} height={60} />
                                                </div>
                                                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    <h5 className="font-semibold text-lg">FIFA World Cup 2026</h5>
                                                    <p className="font-bold text-xl mt-2">{game.teams}</p>
                                                    <p className="text-sm mt-2">Seat: {game.seat}</p>
                                                    <p className="text-sm opacity-75">Match ID: {game.id}</p>
                                                </div>
                                            </div>
                                            <div className={`w-full h-2 ${index === 0 ? 'bg-red-600' : index === 1 ? 'bg-green-600' : 'bg-blue-600'}`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Step 3: Review and Confirm
                        </h3>

                        <div className="bg-gradient-to-r from-green-700 to-red-700 rounded-lg shadow-xl overflow-hidden">
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
                                        <p className="font-mono">{formData.cardNumber}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-700">
                                            {formData.profilePicture ? (
                                                <img src={"/logo.png"} alt="Profile" className="w-full h-full object-cover" />
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
                                                    {formData.firstName} {formData.lastName}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nationality</p>
                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {formData.nationality}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date of Birth</p>
                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {formData.birthDate}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>National ID/Passport</p>
                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {formData.nationalCode}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Issue Date</p>
                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {formData.issueDate}
                                                </p>
                                            </div>

                                            <div>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {formData.expiryDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Please confirm your Fan ID details before submitting
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Render step indicators
    const renderStepIndicators = () => {
        return (
            <div className="flex justify-center items-center mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`rounded-full h-12 w-12 flex items-center justify-center border-2 ${currentStep === step
                                ? "border-green-700 bg-green-700 text-white"
                                : currentStep > step
                                    ? "border-green-700 bg-green-100 text-green-700"
                                    : `${isDarkMode ? 'border-gray-600 text-gray-500' : 'border-gray-300 text-gray-500'}`
                                }`}
                        >
                            {currentStep > step ? (
                                <Check size={20} />
                            ) : (
                                step
                            )}
                        </div>

                        {step < 3 && (
                            <div
                                className={`h-1 w-12 ${currentStep > step
                                    ? "bg-green-700"
                                    : `${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                                    }`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const [profilePhoto, setProfilePhoto] = useState<string | null>("/profile.png");

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

                {/* Form Container */}
                <div className={`${themeClass} p-6 rounded-lg shadow-2xl shadow-gray-500/40 w-full max-w-2xl sm:max-w-3xl relative z-10`}>
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image src="/logo.png" alt="Logo" width={90} height={90} />
                    </div>

                    {/* Form Title */}
                    <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-6`}>
                        Create Your Fan ID Card
                    </h2>

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="flex justify-center mb-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700"></div>
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">{error}</span>
                            <button
                                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                onClick={() => setError("")}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {/* Success message */}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}

                    {/* Step indicators */}
                    {renderStepIndicators()}

                    {/* Step content */}
                    {renderStepContent()}

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={handlePrevStep}
                            disabled={currentStep === 1 || isLoading}
                            className={`flex items-center space-x-2 py-2 px-4 rounded-md transition ${currentStep === 1 || isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : isDarkMode
                                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                        >
                            <ChevronLeft size={16} />
                            <span>Previous</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleNextStep}
                            disabled={isLoading}
                            className={`flex items-center space-x-2 py-2 px-4 rounded-md transition ${isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-700 to-red-700 hover:from-green-600 hover:to-red-600 text-white"
                                }`}
                        >
                            <span>{currentStep === 3 ? "Submit" : "Next"}</span>
                            {currentStep !== 3 && <ChevronRight size={16} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}