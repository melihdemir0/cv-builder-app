package com.cvbuilder.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationCode(String to, String code) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("CV Uygulaması - Şifre Sıfırlama Kodu");
        msg.setText("Şifre sıfırlama doğrulama kodunuz: " + code);
        mailSender.send(msg);
    }
}
