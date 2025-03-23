package com.fssm.worldcup.Models.Transportation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fssm.worldcup.Models.General.Supporter;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer journeyId;
    private Double journeyPrice;
    @ManyToOne
    @JoinColumn(name = "supporter_id")
    @JsonIgnoreProperties("journeys") // Use this instead of @JsonBackReference
    private Supporter supporter;
    @ManyToOne
    @JoinColumn(name = "vehicle_route_id", nullable = false)
    private VehicleRoute vehicleRoute;
}
