package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;

@Entity
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceTypeId;
    private String serviceTypeName;
    @ManyToOne
    private Provider provider;
}
