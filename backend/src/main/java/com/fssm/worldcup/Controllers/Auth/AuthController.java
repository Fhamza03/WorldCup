package com.fssm.worldcup.Controllers.Auth;

import com.fssm.worldcup.DTOs.AuthResponse;
import com.fssm.worldcup.DTOs.SigninRequest;
import com.fssm.worldcup.DTOs.SignupRequest;

import com.fssm.worldcup.Services.Auth.AuthService;
import com.fssm.worldcup.Utils.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private CurrentUser currentUser;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        AuthResponse response = authService.signup(request);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody SigninRequest request) {
        AuthResponse response = authService.signin(request);
        if (response.isSuccess()) {
            currentUser.setUser(response.getUserId(), request.getEmail(), response.getUserType());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<Map<String, Object>> signout() {
        // Effacer les informations de l'utilisateur courant
        currentUser.clear();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Déconnexion réussie");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser() {
        if (currentUser.isAuthenticated()) {
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("userId", currentUser.getUserId());
            userInfo.put("email", currentUser.getEmail());
            userInfo.put("userType", currentUser.getUserType());
            userInfo.put("isAdmin", currentUser.isAdmin());
            userInfo.put("isSupporter", currentUser.isSupporter());
            userInfo.put("isProvider", currentUser.isProvider());

            return ResponseEntity.ok(userInfo);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", false);
            response.put("message", "Aucun utilisateur connecté");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
