"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProviderProfile from "../dashboard/profile/provider/profile";
import SupporterProfile from "../dashboard/profile/supporter/profile";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Dans un environnement client (Next.js), vérifiez si window est défini
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userTypeFromStorage = localStorage.getItem("userType");

      if (!token || !userTypeFromStorage) {
        // Si pas d'authentification, rediriger vers la page d'accueil
        router.push("/");
      } else {
        setUserType(userTypeFromStorage);
        setIsAuthenticated(true);

        // Logique de redirection pour les providers qui n'ont pas complété leur profil
        if (userTypeFromStorage === "PROVIDER") {
          const currentPath = window.location.pathname;
          if (currentPath.startsWith("/provider/console") && currentPath !== "/provider/console/profile") {
            router.push("/provider/console/profile");
          }
        } 
      }
    }
    
    setIsLoading(false);
  }, [router]);

  // Affichage d'un indicateur de chargement
  if (isLoading) {
    return <div>Vérification de l'authentification...</div>;
  }

  // Rendu conditionnel basé sur le type d'utilisateur
  if (isAuthenticated) {
    if (userType === "SUPPORTER") {
      return <SupporterProfile />;
    } else if (userType === "PROVIDER") {
      return <ProviderProfile />;
    } else {
      // Rendre les enfants pour d'autres types d'utilisateurs authentifiés
      return <>{children}</>;
    }
  }

  // Si non authentifié et pas en cours de chargement, ne rien afficher
  return null;
};

export default ProtectedRoute;