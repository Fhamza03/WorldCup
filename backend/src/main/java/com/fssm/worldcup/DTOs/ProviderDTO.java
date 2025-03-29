package com.fssm.worldcup.DTOs;

import java.util.List;

public class ProviderDTO {
    private Integer userId;
    private String email;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String nationality;
    private String nationalCode;
    private String profilePicture;
    // Optional: Include service type IDs if needed
    private List<Integer> serviceTypeIds;

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

    public List<Integer> getServiceTypeIds() {
        return serviceTypeIds;
    }

    public void setServiceTypeIds(List<Integer> serviceTypeIds) {
        this.serviceTypeIds = serviceTypeIds;
    }
}