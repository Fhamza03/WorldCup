"use client";
import React, { createContext, useContext, useState } from "react";
import { VehicleRoute } from "@/interfaces";

interface RouteContextType {
  routes: VehicleRoute[];
  setRoutes: (routes: VehicleRoute[]) => void;
  selectedRoute: VehicleRoute | null;
  setSelectedRoute: React.Dispatch<React.SetStateAction<VehicleRoute | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextGlobal = createContext<RouteContextType | undefined>(
  undefined
);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [routes, setRoutes] = useState<VehicleRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<VehicleRoute | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const providerValue = {
    routes,
    setRoutes,
    selectedRoute,
    setSelectedRoute,
    isLoading,
    setIsLoading,
  };

  return (
    <ContextGlobal.Provider value={providerValue}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlContext = () => {
  const context = useContext(ContextGlobal);
  if (!context) {
    throw new Error("useGlContext must be used within a ContextProvider");
  }
  return context;
};
