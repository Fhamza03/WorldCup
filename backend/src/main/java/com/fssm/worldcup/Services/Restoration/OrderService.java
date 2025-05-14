package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.DTOs.*;
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
import java.util.Optional;
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
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
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

    /**
     * Get detailed order information including product names
     * @param orderId The ID of the order to retrieve
     * @return OrderDetailsDTO containing all order details with product names
     */
    @Transactional(readOnly = true)
    public OrderDetailsDTO getOrderDetails(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order with ID " + orderId + " not found"));

        // Create the OrderDetailsDTO
        OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
        orderDetailsDTO.setId(order.getId());
        orderDetailsDTO.setOrderDate(order.getOrderDate());
        orderDetailsDTO.setTotalAmount(order.getTotalAmount());
        orderDetailsDTO.setDeliveryAddress(order.getNotes()); // Notes field is used for delivery address
        orderDetailsDTO.setPhoneNumber(order.getPhoneNumber());
        orderDetailsDTO.setOrderStatus(order.getStatus());
        orderDetailsDTO.setPaymentStatus(order.getPaymentStatus());

        // Map order items with product names
        List<OrderItemDetailsDTO> orderItemDetailsDTOs = order.getOrderItems().stream()
                .map(item -> {
                    OrderItemDetailsDTO itemDTO = new OrderItemDetailsDTO();
                    itemDTO.setId(item.getId());
                    itemDTO.setProductId(item.getProduct().getId());
                    itemDTO.setProductName(item.getProduct().getName());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        orderDetailsDTO.setOrderItems(orderItemDetailsDTOs);

        return orderDetailsDTO;
    }

    public List<Order> getOrdersByRestaurant(Integer restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }
    public List<Order> getOrdersBySupporter(Integer supporterId) {
        return orderRepository.findBySupporter_UserId(supporterId);
    }
    public List<Order> getOrdersByRestaurantAndStatus(Integer restaurantId, String status) {
        return orderRepository.findByRestaurantIdAndStatus(restaurantId, status);
    }
    public List<Order> getOrdersByPeriod(Integer restaurantId, LocalDateTime start, LocalDateTime end) {
        return orderRepository.findByRestaurantIdAndOrderDateBetween(restaurantId, start, end);
    }
    @Transactional
    public Order updatePaymentStatus(Integer id, String paymentStatus) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();

            // Validation du statut de paiement
            if (!isValidPaymentStatus(paymentStatus)) {
                throw new IllegalArgumentException("Invalid payment status: " + paymentStatus);
            }

            order.setPaymentStatus(paymentStatus);
            return orderRepository.save(order);
        }
        throw new IllegalArgumentException("Order not found with ID: " + id);
    }
    private boolean isValidPaymentStatus(String status) {
        return status.equals("PENDING") ||
                status.equals("PAID") ||
                status.equals("FAILED");
    }

    @Transactional
    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    @Transactional
    public Order updateOrderStatus(Integer id, String status) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();

            // Validation du statut
            if (!isValidStatus(status)) {
                throw new IllegalArgumentException("Invalid order status: " + status);
            }

            order.setStatus(status);
            return orderRepository.save(order);
        }
        throw new IllegalArgumentException("Order not found with ID: " + id);
    }
    private boolean isValidStatus(String status) {
        return status.equals("PENDING") ||
                status.equals("CONFIRMED") ||
                status.equals("PREPARING") ||
                status.equals("READY") ||
                status.equals("COMPLETED") ||
                status.equals("CANCELLED");
    }

}