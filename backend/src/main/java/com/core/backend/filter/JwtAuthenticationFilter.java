package com.core.backend.filter;

import com.core.backend.data.dto.users.AuthenticatedUserDto;
import com.core.backend.exception.InCorrectAccessTokenException;
import com.core.backend.service.JwtTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/") ||
                path.startsWith("/login/jira") ||
                path.startsWith("/oauth2/") ||
                path.startsWith("/callback/oauth2/") ||
                path.startsWith("/jira/") ||
                path.startsWith("/ssafy/atlassian/") ||
                path.startsWith("/callback/code/") ||
                path.startsWith("/project-users/search/email/");
    }

    private final JwtTokenService jwtTokenService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwtToken = null;

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            if (authHeader.startsWith("Bearer ")) {
                jwtToken = authHeader.substring(7);
            } else {
                jwtToken = authHeader;
            }
        }

        if (jwtToken == null) {
            log.info("Authorization 헤더가 없으므로 쿠키에서 JWT 추출 시도");
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("accessToken".equals(cookie.getName())) {
                        jwtToken = cookie.getValue();
                        break;
                    }
                }
            }
        }

        if (jwtToken == null) {
            log.info("JWT 토큰을 찾을 수 없음");
            filterChain.doFilter(request, response);
            return;
        }

        log.info("추출된 JWT 토큰: {}", jwtToken);

        try {
            if (jwtTokenService.isJwtTokenValid(jwtToken)) {
                Map<String, Optional<String>> claims = jwtTokenService.extractIdAndEmail(jwtToken);

                String id = claims.get("id").orElseThrow(InCorrectAccessTokenException::new);
                String email = claims.get("email").orElseThrow(InCorrectAccessTokenException::new);

                AuthenticatedUserDto authenticatedUserDto = new AuthenticatedUserDto(id, email);

                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            authenticatedUserDto,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                filterChain.doFilter(request, response);
            } else {
                throw new InCorrectAccessTokenException();
            }
        } catch (Exception e) {
            log.error("Authentication failed: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }
}
