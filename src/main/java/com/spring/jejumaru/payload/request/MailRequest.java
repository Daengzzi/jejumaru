package com.spring.jejumaru.payload.request;

import javax.validation.constraints.NotBlank;

public class MailRequest {
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
