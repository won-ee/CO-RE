package com.core.backend.data.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("jwtToken")
public class JwtToken {
    @Id
    private String id;

    private String accessToken;

    private String refreshToken;

    public JwtToken(String id, String accessToken, String refreshToken) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
