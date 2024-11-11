package com.core.backend.data.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("jiraOAuthToken")
public class JiraOAuthToken {
    @Id
    private String id;  //id = email

    private String accessToken;

    private String refreshToken;

    public JiraOAuthToken(String id, String accessToken, String refreshToken) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
