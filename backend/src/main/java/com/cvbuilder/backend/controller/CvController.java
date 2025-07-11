package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.dto.AiIntroRequestDto;
import com.cvbuilder.backend.dto.EducationDto;
import com.cvbuilder.backend.dto.ExperienceDto;
import com.cvbuilder.backend.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/cv")
public class CvController {
    private final AiService aiService;

    // Constructor Injection
    public CvController(AiService aiService) {
        this.aiService = aiService;
    }

    public static class IntroResponse {
        public String intro;
        public IntroResponse(String intro) { this.intro = intro; }
    }

    @PostMapping("/generate-ai-intro")
    public ResponseEntity<IntroResponse> generateIntro(@RequestBody AiIntroRequestDto dto) {
        String intro = aiService.generateIntro(dto);
        return ResponseEntity.ok(new IntroResponse(intro));
    }

    @PostMapping("/personal-info")
    public ResponseEntity<?> savePersonalInfo(
            @RequestParam("fullName") String fullName,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("address") String address,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("birthDate") String birthDate,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        // TODO: save logic
        return ResponseEntity.ok("Personal info saved");
    }

    @PostMapping("/education")
    public ResponseEntity<?> saveEducation(@RequestBody List<EducationDto> educationList) {
        // TODO: save logic
        return ResponseEntity.ok("Education saved");
    }

    @PostMapping("/experience")
    public ResponseEntity<?> saveExperience(@RequestBody List<ExperienceDto> experienceList) {
        // TODO: save logic
        return ResponseEntity.ok("Experience saved");
    }

    @PostMapping("/summary")
    public ResponseEntity<?> saveSummary(@RequestParam("summaryText") String summaryText) {
        // TODO: save logic
        return ResponseEntity.ok("Summary saved");
    }
}
