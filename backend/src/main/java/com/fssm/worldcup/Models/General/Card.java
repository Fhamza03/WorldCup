package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardId;

    private String cardNumber;
    private String cardType;
    private String issueDate;
    private String expiryDate;

    // Define proper relationship with Supporter
    @OneToOne(mappedBy = "card")
    private Supporter supporter;

}
