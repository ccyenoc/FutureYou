package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.futureyou.backend.dto.AuthResponse;
import com.futureyou.backend.dto.LoginRequest;
import com.futureyou.backend.dto.RegisterRequest;
import com.futureyou.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(  AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register( @RequestBody RegisterRequest request) {
        return authService.register(
            request
        );
    }

    @PostMapping("/login")
    public AuthResponse login( @RequestBody LoginRequest request ) {
        return authService.login(request);
    }
}