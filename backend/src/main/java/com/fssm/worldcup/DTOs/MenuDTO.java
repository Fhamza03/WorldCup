package com.fssm.worldcup.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuDTO {
    private Integer id;
    private String name;
    private String description;
    private Boolean isSpecialOffer;
    private Double originalPrice;
    private Double discountedPrice;

    private List<ProductDTO> products;
}
