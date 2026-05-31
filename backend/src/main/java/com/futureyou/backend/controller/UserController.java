package com.futureyou.backend.controller;

import com.futureyou.backend.dto.UpdateProfileRequest;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController( UserService userService ) {
        this.userService = userService;
    }

    @PutMapping("/{id}")
    public User updateProfile( @PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        return userService.updateProfile(
            id,
            request
        );
    }
}