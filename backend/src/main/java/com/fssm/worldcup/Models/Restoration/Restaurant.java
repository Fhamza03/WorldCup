package com.fssm.worldcup.Models.Restoration;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fssm.worldcup.Models.General.Provider;
import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private String cuisineType;
    private String location;
    private String address;

    @ElementCollection
    @CollectionTable(name = "restaurant_opening_hours",
            joinColumns = @JoinColumn(name = "restaurant_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "day_of_week")
    private Map<DayOfWeek, String> openingHours;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> menus;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    @JsonIgnore
    private Provider provider;

    private String contactPhone;
    private String email;
    private Boolean isPartner;
}