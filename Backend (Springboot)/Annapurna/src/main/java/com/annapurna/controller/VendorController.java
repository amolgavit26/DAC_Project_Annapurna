package com.annapurna.controller;

import com.annapurna.domain.*;
import com.annapurna.dto.OrderDTO;
import com.annapurna.dto.StatusUpdateDTO;
import com.annapurna.dto.TiffinDTO;
import com.annapurna.repository.OrderRepository;
import com.annapurna.repository.TiffinRepository;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.EmailService;
import com.annapurna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.Base64;

@RestController
@RequestMapping("/api/vendor")
@RequiredArgsConstructor
public class VendorController {

    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final TiffinRepository tiffinRepository;
    private final OrderRepository orderRepository;
    private final EmailService emailService;

    private User getCurrentVendor(String authHeader) {
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        String email = jwtProvider.getEmailFromToken(token);
        System.out.println("🔐 Extracted email from token: " + email);

        User user = userService.getByEmail(email);
        System.out.println("🧑 Resolved user ID: " + user.getId() + ", role: " + user.getRole());

        if (user.getRole() != Role.VENDOR) {
            throw new RuntimeException("Only vendors can access this endpoint.");
        }

        return user;
    }

    @PostMapping(value = "/tiffins", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addTiffin(@RequestParam("name") String name,
                                            @RequestParam("description") String description,
                                            @RequestParam("price") double price,
                                            @RequestParam("category") TiffinCategory category,
                                            @RequestParam(value = "image", required = false) MultipartFile image,
                                            @RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);

        Tiffin tiffin = new Tiffin();
        tiffin.setName(name);
        tiffin.setDescription(description);
        tiffin.setPrice(price);
        tiffin.setCategory(category);
        tiffin.setVendor(vendor);

        // ✅ Save image if provided
        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageBytes = image.getBytes();
                tiffin.setImage(imageBytes);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Failed to read image file.");
            }
        }

        tiffinRepository.save(tiffin);
        return ResponseEntity.ok("Tiffin added successfully.");
    }


    @PostMapping("/tiffins/{id}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id,
                                              @RequestParam("image") MultipartFile file,
                                              @RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);
        Tiffin tiffin = tiffinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tiffin not found"));

        if (!tiffin.getVendor().getId().equals(vendor.getId())) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/tiffins");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "http://localhost:8080/uploads/tiffins/" + fileName;
            tiffin.setImageUrl(imageUrl);
            tiffinRepository.save(tiffin);

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }

    @GetMapping("/tiffins")
    public ResponseEntity<List<TiffinDTO>> getMyTiffins(@RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);
        List<Tiffin> tiffins = tiffinRepository.findByVendor(vendor);

        List<TiffinDTO> dtoList = tiffins.stream().map(t -> {
            TiffinDTO dto = new TiffinDTO();
            dto.setId(t.getId());
            dto.setName(t.getName());
            dto.setDescription(t.getDescription());
            dto.setPrice(t.getPrice());
            dto.setVendorName(t.getVendor().getFullName());
            dto.setCategory(t.getCategory().name());
            
            if (t.getImage() != null) {
                String base64 = Base64.getEncoder().encodeToString(t.getImage());
                dto.setImageUrl("data:image/jpeg;base64," + base64);
            } else {
                dto.setImageUrl(null);
            }
            return dto;
        }).toList();

        return ResponseEntity.ok(dtoList);
    }

    @PutMapping(value = "/tiffins/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateMyTiffin(@PathVariable Long id,
                                            @RequestParam("name") String name,
                                            @RequestParam("description") String description,
                                            @RequestParam("price") double price,
                                            @RequestParam("category") TiffinCategory category,
                                            @RequestParam(value = "image", required = false) MultipartFile image,
                                            @RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);
        Tiffin existing = tiffinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tiffin not found"));

        if (!existing.getVendor().getId().equals(vendor.getId())) {
            return ResponseEntity.status(403).body("You can only update your own tiffins.");
        }

        existing.setName(name);
        existing.setDescription(description);
        existing.setPrice(price);
        existing.setCategory(category);

        // Optional: update image if provided
        if (image != null && !image.isEmpty()) {
            try {
                existing.setImage(image.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Failed to read image.");
            }
        }

        tiffinRepository.save(existing);
        return ResponseEntity.ok("Tiffin updated successfully.");
    }



    @DeleteMapping("/tiffins/{id}")
    public ResponseEntity<String> deleteTiffin(@PathVariable Long id,
                                               @RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);
        Tiffin tiffin = tiffinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tiffin not found"));

        if (!tiffin.getVendor().getId().equals(vendor.getId())) {
            return ResponseEntity.status(403).body("You can only delete your own tiffins.");
        }

        tiffinRepository.delete(tiffin);
        return ResponseEntity.ok("Tiffin deleted successfully.");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getVendorOrders(@RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);
        List<Tiffin> vendorTiffins = tiffinRepository.findByVendor(vendor);

        List<OrderDTO> orders = vendorTiffins.stream()
                .flatMap(tiffin -> tiffin.getOrders().stream().map(order -> {
                    OrderDTO dto = new OrderDTO();
                    dto.setOrderId(order.getId());
                    dto.setTiffinId(tiffin.getId());
                    dto.setTiffinName(tiffin.getName());
                    dto.setQuantity(order.getQuantity());
                    dto.setTotalPrice(order.getTotalPrice());
                    dto.setStatus(order.getStatus().toString());
                    dto.setCustomerName(order.getCustomer().getFullName());
                    dto.setCustomerEmail(order.getCustomer().getEmail());
                    dto.setCustomerMobileNumber(order.getCustomer().getMobileNumber());
                    return dto;
                }))
                .toList();

        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/orders/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId,
                                                    @RequestBody StatusUpdateDTO dto,
                                                    @RequestHeader("Authorization") String authHeader) {
        User vendor = getCurrentVendor(authHeader);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getTiffin().getVendor().getId().equals(vendor.getId())) {
            return ResponseEntity.status(403).body("Unauthorized to update this order.");
        }

        order.setStatus(OrderStatus.valueOf(dto.getStatus().toUpperCase()));
        orderRepository.save(order);

        emailService.sendStatusUpdateEmail(
                order.getCustomer().getEmail(),
                order.getCustomer().getFullName(),
                order.getTiffin().getName(),
                order.getStatus().name()
        );

        return ResponseEntity.ok("Order status updated and email sent.");
    }
}