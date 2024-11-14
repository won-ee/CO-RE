package com.core.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${spring.security.oauth2.client.registration.jira.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.jira.client-secret}")
    private String clientSecret;

    public String createJwtToken() {
        Instant now = Instant.now();
        long expirationTime = 3600; // 1시간 유효

        // clientSecret이 32바이트 미만이면 패딩 추가
        String paddedSecret = clientSecret.length() < 32
                ? String.format("%-32s", clientSecret).replace(' ', '*')
                : clientSecret;

        SecretKey key = Keys.hmacShaKeyFor(paddedSecret.getBytes());

        return Jwts.builder()
                .setIssuer(clientId) // OAuth 클라이언트 ID
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(expirationTime)))
                .signWith(key, SignatureAlgorithm.HS256) // OAuth 클라이언트 Secret
                .compact();
    }
}

