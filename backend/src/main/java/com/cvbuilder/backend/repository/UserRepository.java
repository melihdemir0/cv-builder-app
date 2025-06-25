package com.cvbuilder.backend.repository;

import com.cvbuilder.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom sorgular eklenebilir
}
