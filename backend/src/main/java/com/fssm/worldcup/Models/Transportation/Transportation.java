package com.fssm.worldcup.Models.Transportation;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Transportation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transportationId;
    private String transportationProviderName;
    @OneToMany(mappedBy = "transportation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransportationType> transportationTypes;
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
}
