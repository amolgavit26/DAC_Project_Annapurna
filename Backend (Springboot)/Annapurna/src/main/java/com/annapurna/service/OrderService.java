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


import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import java.io.ByteArrayOutputStream;

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
	

	@Transactional
	public void cancelOrder(Long orderId, User user) {
	    Order order = orderRepository.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    if (!order.getCustomer().getId().equals(user.getId())) {
	        throw new RuntimeException("You are not authorized to cancel this order.");
	    }

	    LocalDateTime now = LocalDateTime.now();
	    if (order.getOrderTime().plusMinutes(5).isBefore(now)) {
	        throw new RuntimeException("Order can only be cancelled within 5 minutes of placing.");
	    }

	    order.setStatus(OrderStatus.CANCELLED);
	    orderRepository.save(order);
	}
	
	
	
	

	public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }
	
	public Order save(Order order) {
	    return orderRepository.save(order);
	}

	
	public void markAsPaid(Long orderId, String razorpayOrderId, String razorpayPaymentId) {
	    Order order = getOrderById(orderId);
	    order.setPaymentStatus(PaymentStatus.PAID);
	    order.setRazorpayOrderId(razorpayOrderId);
	    order.setRazorpayPaymentId(razorpayPaymentId);
	    orderRepository.save(order);
	}



	
	
	
	
	
	
	
	
	
	
	public byte[] generateReceiptPdf(Order order) throws Exception {
	    Document document = new Document();
	    ByteArrayOutputStream out = new ByteArrayOutputStream();

	    PdfWriter.getInstance(document, out);
	    document.open();

	    Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD);
	    Font normalFont = new Font(Font.HELVETICA, 12);

	    document.add(new Paragraph("Annapurna Tiffins - Order Receipt", titleFont));
	    document.add(new Paragraph(" "));
	    document.add(new Paragraph("Order ID: " + order.getId(), normalFont));
	    document.add(new Paragraph("Customer: " + order.getCustomer().getFullName(), normalFont));
	    document.add(new Paragraph("Tiffin: " + order.getTiffin().getName(), normalFont));
	    document.add(new Paragraph("Quantity: " + order.getQuantity(), normalFont));
	    document.add(new Paragraph("Total Price: ₹" + order.getTotalPrice(), normalFont));
	    document.add(new Paragraph("Order Time: " + order.getOrderTime(), normalFont));
	    document.add(new Paragraph("Payment Status: " + order.getPaymentStatus(), normalFont));
	    document.add(new Paragraph("Razorpay Order ID: " + order.getRazorpayOrderId(), normalFont));

	    document.close();
	    return out.toByteArray();
	}
	
	
	
	
	
	
	
	
	

}
