package com.annapurna.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tiffin {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String description;
	private double price;
	
	@Lob
	@Column(name = "image", columnDefinition = "LONGBLOB")
	private byte[] image;

	private String imageUrl;

	@ManyToOne
	@JoinColumn(name = "vendor_id")
	private User vendor; // Vendor is also a user with role=VENDOR

	@OneToMany(mappedBy = "tiffin", cascade = CascadeType.ALL)
	private List<Order> orders;

	@Enumerated(EnumType.STRING)
	private TiffinCategory category;

}
