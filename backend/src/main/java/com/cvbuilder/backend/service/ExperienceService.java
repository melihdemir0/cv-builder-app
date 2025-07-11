package com.cvbuilder.backend.service;

import com.cvbuilder.backend.model.Experience;
import com.cvbuilder.backend.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }
}
