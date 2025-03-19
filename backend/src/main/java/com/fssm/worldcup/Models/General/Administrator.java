package com.fssm.worldcup.Models.General;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Administrator extends User {

    private String accessStatistics;

    // Getters et Setters
    public String getAccessStatistics() {
        return accessStatistics;
    }

    public void setAccessStatistics(String accessStatistics) {
        this.accessStatistics = accessStatistics;
    }
}
