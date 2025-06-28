package com.cvbuilder.backend.service;

import com.cvbuilder.backend.model.User;
import com.cvbuilder.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public User createUser(User user) {

        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);  // Kullanıcı adını repository ile arıyoruz
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);  // ID ile kullanıcıyı getirir
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);  // ID ile kullanıcıyı siler
    }
}
