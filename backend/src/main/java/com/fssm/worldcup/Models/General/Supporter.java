package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fssm.worldcup.Models.Accommondation.Reservation;
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

//    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
//    @JoinColumn(name = "card_id", unique = true, nullable = true)
//    private Card card;

//    @OneToOne(mappedBy = "supporter", cascade = CascadeType.ALL)
//    private Card card;
//


    @OneToMany(mappedBy = "supporter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Reservation> reservations;
}
