package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.User;
import com.cvbuilder.backend.repository.UserRepository;
import com.cvbuilder.backend.service.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    // Geçici olarak doğrulama kodlarını email => code olarak saklar
    private final Map<String, String> resetCodeStore = new ConcurrentHashMap<>();

    // 1. KOD GÖNDERME
    @PostMapping("/send-reset-code")
    public ResponseEntity<?> sendResetCode(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("E-posta girilmedi.");
        }

        Optional<User> user = userRepository.findAll().stream()
                .filter(u -> u.getEmail() != null && u.getEmail().equalsIgnoreCase(email))
                .findFirst();

        if (user.isEmpty()) {
            return ResponseEntity.status(404).body("Kullanıcı bulunamadı.");
        }

        String code = String.format("%06d", new Random().nextInt(999999));
        resetCodeStore.put(email, code);
        emailService.sendVerificationCode(email, code);

        return ResponseEntity.ok("Doğrulama kodu e-posta adresinize gönderildi.");
    }

    // 2. ŞİFRE SIFIRLAMA
    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String code = body.get("code");
        String newPassword = body.get("newPassword");

        if (email == null || code == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Eksik bilgi gönderildi.");
        }

        if (!resetCodeStore.containsKey(email)) {
            return ResponseEntity.status(400).body("Kod gönderilmemiş.");
        }

        if (!resetCodeStore.get(email).equals(code)) {
            return ResponseEntity.status(400).body("Kod geçersiz.");
        }

        Optional<User> optionalUser = userRepository.findAll().stream()
                .filter(u -> u.getEmail() != null && u.getEmail().equalsIgnoreCase(email))
                .findFirst();

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("Kullanıcı bulunamadı.");
        }

        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        resetCodeStore.remove(email);  // kodu temizle

        return ResponseEntity.ok("Şifre başarıyla güncellendi.");
    }
}
