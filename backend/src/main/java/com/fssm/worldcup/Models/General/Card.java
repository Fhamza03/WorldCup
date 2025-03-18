package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardId;
    private String cardName;
    private String fanId;
    @OneToOne(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private Supporter supporter;
}
