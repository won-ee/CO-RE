package com.core.backend.service;

import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.dto.Users.UserProjectsDto;
import com.core.backend.data.entity.OAuthToken;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
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

    public Mono<OAuthToken> exchangeAuthorizationCode(String authorizationCode, HttpSession session) {
//
//        String cachedAccessToken = (String) session.getAttribute("accessToken");
//        String cachedRefreshToken = (String) session.getAttribute("refreshToken");
//
//        if (cachedAccessToken != null && cachedRefreshToken != null) {
//            log.info("AccessToken found in session: {}", cachedAccessToken);
//            log.info("RefreshToken found in session: {}", cachedRefreshToken);
//            return Mono.just(new OAuthToken(null, cachedAccessToken, cachedRefreshToken)); // 세션에 있으면 바로 반환
//        }

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
                    String refreshToken = (String) response.get("refresh_token");
                    log.info("Access Token: {}", accessToken);
                    log.info("Refresh Token: {}", refreshToken);
                    session.setAttribute("accessToken", accessToken);
                    session.setAttribute("refreshToken", refreshToken);
                })
                .map(response -> new OAuthToken(null, (String) response.get("access_token"), (String) response.get("refresh_token")));
    }

    public Mono<List<UserProjectsDto>> getProjects(String accessToken, HttpSession session) {
//        List<Map<String, Object>> cachedProjects = (List<Map<String, Object>>) session.getAttribute("projects");
//
//        if (cachedProjects != null) {
//            log.info("Projects found in session");
//            return Mono.just(convertToUserProjectsDto(cachedProjects)); // 세션에 있으면 바로 반환
//        }

        return webClient.get()
                .uri("https://api.atlassian.com/oauth/token/accessible-resources")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                })
                .doOnNext(projects -> session.setAttribute("projects", projects))
                .map(this::convertToUserProjectsDto);
    }

    public Mono<UserInfoDto> getUserInfo(String accessToken, HttpSession session) {

//        Map<String, Object> cachedUserInfo = (Map<String, Object>) session.getAttribute("user");
//
//        if (cachedUserInfo != null) {
//            log.info("User info found in session");
//            return Mono.just(convertToUserInfoDto(cachedUserInfo)); // 세션에 있으면 바로 반환
//        }

        return webClient.get()
                .uri("https://api.atlassian.com/me")
                .header("Authorization", "Bearer " + accessToken)
                .header("Accept", "application/json")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .doOnNext(userInfo -> session.setAttribute("user", userInfo))
                .map(this::convertToUserInfoDto);
    }

    private UserInfoDto convertToUserInfoDto(Map<String, Object> userInfo) {
        return new UserInfoDto(
                (String) userInfo.get("account_id"),
                (String) userInfo.get("email"),
                (String) userInfo.get("name"),
                (String) userInfo.get("picture"),
                (String) userInfo.get("nickname")
        );
    }

    private ArrayList<UserProjectsDto> convertToUserProjectsDto(List<Map<String, Object>> projects) {
        ArrayList<UserProjectsDto> userProjects = new ArrayList<>();

        for (Map<String, Object> project : projects) {
            String projectId = (String) project.get("id");
            String projectName = (String) project.get("name");
            String projectUrl = (String) project.get("url");
            String projectAvatarUrl = (String) project.get("avatarUrl");

            UserProjectsDto projectDto = new UserProjectsDto(
                    projectId,
                    projectName,
                    projectUrl,
                    projectAvatarUrl
            );
            userProjects.add(projectDto);
        }
        return userProjects;
    }
}
