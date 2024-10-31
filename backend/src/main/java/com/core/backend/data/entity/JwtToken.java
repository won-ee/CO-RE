package com.core.backend.data.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("jwtToken")
public class JwtToken {

    private String refreshToken;

    @Id
    private String userId;


    public JwtToken(String refreshToken, String userId) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
