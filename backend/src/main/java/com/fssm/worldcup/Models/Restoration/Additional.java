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
public class Additional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private Double price;
    private Boolean isAvailable;
    @JsonIgnore
    @OneToMany(mappedBy = "additional", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductAdditional> productAdditionals;

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean available) {
        isAvailable = available;
    }

    public List<ProductAdditional> getProductAdditionals() {
        return productAdditionals;
    }

    public void setProductAdditionals(List<ProductAdditional> productAdditionals) {
        this.productAdditionals = productAdditionals;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
