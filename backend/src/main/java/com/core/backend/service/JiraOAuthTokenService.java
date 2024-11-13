package com.core.backend.service;

import com.core.backend.data.entity.JiraOAuthToken;
import com.core.backend.data.repository.JiraOAuthTokenRepository;
import com.core.backend.exception.AuthenticationRequiredException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@Service
@EnableRedisRepositories
@Slf4j
public class JiraOAuthTokenService {

    @Value("${spring.security.oauth2.client.registration.jira.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.jira.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.provider.jira.token-uri}")
    private String tokenUrl;

    private final RestTemplate restTemplate;
    private final JiraOAuthTokenRepository jiraOAuthTokenRepository;


    public JiraOAuthTokenService(RestTemplate restTemplate, JiraOAuthTokenRepository jiraOAuthTokenRepository) {
        this.restTemplate = restTemplate;
        this.jiraOAuthTokenRepository = jiraOAuthTokenRepository;
    }

    public String getNewAccessToken(String email) {
        Optional<JiraOAuthToken> storedToken = jiraOAuthTokenRepository.findById(email);

        if (storedToken.isPresent()) {
            String refreshToken = storedToken.get().getRefreshToken();
            return refreshAccessToken(email, refreshToken);
        } else {
            throw new AuthenticationRequiredException();
        }

    }

    public String refreshAccessToken(String email, String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = Map.of(
                "grant_type", "refresh_token",
                "client_id", clientId,
                "client_secret", clientSecret,
                "refresh_token", refreshToken
        );

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    tokenUrl,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> body = response.getBody();

                if (body != null && body.containsKey("access_token")) {
                    String newAccessToken = body.get("access_token").toString();
                    String newRefreshToken = body.get("refresh_token").toString();

                    if (newRefreshToken != null) {
                        JiraOAuthToken newToken = new JiraOAuthToken(email, newAccessToken, newRefreshToken);
                        jiraOAuthTokenRepository.save(newToken);
                    }
                    return newAccessToken;
                } else {
                    throw new IllegalStateException("토큰 엔드포인트로부터 유효하지 않은 응답을 받았습니다.");
                }
            } else {
                throw new IllegalStateException("액세스 토큰 갱신 실패. HTTP 상태 코드: " + response.getStatusCode());
            }
        } catch (Exception e) {
            log.error("액세스 토큰 갱신 중 오류 발생: {}", e.getMessage());
            throw new IllegalStateException("액세스 토큰 갱신 중 오류 발생.", e);
        }
    }

    public JiraOAuthToken getOAuthToken(String id) {
        return jiraOAuthTokenRepository.findById(id).orElse(null);
    }

    public void saveOAuthToken(JiraOAuthToken targetToken) {
        try {
            jiraOAuthTokenRepository.save(targetToken);
        } catch (Exception ex) {
            log.error("OAuthToken Save Error : {}", ex.toString());
        }
    }

}
