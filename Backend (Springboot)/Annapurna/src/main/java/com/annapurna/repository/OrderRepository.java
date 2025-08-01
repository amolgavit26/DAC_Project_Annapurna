package com.annapurna.repository;

import com.annapurna.domain.Order;
import com.annapurna.domain.Tiffin;
import com.annapurna.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(User customer);
    void deleteByTiffin(Tiffin tiffin);
    List<Order> findByTiffin_Vendor(User vendor);

}
