package com.annapurna.controller;

import com.annapurna.domain.Tiffin;
import com.annapurna.dto.TiffinDTO;
import com.annapurna.service.TiffinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Base64;

@RestController
@RequestMapping("/api/tiffin")
@RequiredArgsConstructor
public class TiffinController {

    private final TiffinService tiffinService;

    @GetMapping("/all")
    public ResponseEntity<List<TiffinDTO>> allTiffins() {
        List<Tiffin> tiffins = tiffinService.getAllTiffins();
        List<TiffinDTO> dtos = tiffins.stream().map(tiffin -> {
            TiffinDTO dto = new TiffinDTO();
            dto.setId(tiffin.getId());
            dto.setName(tiffin.getName());
            dto.setDescription(tiffin.getDescription());
            dto.setPrice(tiffin.getPrice());
            dto.setVendorName(tiffin.getVendor().getFullName());
            dto.setCategory(tiffin.getCategory().name());

            if (tiffin.getImage() != null) {
                String base64 = Base64.getEncoder().encodeToString(tiffin.getImage());
                dto.setImageUrl("data:image/jpeg;base64," + base64);
            } else {
                dto.setImageUrl(null);
            }
            
            return dto;
        }).toList();
        return ResponseEntity.ok(dtos);
    }
}
