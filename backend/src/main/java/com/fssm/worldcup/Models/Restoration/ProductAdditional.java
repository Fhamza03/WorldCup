package com.fssm.worldcup.Models.Restoration;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductAdditional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductWithAdd product;

    @ManyToOne
    @JoinColumn(name = "additional_id")
    private Additional additional;

    private Double additionalPrice; // Prix spécifique pour cet additif avec ce produit
}