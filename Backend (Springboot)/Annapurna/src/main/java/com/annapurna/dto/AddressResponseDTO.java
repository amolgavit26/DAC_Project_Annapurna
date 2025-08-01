// AddressResponseDTO.java
package com.annapurna.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressResponseDTO {
    private String street;
    private String city;
    private String state;
    private String pinCode;
    private String country;
}
