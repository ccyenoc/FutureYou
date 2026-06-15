package com.futureyou.backend.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import com.futureyou.backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(JWTService.class);
    private final byte[] secretKeyBytes;

    public JWTService(@Value("${app.jwt.secret:}") String jwtSecret) {
        if (jwtSecret == null || jwtSecret.trim().isEmpty()
                || jwtSecret.equals("your-secret-key-your-secret-key-your-secret-key")) {
            logger.warn("Generating ephemeral secret. Instance-isolated!");
            byte[] keyBytes = new byte[32];
            new java.security.SecureRandom().nextBytes(keyBytes);
            this.secretKeyBytes = keyBytes;
        } else {
            this.secretKeyBytes = jwtSecret.getBytes();
        }
    }

    public String generateToken(User user) {

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("username", user.getUsername())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000))
                .signWith(
                        Keys.hmacShaKeyFor(
                                secretKeyBytes))
                .compact();
    }

    public Long extractUserId(String token) {

        Claims claims = Jwts.parser().verifyWith(
                Keys.hmacShaKeyFor(secretKeyBytes))
                .build()
                .parseSignedClaims(token)
                .getPayload();

        Object userIdVal = claims.get("userId");
        if (userIdVal instanceof Number) {
            return ((Number) userIdVal).longValue();
        }
        return null;
    }
}