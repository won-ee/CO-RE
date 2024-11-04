package com.core.backend.service;

import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class JiraService {

    private static final Logger log = LoggerFactory.getLogger(JiraService.class);
    private final WebClient webClient;

    @Value("${spring.security.oauth2.client.registration.jira.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.jira.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.jira.redirect-uri}")
    private String redirectUri;

    public JiraService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.atlassian.com").build();
    }

    public Mono<String> exchangeAuthorizationCode(String authorizationCode, HttpSession session) {
        String cachedAccessToken = (String) session.getAttribute("accessToken");

        if (cachedAccessToken != null) {
            log.info("AccessToken found in session: {}", cachedAccessToken);
            return Mono.just(cachedAccessToken); // 세션에 있으면 바로 반환
        }

        Map<String, String> requestBody = Map.of(
                "grant_type", "authorization_code",
                "client_id", clientId,
                "client_secret", clientSecret,
                "code", authorizationCode,
                "redirect_uri", redirectUri
        );

        return webClient.post()
                .uri("https://auth.atlassian.com/oauth/token")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(response -> {
                    String accessToken = (String) response.get("access_token");
                    log.info("Access Token: {}", accessToken);
                    session.setAttribute("accessToken", accessToken);  // 세션에 저장
                })
                .map(response -> (String) response.get("access_token"));
    }

    public Mono<List<Map<String, Object>>> getProjects(String accessToken, HttpSession session) {
        List<Map<String, Object>> cachedProjects = (List<Map<String, Object>>) session.getAttribute("projects");

        if (cachedProjects != null) {
            log.info("Projects found in session");
            return Mono.just(cachedProjects); // 세션에 있으면 바로 반환
        }

        return webClient.get()
                .uri("https://api.atlassian.com/oauth/token/accessible-resources")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                })
                .doOnNext(projects -> session.setAttribute("projects", projects));
    }

    public Mono<Map<String, Object>> getUserInfo(String accessToken, HttpSession session) {
        Map<String, Object> cachedUserInfo = (Map<String, Object>) session.getAttribute("user");

        if (cachedUserInfo != null) {
            log.info("User info found in session");
            return Mono.just(cachedUserInfo); // 세션에 있으면 바로 반환
        }

        return webClient.get()
                .uri("https://api.atlassian.com/me")
                .header("Authorization", "Bearer " + accessToken)
                .header("Accept", "application/json")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .doOnNext(userInfo -> session.setAttribute("user", userInfo));
    }
}
