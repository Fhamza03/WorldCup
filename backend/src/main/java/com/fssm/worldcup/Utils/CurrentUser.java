package com.fssm.worldcup.Utils;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class CurrentUser {
    private Integer userId;
    private String email;
    private String userType;
    private boolean authenticated = false;

    public void setUser(Integer userId, String email, String userType) {
        this.userId = userId;
        this.email = email;
        this.userType = userType;
        this.authenticated = true;
    }

    public void clear() {
        this.userId = null;
        this.email = null;
        this.userType = null;
        this.authenticated = false;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getUserType() {
        return userType;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public boolean isAdmin() {
        return authenticated && "ADMIN".equals(userType);
    }

    public boolean isSupporter() {
        return authenticated && "SUPPORTER".equals(userType);
    }

    public boolean isProvider() {
        return authenticated && "PROVIDER".equals(userType);
    }
}