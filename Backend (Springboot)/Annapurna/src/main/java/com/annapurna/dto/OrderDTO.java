package com.annapurna.dto;

import lombok.Data;

@Data
public class OrderDTO {
	private Long tiffinId; 
    private Long orderId;
    private String tiffinName;
    private int quantity;
    private double totalPrice;
    private String status;

    private String customerName;
    private String customerEmail;
    private String customerMobileNumber;
}
