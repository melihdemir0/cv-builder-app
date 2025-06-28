package com.cvbuilder.backend.repository;

import com.cvbuilder.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);  // Kullanıcıyı username ile arıyoruz
}
