package com.annapurna.service;

import com.annapurna.domain.*;
import com.annapurna.dto.OrderDTO;
import com.annapurna.repository.OrderRepository;
import com.annapurna.repository.TiffinRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

	private final OrderRepository orderRepository;
	private final TiffinRepository tiffinRepository;

	public Order placeOrder(OrderDTO dto, User customer) {
		Tiffin tiffin = tiffinRepository.findById(dto.getTiffinId())
				.orElseThrow(() -> new RuntimeException("Tiffin not found"));

		Order order = Order.builder().customer(customer).tiffin(tiffin).quantity(dto.getQuantity())
				.totalPrice(dto.getQuantity() * tiffin.getPrice()).orderTime(LocalDateTime.now())
				.status(OrderStatus.PENDING).build();

		return orderRepository.save(order);
	}

	public List<Order> getMyOrders(User customer) {
		return orderRepository.findByCustomer(customer);
	}
	
	
	// OrderService.java
	@Transactional
	public void cancelOrder(Long orderId, User user) {
	    Order order = orderRepository.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    // Only allow cancel by the customer who placed it
	    if (!order.getCustomer().getId().equals(user.getId())) {
	        throw new RuntimeException("You are not authorized to cancel this order.");
	    }

	    // Only allow cancellation within 5 minutes
	    LocalDateTime now = LocalDateTime.now();
	    if (order.getOrderTime().plusMinutes(5).isBefore(now)) {
	        throw new RuntimeException("Order can only be cancelled within 5 minutes of placing.");
	    }

	    // ✅ Mark order as CANCELLED instead of deleting
	    order.setStatus(OrderStatus.CANCELLED);
	    orderRepository.save(order);
	}


}
