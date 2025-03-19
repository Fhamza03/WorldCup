// AuthResponse.java
package com.fssm.worldcup.DTOs;

public class AuthResponse {
    private String token;
    private String userType;
    private Integer userId;
    private String message;
    private boolean success;

    public AuthResponse(String token, String userType, Integer userId, String message, boolean success) {
        this.token = token;
        this.userType = userType;
        this.userId = userId;
        this.message = message;
        this.success = success;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}