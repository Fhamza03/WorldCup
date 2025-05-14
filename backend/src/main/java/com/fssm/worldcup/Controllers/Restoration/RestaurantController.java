package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.DTOs.RestaurantDetailsDTO;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Services.Restoration.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Integer id) {
        return restaurantService.getRestaurantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByProvider(@PathVariable Integer providerId) {
        return ResponseEntity.ok(restaurantService.getRestaurantsByProvider(providerId));
    }

    @GetMapping("/cuisine/{cuisineType}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByCuisineType(@PathVariable String cuisineType) {
        return ResponseEntity.ok(restaurantService.getRestaurantsByCuisineType(cuisineType));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(restaurantService.getRestaurantsByLocation(location));
    }

    @GetMapping("/partners")
    public ResponseEntity<List<Restaurant>> getPartnerRestaurants() {
        return ResponseEntity.ok(restaurantService.getPartnerRestaurants());
    }

    @PostMapping("/provider/{providerId}")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant,
                                                       @PathVariable Integer providerId) {
        try {
            Restaurant createdRestaurant = restaurantService.createRestaurant(restaurant, providerId);
            return new ResponseEntity<>(createdRestaurant, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Integer id,
                                                       @RequestBody Restaurant restaurant) {
        try {
            Restaurant updatedRestaurant = restaurantService.updateRestaurant(id, restaurant);
            return ResponseEntity.ok(updatedRestaurant);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/opening-hours")
    public ResponseEntity<Restaurant> updateOpeningHours(@PathVariable Integer id,
                                                         @RequestBody Map<DayOfWeek, String> openingHours) {
        try {
            Restaurant updatedRestaurant = restaurantService.updateOpeningHours(id, openingHours);
            return ResponseEntity.ok(updatedRestaurant);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/provider/{providerId}/details")
    public ResponseEntity<RestaurantDetailsDTO> getRestaurantDetailsByProvider(@PathVariable Integer providerId) {
        RestaurantDetailsDTO restaurantDetails = restaurantService.getRestaurantDetailsByProviderId(providerId);
        return ResponseEntity.ok(restaurantDetails);
    }
    @GetMapping("/{id}/details")
    public ResponseEntity<RestaurantDetailsDTO> getRestaurantDetailsById(@PathVariable Integer id) {
        try {
            RestaurantDetailsDTO restaurantDetails = restaurantService.getRestaurantDetailsById(id);
            return ResponseEntity.ok(restaurantDetails);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/details")
    public ResponseEntity<Restaurant> updateRestaurantWithDetails(@PathVariable Integer id,
                                                                  @RequestBody RestaurantDetailsDTO dto) {
        try {
            Restaurant updated = restaurantService.updateRestaurantWithDetails(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }



}