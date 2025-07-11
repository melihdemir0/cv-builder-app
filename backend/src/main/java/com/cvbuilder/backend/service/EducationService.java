package com.cvbuilder.backend.service;

import com.cvbuilder.backend.model.Education;
import com.cvbuilder.backend.repository.EducationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }
}
