package com.core.backend.service;

import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.dto.Users.UserProjectsDto;
import com.core.backend.data.entity.JiraOAuthToken;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class JiraService {

    private final RestTemplate restTemplate;

    @Value("${spring.security.oauth2.client.registration.jira.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.jira.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.jira.redirect-uri}")
    private String redirectUri;

    public JiraService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public JiraOAuthToken exchangeAuthorizationCode(String authorizationCode, HttpSession session) {
        Map<String, String> requestBody = Map.of(
                "grant_type", "authorization_code",
                "client_id", clientId,
                "client_secret", clientSecret,
                "code", authorizationCode,
                "redirect_uri", redirectUri
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        Map<String, Object> response = restTemplate.exchange(
                "https://auth.atlassian.com/oauth/token",
                org.springframework.http.HttpMethod.POST,
                request,
                new ParameterizedTypeReference<Map<String, Object>>() {
                }).getBody();

        assert response != null;
        String accessToken = (String) response.get("access_token");
        String refreshToken = (String) response.get("refresh_token");
        log.info("Access Token: {}", accessToken);
        log.info("Refresh Token: {}", refreshToken);
        session.setAttribute("OAuthAccessToken", accessToken);
        session.setAttribute("OAuthRefreshToken", refreshToken);

        return new JiraOAuthToken(null, accessToken, refreshToken);
    }

    public List<UserProjectsDto> getProjects(String accessToken, HttpSession session) {
        HttpEntity<String> request = new HttpEntity<>(createHeadersWithAuthorization(accessToken));

        List<Map<String, Object>> response = restTemplate.exchange(
                "https://api.atlassian.com/oauth/token/accessible-resources",
                org.springframework.http.HttpMethod.GET,
                request,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {
                }).getBody();

        session.setAttribute("projects", response);

        assert response != null;
        return convertToUserProjectsDto(response);
    }

    public UserInfoDto getUserInfo(String accessToken, HttpSession session) {

        HttpEntity<String> request = new HttpEntity<>(createHeadersWithAuthorization(accessToken));

        Map<String, Object> response = restTemplate.exchange(
                "https://api.atlassian.com/me",
                org.springframework.http.HttpMethod.GET,
                request,
                new ParameterizedTypeReference<Map<String, Object>>() {
                }).getBody();

        session.setAttribute("user", response);

        assert response != null;
        return convertToUserInfoDto(response);
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

    private HttpHeaders createHeadersWithAuthorization(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        return headers;
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
