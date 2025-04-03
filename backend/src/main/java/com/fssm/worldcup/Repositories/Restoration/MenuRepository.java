package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {
    List<Menu> findByRestaurantId(Integer restaurantId);
    List<Menu> findByRestaurantIdAndIsSpecialOffer(Integer restaurantId, Boolean isSpecialOffer);
    List<Menu> findByRestaurantIdAndRequiresFanId(Integer restaurantId, Boolean requiresFanId);
}
