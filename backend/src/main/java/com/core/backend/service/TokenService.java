package com.core.backend.service;

import com.core.backend.data.entity.JwtToken;
import com.core.backend.data.entity.OAuthToken;
import com.core.backend.data.repository.JwtTokenRepository;
import com.core.backend.data.repository.OAuthTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Service;

@Service
@EnableRedisRepositories
@Slf4j
public class TokenService {

    private final JwtTokenRepository jwtTokenRepository;
    private final OAuthTokenRepository oauthTokenRepository;


    public TokenService(JwtTokenRepository jwtTokenRepository, OAuthTokenRepository oauthTokenRepository) {
        this.jwtTokenRepository = jwtTokenRepository;
        this.oauthTokenRepository = oauthTokenRepository;
    }

    public JwtToken getJwtToken(String id) {
        return jwtTokenRepository.findById(id).orElse(null);
    }

    public OAuthToken getOAuthToken(String id) {
        return oauthTokenRepository.findById(id).orElse(null);
    }

    public void saveJwtToken(JwtToken targetToken) {
        try {
            jwtTokenRepository.save(targetToken);
        } catch (Exception ex) {
            log.error("JwtToken Save Error : {}", ex.toString());
        }
    }

    public void saveOAuthToken(OAuthToken targetToken) {
        try {
            oauthTokenRepository.save(targetToken);
        } catch (Exception ex) {
            log.error("OAuthToken Save Error : {}", ex.toString());
        }
    }


}
