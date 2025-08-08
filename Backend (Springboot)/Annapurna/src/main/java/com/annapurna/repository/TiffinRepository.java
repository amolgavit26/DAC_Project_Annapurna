package com.annapurna.repository;

import com.annapurna.domain.Tiffin;
import com.annapurna.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TiffinRepository extends JpaRepository<Tiffin, Long> {

    List<Tiffin> findByVendor(User vendor);

    // Fetch tiffins where the vendor's address pinCode matches the provided pinCode
    @Query("SELECT t FROM Tiffin t WHERE t.vendor.address.pinCode = :pinCode")
    List<Tiffin> findByVendorAddressPinCode(@Param("pinCode") String pinCode);
}
