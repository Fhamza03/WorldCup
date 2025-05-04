package com.fssm.worldcup.Models.Restoration;

import com.fssm.worldcup.Models.General.Supporter;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "supporter_id", nullable = false)
    private Supporter supporter;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    private LocalDateTime orderDate;

    private Double totalAmount;

    private String status;

    private String paymentStatus;

    private String notes; // Représente l'adresse de livraison (deliveryAddress)

    private String phoneNumber; // ✅ À ajouter pour correspondre au DTO

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
}
