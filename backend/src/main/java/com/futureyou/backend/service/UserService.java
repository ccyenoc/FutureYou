package com.futureyou.backend.service;

import org.springframework.stereotype.Service;

import com.futureyou.backend.dto.UpdateProfileRequest;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService( UserRepository userRepository ) {
        this.userRepository = userRepository;
    }

    public User updateProfile( Long userId, UpdateProfileRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(
                    () -> new RuntimeException("User not found")
                );

        user.setUsername( request.getUsername() );

        user.setEmail( request.getEmail() );

        if ( request.getPassword() != null && !request.getPassword().isBlank() ) {
            user.setPassword( request.getPassword());
        }

        if ( request.getProfilePictureUrl() != null && !request.getProfilePictureUrl().isBlank() ) {
            user.setProfilePictureUrl( request.getProfilePictureUrl() );
        }

        return userRepository.save(user);
    }

    public User getUserById( Long userId ) {
        return userRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );
    }

}