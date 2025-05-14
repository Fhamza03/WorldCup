"use client";
import { getAccommodationByProvider } from "@/api/accomondation/accomondation.api";
import AccommodationForm from "@/components/dashboard/services/Accommondation/accommodationForm";
import ShowAccommodation from "@/components/dashboard/services/Accommondation/showAccomondation";
import UpdateAccommodation from "@/components/dashboard/services/Accommondation/updateAccommodation";
import { Accommodation } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [formEvent, setFormEvent] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedAcId, setSelectedAcId] = useState<number>(-1);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const response = await getAccommodationByProvider(1);
      if (response) {
        // const filteredRoutes = response?.filter(
        //   (route: VehicleRoute) =>
        //     route.vehicle.transportation.transportationProviderName ===
        //       "ONCF Express" || "string"
        // );
        // setSampleRoutes(filteredRoutes);
        setAccommodations(response);
      } else {
        console.error("Failed to fetch routes");
      }
    };
    fetchData();
    if (formEvent === "delete") setFormEvent(null);
  }, [formEvent]);

  return (
    <div className="flex flex-col items-center min-h-screen text-black">
      {formEvent === "add" && (
        <AccommodationForm
          onClose={() => {
            setFormEvent(null);
          }}
        />
      )}
      {formEvent === "edit" && (
        <UpdateAccommodation
          onClose={() => {
            setFormEvent(null);
          }}
          AccommodationData={accommodations[selectedAcId]}
        />
      )}
      {formEvent === null && (
        <ShowAccommodation
          accommodations={accommodations}
          onAdd={() => {
            setFormEvent("add");
          }}
          onEdit={(AccommodationId) => {
            setFormEvent("edit");
            setSelectedAcId(AccommodationId);
          }}
          onDelete={() => {
            setFormEvent("delete");
          }}
        />
      )}
    </div>
  );
}
