package com.fssm.worldcup.Models.General;

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
    private List<Journey> journeys;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private Card card;
}
