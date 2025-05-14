package com.fssm.worldcup.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDetailsDTO {
    private Integer id;
    private Integer productId;
    private String productName;
    private Integer quantity;
    private Double price;
}