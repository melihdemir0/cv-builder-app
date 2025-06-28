package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.dto.PersonalInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "http://localhost:5173") // React dev sunucusu için
public class CvController {

    @PostMapping("/personal-info")
    public ResponseEntity<String> savePersonalInfo(@RequestBody PersonalInfo info) {
        // Burada veriyi ekrana basıyoruz, sonra DB’ye kaydedeceğiz
        System.out.println("Ad: " + info.getName());
        System.out.println("Email: " + info.getEmail());
        System.out.println("Telefon: " + info.getPhone());

        return ResponseEntity.ok("Kişisel bilgiler alındı.");
    }
}
