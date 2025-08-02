package com.annapurna.controller;

import com.annapurna.domain.Order;
import com.annapurna.domain.User;
import com.annapurna.dto.OrderDTO;
import com.annapurna.dto.OrderResponseDTO;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.OrderService;
import com.annapurna.service.RazorpayService;
import com.annapurna.service.UserService;
import com.annapurna.util.RazorpaySignatureUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final RazorpayService razorpayService;
    @Value("${razorpay.key_secret}")
    private String razorpaySecret;

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
            order.getPaymentStatus(),           // ✅ fixed here
            order.getOrderTime(),
            order.getRazorpayOrderId()
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
            order.getPaymentStatus(),           // ✅ fixed here
            order.getOrderTime(),
            order.getRazorpayOrderId()
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

    @PostMapping("/{orderId}/pay")
    public ResponseEntity<?> initiatePayment(@PathVariable Long orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            String receipt = "order_rcptid_" + orderId;

            com.razorpay.Order razorpayOrder = razorpayService.createOrder(
            		(int) (order.getTotalPrice() * 100),
                "INR",
                receipt
            );

            order.setRazorpayOrderId(razorpayOrder.get("id"));
            order.setRazorpayReceipt(receipt);
            order.setRazorpayStatus(razorpayOrder.get("status"));

            orderService.save(order);

            return ResponseEntity.ok(razorpayOrder.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Payment initiation failed: " + e.getMessage());
        }
    }
    
    
    @PostMapping("/{orderId}/verify")
    public ResponseEntity<?> verifyPayment(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> payload) {

        String razorpayOrderId = payload.get("razorpay_order_id");
        String razorpayPaymentId = payload.get("razorpay_payment_id");
        String razorpaySignature = payload.get("razorpay_signature");

        try {
            boolean isVerified = RazorpaySignatureUtil.verifySignature(
                razorpayOrderId, razorpayPaymentId, razorpaySignature, razorpaySecret
            );

            if (isVerified) {
                orderService.markAsPaid(orderId, razorpayOrderId, razorpayPaymentId);
                return ResponseEntity.ok("Payment Verified");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification error: " + e.getMessage());
        }
    }


}
