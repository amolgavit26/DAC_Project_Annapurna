package com.annapurna.repository;

import com.annapurna.domain.Tiffin;
import com.annapurna.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TiffinRepository extends JpaRepository<Tiffin, Long> {
    List<Tiffin> findByVendor(User vendor);
}
