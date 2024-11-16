package com.core.api.service;

import com.core.api.client.BackendClient;
import com.core.api.data.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final BackendClient backendClient;

    public TokenDto requestTokenFromServer(String token) {
        return backendClient.getGithubToken(token);
    }

}
