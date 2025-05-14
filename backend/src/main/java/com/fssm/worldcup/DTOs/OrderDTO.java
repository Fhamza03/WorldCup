package com.fssm.worldcup.DTOs;

import com.fssm.worldcup.DTOs.OrderItemDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Integer supporterId;
    private Integer restaurantId;
    private String deliveryAddress;
    private String phoneNumber;
    private Double totalAmount;
    private String orderStatus;
    private String paymentStatus;
    private List<OrderItemDTO> orderItems;
}
