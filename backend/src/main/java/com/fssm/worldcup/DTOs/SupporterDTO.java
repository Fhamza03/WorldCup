package com.fssm.worldcup.DTOs;

import com.fssm.worldcup.Models.General.Card;
import com.fssm.worldcup.Models.General.Supporter;

public class SupporterDTO {
    private Integer userId;
    private String email;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String nationality;
    private String nationalCode;
    private String profilePicture;
    private Boolean isFanIdValid;
    private CardDTO card;

    // Getters and setters

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Boolean getFanIdValid() {
        return isFanIdValid;
    }

    public void setFanIdValid(Boolean fanIdValid) {
        isFanIdValid = fanIdValid;
    }

    public CardDTO getCard() {
        return card;
    }

    public void setCard(CardDTO card) {
        this.card = card;
    }

    // Method to convert from Supporter entity
    public static SupporterDTO fromEntity(Supporter supporter) {
        SupporterDTO dto = new SupporterDTO();
        dto.setUserId(supporter.getUserId());
        dto.setEmail(supporter.getEmail());
        dto.setFirstName(supporter.getFirstName());
        dto.setLastName(supporter.getLastName());
        dto.setBirthDate(supporter.getBirthDate());
        dto.setNationality(supporter.getNationality());
        dto.setNationalCode(supporter.getNationalCode());
        dto.setProfilePicture(supporter.getProfilePicture());
        dto.setFanIdValid(supporter.getIsFanIdValid());

        if (supporter.getCard() != null) {
            dto.setCard(CardDTO.fromEntity(supporter.getCard()));
        }

        return dto;
    }
}


