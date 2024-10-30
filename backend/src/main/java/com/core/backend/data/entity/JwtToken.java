package com.core.backend.data.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("jwtToken")
public class JwtToken {

    @Id
    private String refreshToken;

    private String userId;


    public JwtToken(String refreshToken, String userId) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
