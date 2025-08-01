package com.annapurna.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders") // 'order' is a reserved keyword in SQL
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int quantity;
	private double totalPrice;	
	private LocalDateTime orderTime;

	@ManyToOne
	private User customer;

	@ManyToOne
	private Tiffin tiffin;

	@Enumerated(EnumType.STRING)
	@Column(length = 20) 
	private OrderStatus status = OrderStatus.PENDING;

}
