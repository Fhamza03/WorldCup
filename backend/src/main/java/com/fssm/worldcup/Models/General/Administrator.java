package com.fssm.worldcup.Models.General;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Administrator extends User {
    private String AccessStatistics;
}
