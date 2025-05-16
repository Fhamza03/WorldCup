"use client";
import { getAllRoutes } from "@/api/transport/transport.api";
import ShowVehicleRouteTable from "@/components/dashboard/services/Transportation/utils/showVehicleRoute";
import UpdateVehicleRoute from "@/components/dashboard/services/Transportation/utils/updateVehicleRoute";
import VehicleRouteForm from "@/components/dashboard/services/Transportation/utils/vehicleRouteForm";
import { VehicleRoute } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [formEvent, setFormEvent] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedRouteId, setSelectedRouteId] = useState<number>(-1);
  const [sampleRoutes, setSampleRoutes] = useState<VehicleRoute[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const response = await getAllRoutes();
      if (response) {
        // const filteredRoutes = response?.filter(
        //   (route: VehicleRoute) =>
        //     route.vehicle.transportation.transportationProviderName ===
        //       "ONCF Express" || "string"
        // );
        // setSampleRoutes(filteredRoutes);
        setSampleRoutes(response);
      } else {
        console.error("Failed to fetch routes");
        setSampleRoutes([]);
      }
    };
    fetchData();
    if (formEvent === "delete") setFormEvent(null);
  }, [formEvent]);

  return (
    <div className="flex flex-col items-center min-h-screen text-black">
      {formEvent === "add" && (
        <VehicleRouteForm
          onClose={() => {
            setFormEvent(null);
          }}
        />
      )}
      {formEvent === "edit" && (
        <UpdateVehicleRoute
          onClose={() => {
            setFormEvent(null);
          }}
          vehicleRouteData={sampleRoutes[selectedRouteId]}
        />
      )}
      {formEvent === null && (
        <ShowVehicleRouteTable
          routes={sampleRoutes}
          onAdd={() => {
            setFormEvent("add");
          }}
          onEdit={(routeId) => {
            setFormEvent("edit");
            setSelectedRouteId(routeId);
          }}
          onDelete={() => {
            setFormEvent("delete");
          }}
        />
      )}
    </div>
  );
}
