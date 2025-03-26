package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy = "provider")
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "provider_service_type",
            joinColumns = @JoinColumn(name = "provider_id"),
            inverseJoinColumns = @JoinColumn(name = "service_type_id")
    )
    private List<ServiceType> serviceTypes;


    @OneToMany
    @JsonIgnore
    private List<Restaurant> restaurants;

    // Getters and Setters
    public List<ServiceType> getServiceTypes() {
        return serviceTypes;
    }

    public void setServiceTypes(List<ServiceType> serviceTypes) {
        this.serviceTypes = serviceTypes;
    }
}
