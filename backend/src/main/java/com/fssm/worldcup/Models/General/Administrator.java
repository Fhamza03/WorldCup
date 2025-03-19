package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;

@Entity
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
