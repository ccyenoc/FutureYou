package com.futureyou.backend.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.futureyou.backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Service
public class JWTService {

    private final String SECRET =
            "your-secret-key-your-secret-key-your-secret-key";

    public String generateToken(User user) {

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("username", user.getUsername())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )
                .signWith(
                        Keys.hmacShaKeyFor(
                                SECRET.getBytes()
                        )
                )
                .compact();
    }

    public Long extractUserId(String token) {

    Claims claims = Jwts.parser().verifyWith(
        Keys.hmacShaKeyFor( SECRET.getBytes()))
        .build()
        .parseSignedClaims(token)
        .getPayload();

    return claims.get(
            "userId",
            Long.class
    );
}
}