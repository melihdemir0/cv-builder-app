package com.cvbuilder.backend.service;

import com.cvbuilder.backend.model.Language;
import com.cvbuilder.backend.repository.LanguageRepository;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;

    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public Language save(Language language) {
        return languageRepository.save(language);
    }
}
