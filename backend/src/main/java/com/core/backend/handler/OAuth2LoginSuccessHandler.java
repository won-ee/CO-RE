package com.core.backend.handler;

import com.core.backend.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    //    @Lazy
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Login 성공");
        try {
            String code = request.getParameter("code");

            // 인가 코드를 사용해 액세스 토큰 요청
            String tokenUri = "https://auth.atlassian.com/oauth/token";
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//            params.add("grant_type", "authorization_code");
//            params.add("client_id", "YOUR_CLIENT_ID");
//            params.add("client_secret", "YOUR_CLIENT_SECRET");
//            params.add("code", code);
//            params.add("redirect_uri", "http://localhost:8080/login/oauth2/code/jira");


        } catch (Exception ex) {
            log.error("OAuth2 로그인 리다이렉트 실패 : {}", ex.getMessage());
        }
    }
}
