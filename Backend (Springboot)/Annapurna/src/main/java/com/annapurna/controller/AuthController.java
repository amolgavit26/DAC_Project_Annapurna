package com.annapurna.controller;

import com.annapurna.dto.LoginDTO;
import com.annapurna.dto.UserDTO;
import com.annapurna.domain.User;
import com.annapurna.security.JwtProvider;
import com.annapurna.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO dto) {
        User user = userService.registerUser(dto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        User user = userService.getUserByEmail(dto.getEmail());
        String token = jwtProvider.generateToken(user.getEmail(), user.getRole().toString());

        return ResponseEntity.ok(
                Map.of(
                        "token", "Bearer " + token,
                        "userId", user.getId(),
                        "email", user.getEmail(),
                        "fullName", user.getFullName(),
                        "role", user.getRole().toString()
                )
        );
    }



}
