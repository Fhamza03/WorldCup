package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByRestaurantId(Integer restaurantId);
    List<Order> findBySupporter_UserId(Integer supporterId);
    List<Order> findByRestaurantIdAndStatus(Integer restaurantId, String status);
    List<Order> findByRestaurantIdAndOrderDateBetween(Integer restaurantId, LocalDateTime start, LocalDateTime end);
    List<Order> findByUsedFanId(Boolean usedFanId);
}