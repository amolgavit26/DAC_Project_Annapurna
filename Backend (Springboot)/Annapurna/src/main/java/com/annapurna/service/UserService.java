package com.annapurna.service;

import com.annapurna.domain.*;
import com.annapurna.dto.UserDTO;
import com.annapurna.dto.AddressDTO;
import com.annapurna.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TiffinRepository tiffinRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;

    /**
     * Register a new user along with their address.
     */
    @Transactional
    public User registerUser(UserDTO dto) {
        User user = User.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .mobileNumber(dto.getMobileNumber()) 
                .build();

        User savedUser = userRepository.save(user);

        // Handle embedded address
        if (dto.getAddress() != null) {
            AddressDTO addressDTO = dto.getAddress();
            Address address = Address.builder()
                    .street(addressDTO.getStreet())
                    .city(addressDTO.getCity())
                    .state(addressDTO.getState())
                    .pinCode(addressDTO.getPinCode())
                    .country(addressDTO.getCountry())
                    .user(savedUser)
                    .build();
            addressRepository.save(address);
        }

        return savedUser;
    }


    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Delete a vendor and all their tiffins, orders, and address.
     */
    @Transactional
    public void deleteVendorById(Long vendorId) {
        User vendor = userRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + vendorId));

        if (vendor.getRole() != Role.VENDOR) {
            throw new RuntimeException("User is not a vendor.");
        }

        // Delete all orders related to the vendor's tiffins
        List<Tiffin> tiffins = tiffinRepository.findByVendor(vendor);
        for (Tiffin t : tiffins) {
            orderRepository.deleteByTiffin(t);
        }

        // Delete tiffins
        tiffinRepository.deleteAll(tiffins);

        // Delete address
        addressRepository.deleteByUser(vendor);

        // Delete vendor
        userRepository.delete(vendor);
    }
}
