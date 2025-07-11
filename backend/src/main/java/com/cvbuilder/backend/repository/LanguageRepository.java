package com.cvbuilder.backend.repository;

import com.cvbuilder.backend.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Long> {
}
