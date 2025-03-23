// SigninRequest.java
package com.fssm.worldcup.DTOs;

public class SigninRequest {
    private String email;
    private String password;
    private String userType; // "ADMIN", "SUPPORTER", "PROVIDER"

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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
