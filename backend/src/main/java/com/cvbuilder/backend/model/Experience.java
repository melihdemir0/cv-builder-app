package com.cvbuilder.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String position;
    private String startDate;
    private String endDate;
    private String description;
}
