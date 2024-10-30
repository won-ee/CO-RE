package com.core.backend.data.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("oauthToken")
public class OAuthToken {
    @Id
    private String id;

    private String accessToken;

    private String refreshToken;

    public OAuthToken(String id, String accessToken, String refreshToken) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
