package com.cvbuilder.backend.repository;

import com.cvbuilder.backend.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}
