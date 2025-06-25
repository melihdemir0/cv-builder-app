package com.cvbuilder.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")  // Tablo adını "users" olarak değiştirdik
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
}
