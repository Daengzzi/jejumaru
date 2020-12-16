package com.spring.jejumaru.configuration.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailSenderImpl implements EmailSender{
    @Autowired
    private JavaMailSender sender;

    @Override
    public void sendEmail(String address, String subject, String content) {


        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@jejumaru.com");
            helper.setTo(address);
            helper.setSubject(subject);
            helper.setText(content, true);

            sender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
