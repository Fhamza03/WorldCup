package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.DTOs.OrderDTO;
import com.fssm.worldcup.DTOs.OrderDetailsDTO;
import com.fssm.worldcup.Models.Restoration.Order;
import com.fssm.worldcup.Services.Restoration.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Get detailed order information including product names
     * @param orderId The ID of the order to retrieve
     * @return OrderDetailsDTO containing all order details with product names
     */
    @GetMapping("/{orderId}/details")
    public ResponseEntity<OrderDetailsDTO> getOrderDetails(@PathVariable Integer orderId) {
        OrderDetailsDTO orderDetails = orderService.getOrderDetails(orderId);
        return ResponseEntity.ok(orderDetails);
    }
}