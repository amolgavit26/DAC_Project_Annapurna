package com.annapurna.dto;

import com.annapurna.domain.OrderStatus;
import com.annapurna.domain.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private Long tiffinId;
    private String tiffinName;
    private int quantity;
    private double totalPrice;
    private OrderStatus status;
    private PaymentStatus paymentStatus; // ✅ added
    private LocalDateTime orderTime;
    private String razorpayOrderId;      // ✅ optional but useful
}
