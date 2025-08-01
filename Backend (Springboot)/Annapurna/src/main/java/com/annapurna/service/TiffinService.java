package com.annapurna.service;

import com.annapurna.domain.Tiffin;
import com.annapurna.domain.User;
import com.annapurna.dto.TiffinDTO;
import com.annapurna.repository.TiffinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TiffinService {

    private final TiffinRepository tiffinRepository;

    // For DTO-based creation
    public Tiffin addTiffin(TiffinDTO dto, User vendor) {
        Tiffin tiffin = Tiffin.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .vendor(vendor)
                .build();
        return tiffinRepository.save(tiffin);
    }


    // Save any Tiffin object
    public void saveTiffin(Tiffin tiffin) {
        tiffinRepository.save(tiffin);
    }

    // Find by ID with error handling
    public Tiffin getById(Long id) {
        return tiffinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tiffin not found with ID: " + id));
    }

    // Get all for current vendor
    public List<Tiffin> getTiffinsByVendor(User vendor) {
        return tiffinRepository.findByVendor(vendor);
    }

    // Get all for customers
    public List<Tiffin> getAllTiffins() {
        return tiffinRepository.findAll();
    }

    // Delete by ID
    public void deleteTiffin(Long id) {
        tiffinRepository.deleteById(id);
    }
    
    public Tiffin getTiffinById(Long id) {
        return tiffinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tiffin not found with ID: " + id));
    }
}
