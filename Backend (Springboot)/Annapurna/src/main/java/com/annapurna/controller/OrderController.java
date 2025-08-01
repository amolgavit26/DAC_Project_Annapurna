package com.annapurna.controller;

import com.annapurna.domain.Order;
import com.annapurna.domain.User;
import com.annapurna.dto.OrderDTO;
import com.annapurna.dto.OrderResponseDTO;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.OrderService;
import com.annapurna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    private User getCurrentUser(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtProvider.getEmailFromToken(token);
        return userService.getByEmail(email);
    }

    @PostMapping("/place")
    public ResponseEntity<OrderResponseDTO> placeOrder(@RequestBody OrderDTO dto,
                                                       @RequestHeader("Authorization") String authHeader) {
        User customer = getCurrentUser(authHeader);
        Order order = orderService.placeOrder(dto, customer);

        OrderResponseDTO response = new OrderResponseDTO(
                order.getId(),
                order.getTiffin().getId(),
                order.getTiffin().getName(),
                order.getQuantity(),
                order.getTotalPrice(),
                order.getStatus(),
                order.getOrderTime()
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping("/my")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(@RequestHeader("Authorization") String authHeader) {
        User customer = getCurrentUser(authHeader);
        List<Order> orders = orderService.getMyOrders(customer);

        List<OrderResponseDTO> response = orders.stream().map(order -> new OrderResponseDTO(
                order.getId(),
                order.getTiffin().getId(),
                order.getTiffin().getName(),
                order.getQuantity(),
                order.getTotalPrice(),
                order.getStatus(),
                order.getOrderTime()
        )).toList();

        return ResponseEntity.ok(response);
    }

    
    
    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId,
                                              @RequestHeader("Authorization") String authHeader) {
        User user = getCurrentUser(authHeader);
        orderService.cancelOrder(orderId, user);
        return ResponseEntity.ok("Order cancelled");
    }


}
