package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.DTOs.OrderDTO;
import com.fssm.worldcup.DTOs.OrderDetailsDTO;
import com.fssm.worldcup.Models.Restoration.Order;
import com.fssm.worldcup.Services.Restoration.OrderService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/restaurant/{restaurantId}/supporter/{supporterId}")
    public ResponseEntity<Order> createOrder(
            @PathVariable Integer restaurantId,
            @PathVariable Integer supporterId,
            @RequestBody OrderDTO orderDTO) {

        // Set restaurantId and supporterId in the DTO
        orderDTO.setRestaurantId(restaurantId);
        orderDTO.setSupporterId(supporterId);

        // Create the order
        Order createdOrder = orderService.createOrder(orderDTO);

        return ResponseEntity.ok(createdOrder);
    }


    @GetMapping("/{orderId}/details")
    public ResponseEntity<OrderDetailsDTO> getOrderDetails(@PathVariable Integer orderId) {
        OrderDetailsDTO orderDetails = orderService.getOrderDetails(orderId);
        return ResponseEntity.ok(orderDetails);
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
    @PatchMapping("/{id}/payment-status")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Integer id, @RequestParam String paymentStatus) {
        try {
            Order updatedOrder = orderService.updatePaymentStatus(id, paymentStatus);
            return ResponseEntity.ok(updatedOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
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

}