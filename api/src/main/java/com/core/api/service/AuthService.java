package com.core.api.service;

import com.core.api.client.BackendClient;
import com.core.api.data.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final BackendClient backendClient;

    public TokenDto requestTokenFromServer(String token) {
        log.info("Requesting token from server" + token);
        return backendClient.getGithubToken(token);
    }

}
