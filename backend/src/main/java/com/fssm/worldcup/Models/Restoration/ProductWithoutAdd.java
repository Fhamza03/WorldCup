package com.fssm.worldcup.Models.Restoration;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class ProductWithoutAdd extends Product {
    // Classe qui hérite de Product sans fonctionnalités supplémentaires
    // Utilisée pour les produits qui n'ont pas d'additionnels
}