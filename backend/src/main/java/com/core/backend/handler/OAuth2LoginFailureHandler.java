package com.core.backend.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class OAuth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        // 실패 원인 로깅
        log.error("OAuth2 로그인 실패: {}", exception.getMessage());

        // 실패 시 리다이렉트할 URL 설정
        setDefaultFailureUrl("/error"); // 실패 시 에러 페이지로 리다이렉트
        super.onAuthenticationFailure(request, response, exception);
    }
}