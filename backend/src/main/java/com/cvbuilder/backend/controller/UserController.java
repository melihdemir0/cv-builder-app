package com.cvbuilder.backend.controller;

import com.cvbuilder.backend.model.User;
import com.cvbuilder.backend.repository.UserRepository;
import com.cvbuilder.backend.security.JwtTokenUtil;
import com.cvbuilder.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserController(UserService userService, JwtTokenUtil jwtTokenUtil, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.createUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        String username = user.getUsername();
        Optional<User> existingUser = userService.getUserByUsername(username);

        if (existingUser.isPresent()) {
            String token = jwtTokenUtil.generateToken(existingUser.get().getUsername());
            return ResponseEntity.ok("Bearer " + token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // ✅ Kişisel bilgi + fotoğraf yükleme
    @PostMapping("/personal-info")
    public ResponseEntity<String> savePersonalInfo(
            @RequestParam("fullName") String fullName,
            @RequestParam("address") String address,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("birthDate") String birthDate,
            @RequestParam(value = "photo", required = false) MultipartFile photoFile
    ) {
        try {
            String filePath = null;

            if (photoFile != null && !photoFile.isEmpty()) {
                String uploadsDir = System.getProperty("user.dir") + "/uploads/";
                File dir = new File(uploadsDir);
                if (!dir.exists()) dir.mkdirs();

                filePath = uploadsDir + photoFile.getOriginalFilename();
                photoFile.transferTo(new File(filePath));
            }

            User user = new User();
            user.setUsername(fullName);
            user.setEmail(email);
            user.setPhone(phone);
            user.setPhotoPath(filePath);

            userRepository.save(user);

            return ResponseEntity.ok("Kişisel bilgiler başarıyla kaydedildi.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hata oluştu.");
        }
    }
}
