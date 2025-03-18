package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Provider extends User{
    @OneToMany(mappedBy = "provider")
    private List<ServiceType> serviceTypes;
}
