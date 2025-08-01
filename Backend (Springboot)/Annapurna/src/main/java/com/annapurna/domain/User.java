package com.annapurna.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String password;
    
    @Column(length = 15)
    private String mobileNumber;


    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tiffin> tiffins = new ArrayList<>();
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Address address;

}
