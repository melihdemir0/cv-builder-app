package com.cvbuilder.backend.repository;

import com.cvbuilder.backend.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Long> {
}