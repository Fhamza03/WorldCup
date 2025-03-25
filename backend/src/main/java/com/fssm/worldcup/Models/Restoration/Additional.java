package com.fssm.worldcup.Models.Restoration;

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
public class Additional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private Double price;
    private Boolean isAvailable;
    @JsonIgnore
    @OneToMany(mappedBy = "additional", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductAdditional> productAdditionals;
}