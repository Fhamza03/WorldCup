package com.fssm.worldcup.Services.Auth;
import com.fssm.worldcup.DTOs.AuthResponse;
import com.fssm.worldcup.DTOs.SigninRequest;
import com.fssm.worldcup.DTOs.SignupRequest;
import com.fssm.worldcup.Models.General.*;

import com.fssm.worldcup.Repositories.General.AdministratorRepository;
import com.fssm.worldcup.Repositories.General.ProviderRepository;
import com.fssm.worldcup.Repositories.General.ServiceTypeRepository;
import com.fssm.worldcup.Repositories.General.SupporterRepository;
import com.fssm.worldcup.Utils.JwtUtil;
import com.fssm.worldcup.Utils.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private SupporterRepository supporterRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;


    public Date convertStringToDate(String birthDateStr) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.parse(birthDateStr);
    }

    public AuthResponse signup(SignupRequest request) {
        if (isEmailTaken(request.getEmail())) {
            return new AuthResponse(null, null, null, "Email déjà utilisé", false);
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        String profilePicturePath = saveProfilePicture(request.getProfilePicture(), request.getEmail());

        switch (request.getUserType()) {
            case "ADMIN":
                return registerAdmin(request, encodedPassword, profilePicturePath);
            case "SUPPORTER":
                return registerSupporter(request, encodedPassword, profilePicturePath);
            case "PROVIDER":
                return registerProvider(request, encodedPassword, profilePicturePath);
            default:
                return new AuthResponse(null, null, null, "Type d'utilisateur invalide", false);
        }
    }

    // Fonction pour enregistrer l'image dans un dossier local
    private String saveProfilePicture(MultipartFile file, String email) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            String folder = System.getProperty("user.dir") + "/uploads/profile_pictures/";
            Files.createDirectories(Paths.get(folder));

            String fileName = email + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(folder + fileName);
            Files.write(filePath, file.getBytes());

            return filePath.toString(); // Retourner le chemin enregistré
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public AuthResponse signin(SigninRequest request) {
        String userType = request.getUserType();

        switch (userType) {
            case "ADMIN":
                return authenticateAdmin(request);
            case "SUPPORTER":
                return authenticateSupporter(request);
            case "PROVIDER":
                return authenticateProvider(request);
            default:
                return new AuthResponse(null, null, null, "Type d'utilisateur invalide", false);
        }
    }

    private boolean isEmailTaken(String email) {
        return administratorRepository.existsByEmail(email) ||
                supporterRepository.existsByEmail(email) ||
                providerRepository.existsByEmail(email);
    }

    private AuthResponse registerAdmin(SignupRequest request, String encodedPassword, String profilePicturePath) {
        Administrator admin = new Administrator();
        admin.setEmail(request.getEmail());
        admin.setPassword(encodedPassword);
        admin.setFirstName(request.getFirstName());
        admin.setLastName(request.getLastName());
        admin.setBirthDate(request.getBirthDate());
        admin.setNationality(request.getNationality());
        admin.setNationalCode(request.getNationalCode());
        admin.setAccessStatistics(request.getAccessStatistics());
        admin.setProfilePicture(profilePicturePath);

        Administrator savedAdmin = administratorRepository.save(admin);

        String token = jwtUtil.generateToken(savedAdmin.getEmail(), "ADMIN", savedAdmin.getUserId());
        System.out.println("Token: " + token);
        return new AuthResponse(token, "ADMIN", savedAdmin.getUserId(), "Inscription réussie", true);
    }

    private AuthResponse registerSupporter(SignupRequest request, String encodedPassword, String profilePicturePath) {
        Supporter supporter = new Supporter();
        supporter.setEmail(request.getEmail());
        supporter.setPassword(encodedPassword);
        supporter.setFirstName(request.getFirstName());
        supporter.setLastName(request.getLastName());
        supporter.setBirthDate(request.getBirthDate());
        supporter.setNationality(request.getNationality());
        supporter.setNationalCode(request.getNationalCode());
        supporter.setIsFanIdValid(request.getIsFanIdValid());
        supporter.setProfilePicture(profilePicturePath);


        // Créer une carte par défaut pour le supporter
        Card card = new Card();
        // Initialiser les attributs de la carte si nécessaire
        supporter.setCard(card);

        Supporter savedSupporter = supporterRepository.save(supporter);

        String token = jwtUtil.generateToken(savedSupporter.getEmail(), "SUPPORTER", savedSupporter.getUserId());

        return new AuthResponse(token, "SUPPORTER", savedSupporter.getUserId(), "Inscription réussie", true);
    }

    private AuthResponse registerProvider(SignupRequest request, String encodedPassword, String profilePicturePath) {
        // Save the ServiceType instance first
        ServiceType serviceType = new ServiceType();
        serviceType.setServiceTypeName(request.getServiceType());
        serviceType = serviceTypeRepository.save(serviceType); // Save the ServiceType

        // Create and set up the Provider instance
        Provider provider = new Provider();
        provider.setEmail(request.getEmail());
        provider.setPassword(encodedPassword);
        provider.setFirstName(request.getFirstName());
        provider.setLastName(request.getLastName());
        provider.setBirthDate(request.getBirthDate());
        provider.setNationality(request.getNationality());
        provider.setNationalCode(request.getNationalCode());
        provider.setProfilePicture(profilePicturePath);

        // Associate the saved ServiceType with the Provider
        provider.setServiceTypes(List.of(serviceType));

        // Save the Provider instance
        Provider savedProvider = providerRepository.save(provider);

        String token = jwtUtil.generateToken(savedProvider.getEmail(), "PROVIDER", savedProvider.getUserId());
        System.out.println(token);

        return new AuthResponse(token, "PROVIDER", savedProvider.getUserId(), "Inscription réussie", true);
    }

    private AuthResponse authenticateAdmin(SigninRequest request) {

        Optional<Administrator> adminOpt = administratorRepository.findByEmail(request.getEmail());
        if (adminOpt.isPresent()) {
            Administrator admin = adminOpt.get();
            if (passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
                String token = jwtUtil.generateToken(admin.getEmail(), "ADMIN", admin.getUserId());
                System.out.println("Token: " + token);
                return new AuthResponse(token, "ADMIN", admin.getUserId(), "Connexion réussie", true);

            }
        }

        return new AuthResponse(null, null, null, "Email ou mot de passe incorrect", false);
    }

    private AuthResponse authenticateSupporter(SigninRequest request) {
        Optional<Supporter> supporterOpt = supporterRepository.findByEmail(request.getEmail());

        if (supporterOpt.isPresent()) {
            Supporter supporter = supporterOpt.get();
            if (passwordEncoder.matches(request.getPassword(), supporter.getPassword())) {
                String token = jwtUtil.generateToken(supporter.getEmail(), "SUPPORTER", supporter.getUserId());
                return new AuthResponse(token, "SUPPORTER", supporter.getUserId(), "Connexion réussie", true);
            }
        }

        return new AuthResponse(null, null, null, "Email ou mot de passe incorrect", false);
    }

    private AuthResponse authenticateProvider(SigninRequest request) {
        Optional<Provider> providerOpt = providerRepository.findByEmail(request.getEmail());

        if (providerOpt.isPresent()) {
            Provider provider = providerOpt.get();
            if (passwordEncoder.matches(request.getPassword(), provider.getPassword())) {
                String token = jwtUtil.generateToken(provider.getEmail(), "PROVIDER", provider.getUserId());
                return new AuthResponse(token, "PROVIDER", provider.getUserId(), "Connexion réussie", true);
            }
        }

        return new AuthResponse(null, null, null, "Email ou mot de passe incorrect", false);
    }
}