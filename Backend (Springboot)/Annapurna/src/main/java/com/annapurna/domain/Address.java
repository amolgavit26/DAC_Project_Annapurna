package com.annapurna.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;
    private String city;
    private String state;
    private String pinCode;
    private String country;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}
