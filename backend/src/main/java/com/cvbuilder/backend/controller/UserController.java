package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.User;
import com.cvbuilder.backend.repository.UserRepository;
import com.cvbuilder.backend.security.JwtTokenUtil;
import com.cvbuilder.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")  // API URL'inin başı
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    // Constructor Enjeksiyonu ile servislere bağımlılığı ekliyoruz
    @Autowired
    public UserController(UserService userService, JwtTokenUtil jwtTokenUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")  // ID ile kullanıcı getiren GET isteği
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping  // Yeni kullanıcı ekleyen POST isteği
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")  // Kullanıcı silen DELETE isteği
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Register - Kullanıcı kaydı
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Şifreyi güvenli bir şekilde şifrele
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Kullanıcıyı oluştur
        userService.createUser(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // Login - Kullanıcı giriş işlemi
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        String username = user.getUsername();

        // UserService'den username ile kullanıcıyı arıyoruz
        Optional<User> existingUser = userService.getUserByUsername(username);  // getUserByUsername() metodu kullanıcıyı username ile arar

        if (existingUser.isPresent()) {
            String token = jwtTokenUtil.generateToken(existingUser.get().getUsername());  // Kullanıcıyı doğrulayıp token oluşturuyoruz
            return ResponseEntity.ok("Bearer " + token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
