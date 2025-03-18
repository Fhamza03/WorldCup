package com.fssm.worldcup.Models.General;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.util.Date;

@MappedSuperclass
@Getter
@Setter
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Date birthDate;
    private String nationality;
    private String nationalCode;
}
