package com.spring.jejumaru.configuration.mail;

import org.springframework.core.io.ClassPathResource;

public interface EmailSender {
    void sendEmail(String address, String subject, String content);
}
