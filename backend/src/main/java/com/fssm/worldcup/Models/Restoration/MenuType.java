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
public class MenuType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name; // Ex: Entrées, Plats principaux, Desserts, etc.
    private String description;
    private Integer displayOrder; // Pour afficher les catégories dans un ordre spécifique
    @JsonIgnore
    @OneToMany(mappedBy = "menuType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> menus;
}