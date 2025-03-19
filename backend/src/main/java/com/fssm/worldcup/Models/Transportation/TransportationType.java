package com.fssm.worldcup.Models.Transportation;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class TransportationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transportationTypeId;
    private String transportationTypeName;
    private String description;
    @ManyToOne
    @JoinColumn(name = "transportation_id", nullable = false)
    private Transportation transportation;
}
