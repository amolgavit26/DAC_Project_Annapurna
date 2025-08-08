package com.annapurna.controller;

import com.annapurna.domain.Role;
import com.annapurna.domain.Tiffin;
import com.annapurna.domain.User;
import com.annapurna.dto.TiffinDTO;
import com.annapurna.repository.TiffinRepository;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.TiffinService;
import com.annapurna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/tiffin")
@RequiredArgsConstructor
public class TiffinController {

    private final TiffinService tiffinService;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final TiffinRepository tiffinRepository;

    
    @GetMapping("/all")
    public ResponseEntity<List<TiffinDTO>> allTiffins(@RequestHeader("Authorization") String authHeader) {
        // Extract token (handles both "Bearer <token>" and raw token)
        String token = authHeader != null && authHeader.startsWith("Bearer ")
                ? authHeader.substring(7) : authHeader;
        String email = jwtProvider.getEmailFromToken(token);

        User customer = userService.getByEmail(email);
        if (customer == null) {
            throw new RuntimeException("Customer not found.");
        }
        if (customer.getRole() != Role.CUSTOMER) {
            throw new RuntimeException("Only customers can view tiffins.");
        }

        // Use pinCode field from Address entity
        String customerPincode = customer.getAddress() != null ? customer.getAddress().getPinCode() : null;

        List<Tiffin> tiffins;
        if (customerPincode == null || customerPincode.isBlank()) {
            // fallback — if customer has no pincode, return empty (safe default)
            tiffins = List.of();
        } else {
            // Use service method which uses repository query to fetch matching vendor tiffins
            tiffins = tiffinService.getTiffinsForCustomerByPinCode(customerPincode);
        }

        List<TiffinDTO> dtos = tiffins.stream().map(tiffin -> {
            TiffinDTO dto = new TiffinDTO();
            dto.setId(tiffin.getId());
            dto.setName(tiffin.getName());
            dto.setDescription(tiffin.getDescription());
            dto.setPrice(tiffin.getPrice());
            dto.setVendorName(tiffin.getVendor() != null ? tiffin.getVendor().getFullName() : null);
            dto.setCategory(tiffin.getCategory() != null ? tiffin.getCategory().name() : null);

            if (tiffin.getImage() != null) {
                String base64 = Base64.getEncoder().encodeToString(tiffin.getImage());
                dto.setImageUrl("data:image/jpeg;base64," + base64);
            } else {
                dto.setImageUrl(tiffin.getImageUrl()); // fallback to imageUrl if saved
            }
            return dto;
        }).toList();

        return ResponseEntity.ok(dtos);
    }

    
    
    @GetMapping("/all-tiffins")
    public ResponseEntity<List<TiffinDTO>> getAllTiffinsPublic() {
        List<Tiffin> tiffins = tiffinRepository.findAll();

        List<TiffinDTO> dtos = tiffins.stream().map(tiffin -> {
            TiffinDTO dto = new TiffinDTO();
            dto.setId(tiffin.getId());
            dto.setName(tiffin.getName());
            dto.setDescription(tiffin.getDescription());
            dto.setPrice(tiffin.getPrice());
            dto.setVendorName(tiffin.getVendor() != null ? tiffin.getVendor().getFullName() : null);
            dto.setCategory(tiffin.getCategory() != null ? tiffin.getCategory().name() : null);

            if (tiffin.getImage() != null) {
                String base64 = Base64.getEncoder().encodeToString(tiffin.getImage());
                dto.setImageUrl("data:image/jpeg;base64," + base64);
            } else {
                dto.setImageUrl(tiffin.getImageUrl());
            }

            return dto;
        }).toList();

        return ResponseEntity.ok(dtos);
    }

    
}
