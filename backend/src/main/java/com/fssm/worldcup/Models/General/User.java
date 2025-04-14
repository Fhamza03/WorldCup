package com.fssm.worldcup.Models.General;

import com.fssm.worldcup.Models.Accommondation.Reservation;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
