package com.fssm.worldcup.Models.Restoration;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_item_additionals")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderItemAdditional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;

    public Double getAdditionalPrice() {
        return this.price;
    }
}