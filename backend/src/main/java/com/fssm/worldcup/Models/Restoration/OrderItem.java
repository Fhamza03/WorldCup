package com.fssm.worldcup.Models.Restoration;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "order_items")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer productId;
    private String productName;
    private Double productPrice;
    private Integer quantity;

    @OneToMany(mappedBy = "orderItem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemAdditional> additionals;

    private Double totalPrice; // Prix total pour cet item (produit + additifs) * quantité

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}