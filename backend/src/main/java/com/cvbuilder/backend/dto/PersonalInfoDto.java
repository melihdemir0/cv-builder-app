package com.cvbuilder.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PersonalInfoDto {
    private String fullName;
    private String jobTitle;
    private String address;
    private String phone;
    private String email;
    private String birthDate;
    private MultipartFile photo;
}
