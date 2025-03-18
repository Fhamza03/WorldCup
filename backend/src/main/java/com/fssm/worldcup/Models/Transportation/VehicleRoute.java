package com.fssm.worldcup.Models.Transportation;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class VehicleRoute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vehicleRouteId;
    private String startPoint;
    private String endPoint;
    private Integer restStopsNumber;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;
    @OneToMany(mappedBy = "vehicleRoute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Journey> journeys;
}
