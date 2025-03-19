package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Provider extends User {

    @OneToMany(mappedBy = "provider")
    private List<ServiceType> serviceTypes;

    // Getters et Setters
    public List<ServiceType> getServiceTypes() {
        return serviceTypes;
    }

    public void setServiceTypes(List<ServiceType> serviceTypes) {
        this.serviceTypes = serviceTypes;
    }
}
