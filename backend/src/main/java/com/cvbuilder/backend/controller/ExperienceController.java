package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.Experience;
import com.cvbuilder.backend.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv/experience")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<Experience> getAll() {
        return experienceService.getAllExperiences();
    }
}
