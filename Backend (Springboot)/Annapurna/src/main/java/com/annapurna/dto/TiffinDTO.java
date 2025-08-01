package com.annapurna.dto;

import lombok.Data;

@Data
public class TiffinDTO {
	private Long id;
	private String name;
	private String description;
	private double price;
	private String vendorName;
	private String category;
	private String imageUrl;

}
