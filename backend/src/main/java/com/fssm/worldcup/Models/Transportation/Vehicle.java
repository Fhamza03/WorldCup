package com.fssm.worldcup.Models.Transportation;

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
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vehicleId;
    private String registrationNumber;
    private Integer seatsNumber;
    @ManyToOne
    @JoinColumn(name = "transportation_id", nullable = false)
    private Transportation transportation;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<VehicleRoute> vehicleRoutes;
}
