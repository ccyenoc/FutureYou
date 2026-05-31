package com.futureyou.backend.service;

import org.springframework.stereotype.Service;

import com.futureyou.backend.dto.AuthResponse;
import com.futureyou.backend.dto.LoginRequest;
import com.futureyou.backend.dto.RegisterRequest;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService( UserRepository userRepository ) {
        this.userRepository = userRepository;
    }

    public AuthResponse register( RegisterRequest request ) {

        if ( userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                "Email already exists"
            );
        }

        if ( userRepository.existsByUsername( request.getUsername())) {
            throw new RuntimeException(
                "Username already exists"
            );
        }

        User user = new User();

        user.setUsername( request.getUsername() );

        user.setEmail( request.getEmail() );

        user.setPassword( request.getPassword() );

        User savedUser = userRepository.save( user );

        return new AuthResponse(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getProfilePictureUrl(),
            "Registration successful"
        );
    }

    public AuthResponse login( LoginRequest request ) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(
                    () ->
                        new RuntimeException(
                            "User not found"
                        )
                );

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException(
                "Invalid password"
            );
        }

        return new AuthResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getProfilePictureUrl(),
            "Login successful"
        );
    }
}