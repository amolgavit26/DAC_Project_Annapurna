package com.annapurna.dto;

import lombok.Data;

@Data
public class SimpleUserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String mobileNumber;
}
