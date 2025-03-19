package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer cardId;

    String cardNumber;
    String cardType;
    String issueDate;
    String expiryDate;

    @OneToOne(mappedBy = "card")
    Supporter supporter;
}
