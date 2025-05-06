package com.fssm.worldcup.Models.Accommondation;

import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Models.General.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reservationId;

    @ManyToOne
    @JoinColumn(name = "idAccommodation")
    private Accommodation accommodation;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Supporter supporter;

}