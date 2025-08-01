package com.annapurna.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private String street;
    private String city;
    private String state;
    private String pinCode;
    private String country;
}
