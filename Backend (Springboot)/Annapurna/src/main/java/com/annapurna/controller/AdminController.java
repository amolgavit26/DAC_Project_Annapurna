package com.annapurna.controller;

import com.annapurna.domain.Role;
import com.annapurna.domain.User;
import com.annapurna.dto.SimpleUserDTO;
import com.annapurna.repository.UserRepository;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	private final UserService userService;

	private User getCurrentUser(String authHeader) {
		String token = authHeader.substring(7);
		String email = jwtProvider.getEmailFromToken(token);
		return userService.getByEmail(email);
	}

	private void ensureAdmin(User user) {
		if (user.getRole() != Role.ADMIN) {
			throw new RuntimeException("Access denied: Admins only");
		}
	}

	@GetMapping("/customers")
	public ResponseEntity<List<SimpleUserDTO>> getAllCustomers(@RequestHeader("Authorization") String authHeader) {
		User admin = getCurrentUser(authHeader);
		ensureAdmin(admin);

		List<SimpleUserDTO> customers = userRepository.findAll().stream().filter(u -> u.getRole() == Role.CUSTOMER)
				.map(u -> {
					SimpleUserDTO dto = new SimpleUserDTO();
					dto.setId(u.getId());
					dto.setFullName(u.getFullName());
					dto.setEmail(u.getEmail());
					dto.setMobileNumber(u.getMobileNumber());
					return dto;
				}).collect(Collectors.toList());

		return ResponseEntity.ok(customers);
	}

	@GetMapping("/vendors")
	public ResponseEntity<List<SimpleUserDTO>> getAllVendors(@RequestHeader("Authorization") String authHeader) {
		User admin = getCurrentUser(authHeader);
		ensureAdmin(admin);

		List<SimpleUserDTO> vendors = userRepository.findAll().stream().filter(u -> u.getRole() == Role.VENDOR)
				.map(u -> {
					SimpleUserDTO dto = new SimpleUserDTO();
					dto.setId(u.getId());
					dto.setFullName(u.getFullName());
					dto.setEmail(u.getEmail());
					return dto;
				}).collect(Collectors.toList());

		return ResponseEntity.ok(vendors);
	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String authHeader) {
		User admin = getCurrentUser(authHeader);
		ensureAdmin(admin);
		userRepository.deleteById(userId);
		return ResponseEntity.ok("User deleted successfully.");
	}

	@DeleteMapping("/vendor/delete/{vendorId}")
	public ResponseEntity<String> deleteVendor(@PathVariable Long vendorId,
			@RequestHeader("Authorization") String authHeader) {
		User admin = getCurrentUser(authHeader);
		ensureAdmin(admin);
		userService.deleteVendorById(vendorId);
		return ResponseEntity.ok("Vendor and associated tiffins/orders deleted successfully.");
	}

}
