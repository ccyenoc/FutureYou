package com.futureyou.backend.dto;

public class AuthResponse {

    private Long userId;

    private String username;

    private String email;

    private String profilePictureUrl;

    private String message;

    private String token;

    public void setToken(String token) {
        this.token = token;
    }

    public AuthResponse() {
    }

    public AuthResponse(
            Long userId,
            String username,
            String email,
            String profilePictureUrl,
            String message,
            String token) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
        this.message = message;
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }
}