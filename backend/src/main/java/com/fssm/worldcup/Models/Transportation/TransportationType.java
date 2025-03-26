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
public class TransportationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transportationTypeId;
    private String transportationTypeName;
    private String description;
    @OneToMany(mappedBy = "transportationType")
    @JsonIgnore
    private List<Transportation> transportations;
}
