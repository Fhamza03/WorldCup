// src/main/java/com/fssm/worldcup/Models/General/ServiceType.java
package com.fssm.worldcup.Models.General;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceTypeId;
    private String serviceTypeName;
<<<<<<< HEAD

    @ManyToMany(mappedBy = "serviceTypes")
    @JsonIgnore  // This will prevent the providers field from being serialized
    private List<Provider> providers;

    // Getters and Setters
    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }

    public String getServiceTypeName() {
        return serviceTypeName;
    }
=======
    @ManyToOne
    private Provider provider;
>>>>>>> origin/main

    public void setServiceTypeName(String serviceTypeName) {
        this.serviceTypeName = serviceTypeName;
    }

<<<<<<< HEAD
    public List<Provider> getProviders() {
        return providers;
    }

    public void setProviders(List<Provider> providers) {
        this.providers = providers;
    }
}
=======
}
>>>>>>> origin/main
