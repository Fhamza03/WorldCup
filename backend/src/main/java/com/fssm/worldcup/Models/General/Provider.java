package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Provider extends User{
    @OneToMany(mappedBy = "provider")
    private List<ServiceType> serviceTypes;
}
