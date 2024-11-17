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

    private final JwtTokenService jwtTokenService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwtToken = null;

        // Authorization 헤더가 있는 경우 우선 처리
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            if (authHeader.startsWith("Bearer ")) {
                jwtToken = authHeader.substring(7); // "Bearer "를 제외한 부분 추출
            } else {
                jwtToken = authHeader; // 접두사가 없으면 그대로 사용
            }
        }

        // Authorization 헤더가 없는 경우 Cookie에서 추출
        if (jwtToken == null) {
            log.info("Authorization 헤더가 없으므로 쿠키에서 JWT 추출 시도");
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("accessToken".equals(cookie.getName())) { // 쿠키 이름이 'accessToken'인 경우
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

                log.info("13");
                String id = claims.get("id").orElseThrow(InCorrectAccessTokenException::new);
                String email = claims.get("email").orElseThrow(InCorrectAccessTokenException::new);

                log.info("14");
                log.info("id, email : {}, {}", id, email);
                AuthenticatedUserDto authenticatedUserDto = new AuthenticatedUserDto(id, email);

                log.info("15");
                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            authenticatedUserDto,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                log.info("16");
                filterChain.doFilter(request, response);
            } else {
                throw new InCorrectAccessTokenException();
            }
        } catch (Exception e) {
            log.error("Authentication failed: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }

//
//        log.info("10");
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader == null) {
//            filterChain.doFilter(request, response);
//            return;
//        }
////        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
////            filterChain.doFilter(request, response);
////            return;
////        }
//        log.info("11");
//
//        String jwtToken;
//        if (authHeader.startsWith("Bearer ")) {
//            jwtToken = authHeader.substring(7); // "Bearer "를 제외한 부분 추출
//        } else {
//            jwtToken = authHeader; // 접두사가 없으면 그대로 사용
//        }
//
////        String jwtToken = authHeader.substring(7);
//
//        log.info("12");
//        try {
//            if (jwtTokenService.isJwtTokenValid(jwtToken)) {
//                Map<String, Optional<String>> claims = jwtTokenService.extractIdAndEmail(jwtToken);
//
//                log.info("13");
//                String id = claims.get("id").orElseThrow(InCorrectAccessTokenException::new);
//                String email = claims.get("email").orElseThrow(InCorrectAccessTokenException::new);
//
//                log.info("14");
//                log.info("id, email : {}, {}", id, email);
//                AuthenticatedUserDto authenticatedUserDto = new AuthenticatedUserDto(id, email);
//
//                log.info("15");
//                if (SecurityContextHolder.getContext().getAuthentication() == null) {
//                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                            authenticatedUserDto,
//                            null,
//                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//                log.info("16");
//                filterChain.doFilter(request, response);
//            } else {
//                throw new InCorrectAccessTokenException();
//            }
//        } catch (Exception e) {
//            log.error("Authentication failed: {}", e.getMessage());
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//        }

    }
}
