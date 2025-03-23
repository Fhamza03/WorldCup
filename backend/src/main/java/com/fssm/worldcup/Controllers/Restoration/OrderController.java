package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.Models.Restoration.Order;
import com.fssm.worldcup.Services.Restoration.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrdersByRestaurant(@PathVariable Integer restaurantId) {
        return ResponseEntity.ok(orderService.getOrdersByRestaurant(restaurantId));
    }

    @GetMapping("/supporter/{supporterId}")
    public ResponseEntity<List<Order>> getOrdersBySupporter(@PathVariable Integer supporterId) {
        return ResponseEntity.ok(orderService.getOrdersBySupporter(supporterId));
    }

    @GetMapping("/restaurant/{restaurantId}/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByRestaurantAndStatus(
            @PathVariable Integer restaurantId,
            @PathVariable String status) {
        return ResponseEntity.ok(orderService.getOrdersByRestaurantAndStatus(restaurantId, status));
    }

    @GetMapping("/restaurant/{restaurantId}/period")
    public ResponseEntity<List<Order>> getOrdersByPeriod(
            @PathVariable Integer restaurantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(orderService.getOrdersByPeriod(restaurantId, start, end));
    }

    @GetMapping("/fan-id")
    public ResponseEntity<List<Order>> getOrdersWithFanId() {
        return ResponseEntity.ok(orderService.getOrdersWithFanId());
    }

    @PostMapping("/restaurant/{restaurantId}/supporter/{supporterId}")
    public ResponseEntity<?> createOrder(@RequestBody Order order,
                                         @PathVariable Integer restaurantId,
                                         @PathVariable Integer supporterId) {
        try {
            Order createdOrder = orderService.createOrder(order, restaurantId, supporterId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Integer id, @RequestParam String status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/payment-status")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Integer id, @RequestParam String paymentStatus) {
        try {
            Order updatedOrder = orderService.updatePaymentStatus(id, paymentStatus);
            return ResponseEntity.ok(updatedOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}