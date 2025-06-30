package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.Education;
import com.cvbuilder.backend.repository.EducationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    private final EducationRepository educationRepository;

    public EducationController(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @PostMapping
    public ResponseEntity<Education> save(@RequestBody Education education) {
        // Console log burada
        System.out.println("✅ Eğitim Bilgisi Alındı:");
        System.out.println("- Okul: " + education.getSchoolName());
        System.out.println("- Derece: " + education.getDegree());
        System.out.println("- Alan: " + education.getField());
        System.out.println("- Başlangıç: " + education.getStartDate());
        System.out.println("- Bitiş: " + education.getEndDate());

        return ResponseEntity.ok(educationRepository.save(education));
    }

    @GetMapping
    public List<Education> getAll() {
        return educationRepository.findAll();
    }
}
