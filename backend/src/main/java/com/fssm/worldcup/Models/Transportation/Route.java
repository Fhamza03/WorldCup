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
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeId;
    private String routeName;
    private String estimatedTime;
    @OneToMany(mappedBy = "route")
    @JsonIgnore
    private List<VehicleRoute> vehicleRoutes;
}
