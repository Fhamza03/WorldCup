package com.fssm.worldcup.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

<<<<<<< HEAD
        // Spécifier les origines autorisées explicitement plutôt que "*" si vous utilisez allowCredentials
        config.addAllowedOrigin("http://localhost:3000"); // Adaptez au port de votre front-end
        // Ajoutez d'autres origines si nécessaire
        // config.addAllowedOrigin("https://votre-domaine-production.com");
=======
        // Permettre les requêtes depuis n'importe quelle origine (tout en autorisant les credentials)
        config.addAllowedOriginPattern("*");
>>>>>>> origin/main

        // Permettre tous les en-têtes
        config.addAllowedHeader("*");

        // Permettre les méthodes HTTP standard
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");

        // Autoriser les cookies ou les tokens d'authentification
        config.setAllowCredentials(true);

<<<<<<< HEAD
        // Appliquer cette configuration à TOUS les chemins d'API
        source.registerCorsConfiguration("/**", config);
=======
        // Appliquer cette configuration à tous les chemins
        source.registerCorsConfiguration("/", config);
>>>>>>> origin/main

        return new CorsFilter(source);
    }
}