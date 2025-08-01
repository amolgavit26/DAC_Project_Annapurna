package com.annapurna.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendStatusUpdateEmail(String to, String customerName, String tiffinName, String status) {
        String subject = "Your Tiffin Order Status Updated";
        String body = "Hi " + customerName + ",\n\n" +
                "The status of your order for '" + tiffinName + "' has been updated to: " + status + ".\n\n" +
                "Thank you for choosing Annapurna!";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
