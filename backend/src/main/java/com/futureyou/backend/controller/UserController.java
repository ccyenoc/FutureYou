package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;

import com.futureyou.backend.dto.UpdateProfileRequest;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/{id}")
    public User updateProfile(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        Long authenticatedUserId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!id.equals(authenticatedUserId)) {
            throw new RuntimeException("Unauthorized: You cannot update another user's profile.");
        }
        return userService.updateProfile(id, request);
    }
}