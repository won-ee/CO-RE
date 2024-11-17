package com.core.api.filter;

import com.core.api.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthenticationFilter extends OncePerRequestFilter {

    private final AuthService authService;

    private static final List<String> EXCLUDED_PATHS = Arrays.asList(
            "/pull-request/webhook",
            "/review/webhook"
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return EXCLUDED_PATHS.contains(path);
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain)
            throws ServletException, IOException {

        String accessToken = getAuthorizationFromCookie(request);
        log.info("Request received: {} {}", request.getMethod(), request.getRequestURI());
        log.info("accessToken: {}", accessToken);
        if (SecurityContextHolder.getContext()
                .getAuthentication() == null) {
            String githubToken = request.getHeader("gitToken");
            if (githubToken == null) {
                log.info("Request received without gitToken header");
                githubToken = authService.requestTokenFromServer(accessToken)
                        .token();
            } else {
                accessToken = githubToken;
            }


            log.info("Access token: {}", accessToken);
            log.info("Github token: {}", githubToken);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(accessToken, null, Collections.emptyList());
            auth.setDetails(githubToken);
            SecurityContextHolder.getContext()
                    .setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }

    public String getAuthorizationFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }

        return Arrays.stream(cookies)
                .filter(cookie -> "accessToken".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }

}
