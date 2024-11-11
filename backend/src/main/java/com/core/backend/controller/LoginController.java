package com.core.backend.controller;

import com.core.backend.service.JwtTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Controller
@Slf4j
@RequestMapping("/login")
public class LoginController {

    @Value("${spring.security.oauth2.client.registration.jira.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.jira.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.jira.redirect-uri}")
    private String redirectUri;

    private final JwtTokenService jwtTokenService;

    public LoginController(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    @GetMapping("/jira")
    public void login(@RequestHeader(value = "Authorization", required = false) String accessToken, HttpServletRequest request, HttpServletResponse response) throws IOException {

        if (accessToken != null && jwtTokenService.isJwtTokenValid(accessToken)) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.sendRedirect("http://localhost:5173");
            return;
        }

        String scopes = "read:me read:jira-work manage:jira-project manage:jira-configuration read:jira-user write:jira-work offline_access";
        String encodedScopes = URLEncoder.encode(scopes, StandardCharsets.UTF_8).replace("+", "%20");
        String encodedRedirectUri = URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);

        String audience = "api.atlassian.com";
        String authorizationUrl = String.format(
                "https://auth.atlassian.com/authorize?audience=%s&client_id=%s&scope=%s&redirect_uri=%s&state=YOUR_USER_BOUND_VALUE&response_type=code&prompt=consent",
                audience,
                clientId,
                encodedScopes,
                encodedRedirectUri
        );

        log.info("Redirecting to: {}", authorizationUrl);

        response.sendRedirect(authorizationUrl);
    }
}
