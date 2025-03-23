package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Models.Restoration.*;
import com.fssm.worldcup.Repositories.General.SupporterRepository;
import com.fssm.worldcup.Repositories.Restoration.OrderRepository;
import com.fssm.worldcup.Repositories.Restoration.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private SupporterRepository supporterRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
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

    public List<Order> getOrdersWithFanId() {
        return orderRepository.findByUsedFanId(true);
    }

    @Transactional
    public Order createOrder(Order order, Integer restaurantId, Integer supporterId) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(restaurantId);
        Optional<Supporter> supporterOpt = supporterRepository.findById(supporterId);

        if (restaurantOpt.isPresent() && supporterOpt.isPresent()) {
            // Vérifier si le supporter a un Fan ID valide s'il utilise des offres Fan ID
            if (order.getUsedFanId() && !supporterOpt.get().getIsFanIdValid()) {
                throw new IllegalArgumentException("Cannot use Fan ID discounts with invalid Fan ID");
            }

            order.setRestaurant(restaurantOpt.get());
            order.setSupporter(supporterOpt.get());
            order.setOrderDate(LocalDateTime.now());
            order.setStatus("PENDING"); // Statut initial

            // Calculer le montant total de la commande
            double totalAmount = 0.0;
            for (OrderItem item : order.getOrderItems()) {
                double itemTotal = item.getProductPrice() * item.getQuantity();

                // Ajouter le prix des additionnels
                if (item.getAdditionals() != null) {
                    for (OrderItemAdditional add : item.getAdditionals()) {
                        itemTotal += add.getAdditionalPrice() * item.getQuantity();
                    }
                }

                item.setTotalPrice(itemTotal);
                totalAmount += itemTotal;
            }

            order.setTotalAmount(totalAmount);

            return orderRepository.save(order);
        }
        throw new IllegalArgumentException("Restaurant or Supporter not found");
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

    private boolean isValidStatus(String status) {
        return status.equals("PENDING") ||
                status.equals("CONFIRMED") ||
                status.equals("PREPARING") ||
                status.equals("READY") ||
                status.equals("COMPLETED") ||
                status.equals("CANCELLED");
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
}