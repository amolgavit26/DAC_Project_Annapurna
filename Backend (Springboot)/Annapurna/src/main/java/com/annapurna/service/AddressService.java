package com.annapurna.service;

import com.annapurna.domain.Address;
import com.annapurna.domain.User;
import com.annapurna.dto.AddressDTO;
import com.annapurna.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public void updateAddress(User user, AddressDTO addressDTO) {
        Address address = addressRepository.findByUser(user)
                .orElse(Address.builder().user(user).build());

        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setPinCode(addressDTO.getPinCode());
        address.setCountry(addressDTO.getCountry());

        addressRepository.save(address);
    }

    public Address getAddressByUser(User user) {
        return addressRepository.findByUser(user).orElse(null);
    }

}
