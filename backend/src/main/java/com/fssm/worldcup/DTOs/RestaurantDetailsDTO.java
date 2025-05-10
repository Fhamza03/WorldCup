package com.fssm.worldcup.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDetailsDTO {
    private Integer id;
    private String name;
    private String description;
    private String address;
    private String cuisineType;
    private String contactPhone;
    private String email;
    private Boolean isPartner;
    private Map<DayOfWeek, String> openingHours; // ✅ AJOUT


    private List<MenuDTO> menus;
}