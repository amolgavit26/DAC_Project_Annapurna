package com.annapurna.dto;

import com.annapurna.domain.Role;
import lombok.Data;

@Data
public class UserDTO {
    private String fullName;
    private String email;
    private String password;
    private Role role;
    private AddressDTO address;
    private String mobileNumber;
}
