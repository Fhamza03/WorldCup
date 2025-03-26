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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<ProductMenu> getProductMenus() {
        return productMenus;
    }

    public void setProductMenus(List<ProductMenu> productMenus) {
        this.productMenus = productMenus;
    }

    public MenuType getMenuType() {
        return menuType;
    }

    public void setMenuType(MenuType menuType) {
        this.menuType = menuType;
    }

    public Boolean getIsSpecialOffer() {
        return isSpecialOffer;
    }

    public void setIsSpecialOffer(Boolean specialOffer) {
        isSpecialOffer = specialOffer;
    }

    public Boolean getRequiresFanId() {
        return requiresFanId;
    }

    public void setRequiresFanId(Boolean requiresFanId) {
        this.requiresFanId = requiresFanId;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public String getPromotionDetails() {
        return promotionDetails;
    }

    public void setPromotionDetails(String promotionDetails) {
        this.promotionDetails = promotionDetails;
    }
}