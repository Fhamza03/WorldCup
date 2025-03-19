package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
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
