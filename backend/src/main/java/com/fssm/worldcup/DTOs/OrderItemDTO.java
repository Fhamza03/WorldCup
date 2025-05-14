package com.fssm.worldcup.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Integer productId;
    private Integer quantity;
    private Double price;
}