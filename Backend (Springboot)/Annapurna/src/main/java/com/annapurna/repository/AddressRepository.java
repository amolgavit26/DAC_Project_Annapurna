package com.annapurna.repository;

import com.annapurna.domain.Address;
import com.annapurna.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUser(User user);
    void deleteByUser(User user);
}
