package com.core.api.filter;

import com.core.api.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

    private final AuthService authService;

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain)
            throws ServletException, IOException {

        String accessToken = request.getHeader("Authorization");
        if (accessToken == null) {
            throw new AccessDeniedException("Access token is missing");
        }

        if (SecurityContextHolder.getContext()
                .getAuthentication() == null) {

            String githubToken = authService.requestTokenFromServer(accessToken)
                    .token();


            if (githubToken == null) {
                githubToken = accessToken;
            }

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(accessToken, null, Collections.emptyList());
            auth.setDetails(githubToken);
            SecurityContextHolder.getContext()
                    .setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }


}
