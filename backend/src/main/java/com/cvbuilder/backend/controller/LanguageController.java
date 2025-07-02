package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.Language;
import com.cvbuilder.backend.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin
public class LanguageController {

    private final LanguageRepository languageRepository;

    @Autowired
    public LanguageController(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    @PostMapping("/languages")
    public List<Language> saveLanguages(@RequestBody List<Language> languages) {
        return languageRepository.saveAll(languages);
    }

    @GetMapping("/languages")
    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }
}
