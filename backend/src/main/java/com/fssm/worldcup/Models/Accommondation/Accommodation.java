package com.fssm.worldcup.Models.Accommondation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fssm.worldcup.Models.General.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAccommodation;
    private String address;
    private Integer roomsCount;
    private Integer bathroomsCount;
    private Integer showersCount;
    private Boolean wifiAvailable;
    private Double priceForNight;

    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Reservation> reservations;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

}
