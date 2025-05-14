package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.DTOs.MenuDTO;
import com.fssm.worldcup.DTOs.ProductDTO;
import com.fssm.worldcup.DTOs.RestaurantDetailsDTO;
import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Models.Restoration.Menu;
import com.fssm.worldcup.Models.Restoration.Product;
import com.fssm.worldcup.Models.Restoration.ProductMenu;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Repositories.General.ProviderRepository;
import com.fssm.worldcup.Repositories.Restoration.ProductRepository;
import com.fssm.worldcup.Repositories.Restoration.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ProductRepository productRepository;


    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Integer id) {
        return restaurantRepository.findById(id);
    }

    public List<Restaurant> getRestaurantsByProvider(Integer providerId) {
        return restaurantRepository.findByProviderId(providerId);
    }

    public List<Restaurant> getRestaurantsByCuisineType(String cuisineType) {
        return restaurantRepository.findByCuisineType(cuisineType);
    }

    public List<Restaurant> getRestaurantsByLocation(String location) {
        return restaurantRepository.findByLocation(location);
    }

    public List<Restaurant> getPartnerRestaurants() {
        return restaurantRepository.findByIsPartner(true);
    }

    @Transactional
    public Restaurant createRestaurant(Restaurant restaurant, Integer providerId) {
        Optional<Provider> providerOpt = providerRepository.findById(providerId);
        if (providerOpt.isPresent()) {
            restaurant.setProvider(providerOpt.get());
            restaurant.setIsPartner(true); // Default value for new restaurants
            return restaurantRepository.save(restaurant);
        }
        throw new IllegalArgumentException("Provider not found with ID: " + providerId);
    }

    @Transactional
    public Restaurant updateRestaurant(Integer id, Restaurant restaurantDetails) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(id);
        if (restaurantOpt.isPresent()) {
            Restaurant restaurant = restaurantOpt.get();

            // Update basic info
            restaurant.setName(restaurantDetails.getName());
            restaurant.setDescription(restaurantDetails.getDescription());
            restaurant.setCuisineType(restaurantDetails.getCuisineType());
            restaurant.setLocation(restaurantDetails.getLocation());
            restaurant.setAddress(restaurantDetails.getAddress());
            restaurant.setContactPhone(restaurantDetails.getContactPhone());
            restaurant.setEmail(restaurantDetails.getEmail());

            return restaurantRepository.save(restaurant);
        }
        throw new IllegalArgumentException("Restaurant not found with ID: " + id);
    }

    @Transactional
    public Restaurant updateOpeningHours(Integer id, Map<DayOfWeek, String> openingHours) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(id);
        if (restaurantOpt.isPresent()) {
            Restaurant restaurant = restaurantOpt.get();
            restaurant.setOpeningHours(openingHours);
            return restaurantRepository.save(restaurant);
        }
        throw new IllegalArgumentException("Restaurant not found with ID: " + id);
    }

    @Transactional
    public void deleteRestaurant(Integer id) {
        restaurantRepository.deleteById(id);
    }

    private RestaurantDetailsDTO mapToRestaurantDetailsDTO(Restaurant restaurant) {
        List<MenuDTO> menus = restaurant.getMenus().stream().map(menu -> {
            List<ProductDTO> products = menu.getProductMenus().stream()
                    .map(ProductMenu::getProduct)
                    .map(product -> new ProductDTO(
                            product.getId(),
                            product.getName(),
                            product.getDescription(),
                            product.getPrice(),
                            product.getIsAvailable()
                    ))
                    .collect(Collectors.toList());

            return new MenuDTO(
                    menu.getId(),
                    menu.getName(),
                    menu.getDescription(),
                    menu.getIsSpecialOffer(),
                    menu.getOriginalPrice(),
                    menu.getDiscountedPrice(),
                    products
            );
        }).collect(Collectors.toList());

        return new RestaurantDetailsDTO(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getAddress(),
                restaurant.getCuisineType(),
                restaurant.getContactPhone(),
                restaurant.getEmail(),
                restaurant.getIsPartner(),
                restaurant.getOpeningHours(), // ✅ AJOUT
                menus
        );
    }
    public RestaurantDetailsDTO getRestaurantDetailsByProviderId(Integer providerId) {
        Restaurant restaurant = restaurantRepository.findByProviderId(providerId).stream()
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found for the given provider"));

        return mapToRestaurantDetailsDTO(restaurant);
    }
    public RestaurantDetailsDTO getRestaurantDetailsById(Integer id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found with ID: " + id));

        return mapToRestaurantDetailsDTO(restaurant);
    }
    @Transactional
    public Restaurant updateRestaurantWithDetails(Integer id, RestaurantDetailsDTO dto) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found with ID: " + id));

        // ✅ Mise à jour des infos de base
        restaurant.setName(dto.getName());
        restaurant.setDescription(dto.getDescription());
        restaurant.setCuisineType(dto.getCuisineType());
        restaurant.setLocation(dto.getAddress()); // Vérifie si location != address
        restaurant.setAddress(dto.getAddress());
        restaurant.setContactPhone(dto.getContactPhone());
        restaurant.setEmail(dto.getEmail());
        restaurant.setOpeningHours(dto.getOpeningHours());

        // ✅ Supprimer les anciens menus
        restaurant.getMenus().clear();

        for (MenuDTO menuDTO : dto.getMenus()) {
            Menu menu = new Menu();
            // Ne jamais utiliser d'ID négatif (généré temporairement côté front)
            if (menuDTO.getId() != null && menuDTO.getId() > 0) {
                menu.setId(menuDTO.getId());
            }

            menu.setName(menuDTO.getName());
            menu.setDescription(menuDTO.getDescription());
            menu.setIsSpecialOffer(menuDTO.getIsSpecialOffer());
            menu.setOriginalPrice(menuDTO.getOriginalPrice());
            menu.setDiscountedPrice(menuDTO.getDiscountedPrice());
            menu.setRestaurant(restaurant);

            for (ProductDTO productDTO : menuDTO.getProducts()) {
                Product product;

                if (productDTO.getId() != null && productDTO.getId() > 0) {
                    // Produit existant : mise à jour
                    product = productRepository.findById(productDTO.getId())
                            .orElseThrow(() -> new IllegalArgumentException("Produit introuvable avec ID: " + productDTO.getId()));
                    product.setName(productDTO.getName());
                    product.setDescription(productDTO.getDescription());
                    product.setPrice(productDTO.getPrice());
                    product.setIsAvailable(productDTO.getIsAvailable());
                } else {
                    // Nouveau produit
                    product = new Product();
                    product.setName(productDTO.getName());
                    product.setDescription(productDTO.getDescription());
                    product.setPrice(productDTO.getPrice());
                    product.setIsAvailable(productDTO.getIsAvailable());
                }

                ProductMenu productMenu = new ProductMenu();
                productMenu.setMenu(menu);
                productMenu.setProduct(product);

                menu.getProductMenus().add(productMenu);
            }

            restaurant.getMenus().add(menu);
        }

        return restaurantRepository.save(restaurant);
    }



}   