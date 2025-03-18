package com.fssm.worldcup.Models.Transportation;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeId;
    private String routeName;
    private String estimatedTime;
    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehicleRoute> vehicleRoutes;
}
