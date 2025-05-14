package com.fssm.worldcup.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsDTO {
    private Integer id;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private String deliveryAddress;
    private String phoneNumber;
    private String orderStatus;
    private String paymentStatus;
    private List<OrderItemDetailsDTO> orderItems;
}