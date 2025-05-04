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
public class Transportation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transportationId;
    private String transportationProviderName;
    @ManyToOne
    @JoinColumn(name = "transportation_type_id", nullable = false)
    private TransportationType transportationType;
    @OneToMany(mappedBy = "transportation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Vehicle> vehicles;
}
