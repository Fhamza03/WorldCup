package com.fssm.worldcup.DTOs;

import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public class SignupRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String birthDate;
    private String nationality;
    private String nationalCode;
    private String userType; // "ADMIN", "SUPPORTER", "PROVIDER"
    private MultipartFile profilePicture;

    // Pour Supporter
    private Boolean isFanIdValid;

    // Pour Admin
    private String accessStatistics;
    private String serviceType;

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getServiceType() {
        return serviceType;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Boolean getIsFanIdValid() {
        return isFanIdValid;
    }

    public void setIsFanIdValid(Boolean isFanIdValid) {
        this.isFanIdValid = isFanIdValid;
    }

    public String getAccessStatistics() {
        return accessStatistics;
    }

    public void setAccessStatistics(String accessStatistics) {
        this.accessStatistics = accessStatistics;
    }
    public MultipartFile getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(MultipartFile profilePicture) {
        this.profilePicture = profilePicture;
    }
}