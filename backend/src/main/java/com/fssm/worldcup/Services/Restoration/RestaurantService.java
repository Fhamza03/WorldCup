package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Repositories.General.ProviderRepository;
import com.fssm.worldcup.Repositories.Restoration.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ProviderRepository providerRepository;

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
}   