package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.Education;
import com.cvbuilder.backend.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public List<Education> getAll() {
        return educationService.getAllEducations();
    }
}
