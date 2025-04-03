package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findByCuisineType(String cuisineType);
    List<Restaurant> findByLocation(String location);
    List<Restaurant> findByIsPartner(Boolean isPartner);

    @Query("SELECT r FROM Restaurant r JOIN r.provider p WHERE p.userId = :providerId")
    List<Restaurant> findByProviderId(Integer providerId);
}