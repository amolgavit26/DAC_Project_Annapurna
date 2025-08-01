package com.annapurna.controller;

import com.annapurna.domain.Address;
import com.annapurna.domain.User;
import com.annapurna.dto.AddressDTO;
import com.annapurna.dto.AddressResponseDTO;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.AddressService;
import com.annapurna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    private User getCurrentUser(String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer "
        String email = jwtProvider.getEmailFromToken(token);
        return userService.getByEmail(email);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAddress(@RequestHeader("Authorization") String authHeader,
                                                @RequestBody AddressDTO addressDTO) {
        User user = getCurrentUser(authHeader);
        addressService.updateAddress(user, addressDTO);
        return ResponseEntity.ok("Address updated successfully.");
    }
    
    
 

    @GetMapping("/my")
    public ResponseEntity<?> getMyAddress(@RequestHeader("Authorization") String authHeader) {
        User user = getCurrentUser(authHeader);
        Address address = addressService.getAddressByUser(user);

        if (address == null) {
            AddressResponseDTO empty = new AddressResponseDTO("", "", "", "", "");
            return ResponseEntity.ok(empty);
        }


        AddressResponseDTO dto = new AddressResponseDTO(
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getPinCode(),
                address.getCountry()
        );

        return ResponseEntity.ok(dto);
    }




    
}
