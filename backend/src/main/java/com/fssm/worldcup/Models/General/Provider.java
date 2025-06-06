package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fssm.worldcup.Models.Accommondation.Accommodation;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import jakarta.persistence.*;
        import lombok.*;

        import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Provider extends User {

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ServiceType> serviceTypes;

    @OneToMany
    @JsonIgnore
    private List<Restaurant> restaurants;

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Accommodation> accommodations;

    // Getters et Setters
    public List<ServiceType> getServiceTypes() {
        return serviceTypes;
    }

    public void setServiceTypes(List<ServiceType> serviceTypes) {
        this.serviceTypes = serviceTypes;
    }
}

