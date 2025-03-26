package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fssm.worldcup.Models.Transportation.Journey;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Supporter extends User {

    private Boolean isFanIdValid;

    @OneToMany(mappedBy = "supporter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Journey> journeys;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private Card card;

    // Getters et Setters
    public Boolean getIsFanIdValid() {
        return isFanIdValid;
    }

    public void setIsFanIdValid(Boolean isFanIdValid) {
        this.isFanIdValid = isFanIdValid;
    }

    public List<Journey> getJourneys() {
        return journeys;
    }

    public void setJourneys(List<Journey> journeys) {
        this.journeys = journeys;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

}
