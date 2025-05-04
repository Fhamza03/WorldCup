package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.DTOs.OrderDTO;
import com.fssm.worldcup.DTOs.OrderItemDTO;
import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Models.Restoration.Order;
import com.fssm.worldcup.Models.Restoration.OrderItem;
import com.fssm.worldcup.Models.Restoration.Product;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Repositories.General.SupporterRepository;
import com.fssm.worldcup.Repositories.Restoration.OrderRepository;
import com.fssm.worldcup.Repositories.Restoration.ProductRepository;
import com.fssm.worldcup.Repositories.Restoration.RestaurantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final SupporterRepository supporterRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        RestaurantRepository restaurantRepository,
                        SupporterRepository supporterRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.supporterRepository = supporterRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order createOrder(OrderDTO orderDTO) {
        // Retrieve restaurant
        Restaurant restaurant = restaurantRepository.findById(orderDTO.getRestaurantId())
                .orElseThrow(() -> new IllegalArgumentException("Restaurant with ID " + orderDTO.getRestaurantId() + " not found"));

        // Retrieve supporter
        Supporter supporter = supporterRepository.findById(orderDTO.getSupporterId())
                .orElseThrow(() -> new IllegalArgumentException("Supporter with ID " + orderDTO.getSupporterId() + " not found"));

        // Create the order entity
        Order order = new Order();
        order.setRestaurant(restaurant);
        order.setSupporter(supporter);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(orderDTO.getOrderStatus());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setPaymentStatus(orderDTO.getPaymentStatus());
        order.setNotes(orderDTO.getDeliveryAddress());
        order.setPhoneNumber(orderDTO.getPhoneNumber());

        // Save order to generate its ID
        Order savedOrder = orderRepository.save(order);
        final Order finalOrder = savedOrder; // required for lambda

        // Create and map each order item
        List<OrderItem> orderItems = orderDTO.getOrderItems().stream().map(itemDTO -> {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product with ID " + itemDTO.getProductId() + " not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(itemDTO.getPrice());
            orderItem.setOrder(finalOrder); // lambda-safe

            return orderItem;
        }).collect(Collectors.toList());

        // Attach items and save final order
        savedOrder.setOrderItems(orderItems);
        return orderRepository.save(savedOrder);
    }
}
