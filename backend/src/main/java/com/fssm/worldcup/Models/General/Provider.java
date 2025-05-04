package com.fssm.worldcup.Models.General;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonManagedReference;
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fssm.worldcup.Models.Restoration.Restaurant;
>>>>>>> origin/main
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

<<<<<<< HEAD
    @ManyToMany
    @JoinTable(
            name = "provider_service_type",
            joinColumns = @JoinColumn(name = "provider_id"),
            inverseJoinColumns = @JoinColumn(name = "service_type_id")
    )
    @JsonManagedReference  // This marks the forward part of the reference
    private List<ServiceType> serviceTypes;

    // Getters and Setters
=======
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ServiceType> serviceTypes;

    @OneToMany
    @JsonIgnore
    private List<Restaurant> restaurants;

    // Getters et Setters
>>>>>>> origin/main
    public List<ServiceType> getServiceTypes() {
        return serviceTypes;
    }

    public void setServiceTypes(List<ServiceType> serviceTypes) {
        this.serviceTypes = serviceTypes;
    }
<<<<<<< HEAD
}
=======
}

>>>>>>> origin/main
