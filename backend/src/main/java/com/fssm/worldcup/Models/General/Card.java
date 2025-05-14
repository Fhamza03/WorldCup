package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

//    @OneToOne(mappedBy = "card")
//    @JoinColumn(name = "supporter_id", unique = true, nullable = false)
//    Supporter supporter;

    @OneToOne
    @JoinColumn(name = "supporter_id", unique = true)
    @JsonIgnore
    private Supporter supporter;

}
