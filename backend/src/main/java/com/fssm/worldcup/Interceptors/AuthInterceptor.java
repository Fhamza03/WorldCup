//package com.fssm.worldcup.Interceptors;
//
//import com.fssm.worldcup.Utils.CurrentUser;
//import com.fssm.worldcup.Utils.JwtUtil;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//public class AuthInterceptor implements HandlerInterceptor {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private CurrentUser currentUser;
//
//    // Liste des chemins publics qui ne nécessitent pas d'authentification
//    private List<String> publicPaths = Arrays.asList(
//            "/api/auth/signup",
//            "/api/auth/signin",
//            "/api/public"
//    );
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String requestPath = request.getRequestURI();
//
//        // Si le chemin est public, on laisse passer
//        if (isPublicPath(requestPath)) {
//            return true;
//        }
//
//        // Vérifier si l'utilisateur est déjà authentifié dans la session
//        if (currentUser.isAuthenticated()) {
//            // Vérifier les autorisations selon le chemin de la requête
//            return hasAccess(requestPath, currentUser.getUserType());
//        }
//
//        // Vérifier le token JWT dans l'en-tête Authorization
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//
//            String email = jwtUtil.extractEmail(token);
//            String userType = jwtUtil.extractUserType(token);
//            Integer userId = jwtUtil.extractUserId(token);
//
//            // Valider le token
//            if (email != null && jwtUtil.validateToken(token, email)) {
//                // Mettre à jour la session avec les informations de l'utilisateur
//                currentUser.setUser(userId, email, userType);
//
//                // Vérifier les autorisations selon le chemin de la requête
//                return hasAccess(requestPath, userType);
//            }
//        }
//
//        // Si non authentifié ou non autorisé, renvoyer une erreur 401 Unauthorized
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.getWriter().write("Non autorisé");
//        return false;
//    }
//
//    private boolean isPublicPath(String path) {
//        return publicPaths.stream().anyMatch(path::startsWith);
//    }
//
//    private boolean hasAccess(String path, String userType) {
//        // Règles d'accès selon le type d'utilisateur et le chemin
//        if (path.startsWith("/api/admin") && !userType.equals("ADMIN")) {
//            return false;
//        }
//        if (path.startsWith("/api/supporter") && !userType.equals("SUPPORTER")) {
//            return false;
//        }
//        if (path.startsWith("/api/provider") && !userType.equals("PROVIDER")) {
//            return false;
//        }
//
//        return true;
//    }
//}
