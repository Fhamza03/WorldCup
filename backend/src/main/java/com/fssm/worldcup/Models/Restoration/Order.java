package com.fssm.worldcup.Models.Restoration;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fssm.worldcup.Models.General.Supporter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "restaurant_order") // "order" est un mot réservé dans SQL
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "supporter_id")
    private Supporter supporter;

    private LocalDateTime orderDate;
    private String status; // PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED
    private Double totalAmount;
    private String paymentMethod;
    private String paymentStatus; // PENDING, PAID, FAILED
    private Boolean usedFanId; // Si l'utilisateur a utilisé son Fan ID pour des réductions

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    private LocalDateTime pickupTime;
    private String notes;
}