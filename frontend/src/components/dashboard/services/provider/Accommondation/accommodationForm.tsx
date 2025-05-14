"use client";
import React, { useState } from "react";
import FormSection from "../Transportation/utils/formSection";
import FormField from "../Transportation/utils/formField";
import { Accommodation, User } from "@/interfaces";
import { createAccommodation } from "@/api/accomondation/accomondation.api";

interface AccommodationFormProps {
  onClose?: () => void;
}

export default function AccommodationForm({ onClose }: AccommodationFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user] = useState<User>({
    userId: 1,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    nationality: "",
    nationalCode: "",
    profilePicture: "",
  });
  const [formData, setFormData] = useState<Accommodation>({
    address: "",
    roomsCount: 1, // Default to 1 instead of 0
    showersCount: 1, // Default to 1 instead of 0
    bathroomsCount: 1, // Default to 1 instead of 0
    wifiAvailable: false,
    priceForNight: 0,
    provider: user,
  });
  const [errors, setErrors] = useState<string[]>([]);

  function validateAccommodation(formData: Accommodation): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // For new accommodations, we don't validate ID (it will be set by backend)
    // if (formData.idAccommodation < 0) errors.push("Invalid accommodation ID.");

    if (!formData.address || formData.address.trim() === "")
      errors.push("Address is required.");
    if (formData.roomsCount <= 0)
      errors.push("Rooms count must be greater than 1.");
    if (formData.showersCount < 0)
      errors.push("Showers count must be 0 or more.");
    if (formData.bathroomsCount < 0)
      errors.push("Bathrooms count must be 0 or more.");
    if (formData.priceForNight <= 0)
      errors.push("Price for night must be greater than 0.");

    // Address format validation (e.g. "27 Avenue Mohammed V, Marrakech")
    const addressRegex = /^\d+\s[\p{L}\d\s.'-]+,\s*[\p{L}\s.'-]+$/u;

    if (formData.address && !addressRegex.test(formData.address)) {
      errors.push("Address must be like: 27 Avenue Mohammed V, Marrakech");
    }

    // Provider validation
    const provider = formData.provider;
    if (!provider || provider.userId <= 0)
      errors.push("Valid provider is required.");

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateAccommodation(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      // Add API call logic here to save the accommodation

      const response = await createAccommodation(formData);

      if (response) {
        if (onClose) onClose();
      } else {
        console.error("Failed to create Accommodation");
        return;
      }

      console.log("Saving accommodation:", formData);

      // For testing purposes, simulate successful save
      setTimeout(() => {
        setIsLoading(false);
        if (onClose) onClose();
      }, 1000);
    } catch (error) {
      console.error("Error saving accommodation:", error);
      setErrors(["An unexpected error occurred"]);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      idAccommodation: 0,
      address: "",
      roomsCount: 1,
      showersCount: 1,
      bathroomsCount: 1,
      wifiAvailable: false,
      priceForNight: 0,
      provider: user,
    });
    setErrors([]);
    if (onClose) onClose();
  };

  return (
    <form
      className="max-w-4xl mx-auto p-6 w-[60%] bg-white rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Accommodation</h2>

      {/* Display errors if any */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 font-medium mb-1">
            Please fix the following errors:
          </p>
          <ul className="list-disc list-inside text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Accommodation Information */}
      <FormSection title="Accommodation Information" badgeValue="101">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Address"
            id="address"
            type="text"
            required={true}
            value={formData.address}
            setFormData={(value) =>
              setFormData({ ...formData, address: value.toString() })
            }
          />
          <FormField
            label="Rooms Count"
            id="roomsCount"
            type="number"
            required={true}
            value={formData.roomsCount}
            setFormData={(value) =>
              setFormData({ ...formData, roomsCount: Number(value) })
            }
          />
          <FormField
            label="Bathrooms Count"
            id="bathroomsCount"
            type="number"
            required={true}
            value={formData.bathroomsCount}
            setFormData={(value) =>
              setFormData({ ...formData, bathroomsCount: Number(value) })
            }
          />
          <FormField
            label="Showers Count"
            id="showersCount"
            type="number"
            value={formData.showersCount}
            setFormData={(value) =>
              setFormData({ ...formData, showersCount: Number(value) })
            }
          />
          <FormField
            label="Price For Night (DH)"
            id="priceForNight"
            type="number"
            required={true}
            value={formData.priceForNight}
            setFormData={(value) =>
              setFormData({ ...formData, priceForNight: Number(value) })
            }
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="wifiAvailable"
              checked={formData.wifiAvailable}
              onChange={(e) =>
                setFormData({ ...formData, wifiAvailable: e.target.checked })
              }
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="wifiAvailable" className="text-gray-700">
              WiFi Available
            </label>
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-6 py-2 mr-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          disabled={isLoading}
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-6 py-2 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-md focus:outline-none flex items-center`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Save Accommodation"
          )}
        </button>
      </div>
    </form>
  );
}
