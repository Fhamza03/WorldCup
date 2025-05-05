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

        // Permettre les requêtes depuis n'importe quelle origine (tout en autorisant les credentials)
        config.addAllowedOriginPattern("*");

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

        // Appliquer cette configuration à tous les chemins
        source.registerCorsConfiguration("/", config);

        return new CorsFilter(source);
    }
}