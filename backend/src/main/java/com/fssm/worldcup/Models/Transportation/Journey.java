package com.fssm.worldcup.Models.Transportation;

import com.fssm.worldcup.Models.General.Supporter;
import jakarta.persistence.*;

@Entity
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer journeyId;
    private Double journeyPrice;
    @ManyToOne
    @JoinColumn(name = "supporter_id", nullable = false)
    private Supporter supporter;
    @ManyToOne
    @JoinColumn(name = "vehicle_route_id", nullable = false)
    private VehicleRoute vehicleRoute;
}
