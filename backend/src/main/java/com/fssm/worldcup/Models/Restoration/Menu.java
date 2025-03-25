package com.fssm.worldcup.Models.Restoration;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "menu_type_id")
    private MenuType menuType;

    @JsonIgnore
    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductMenu> productMenus;

    private Boolean isSpecialOffer;
    private Boolean requiresFanId;
    private Double originalPrice;
    private Double discountedPrice;
    private String promotionDetails;
}