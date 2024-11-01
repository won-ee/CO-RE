package com.core.backend.handler;

import com.core.backend.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${spring.security.oauth2.client.registration.jira.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.jira.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.jira.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Login 성공");
        log.info("Request URL: {}", request.getRequestURL());
        log.info("Request Query String: {}", request.getQueryString());

        try {
            String code = request.getParameter("code"); // 1. 인가 코드 추출
            if (code == null) {
                log.error("인가 코드가 존재하지 않습니다.");
                response.sendRedirect("/login-failure");
                return;
            }
            log.info("code : {}", code);

//            // 세션에서 code_verifier 가져오기
//            HttpSession session = request.getSession();
//            String codeVerifier = (String) session.getAttribute("code_verifier");
//
//            if (codeVerifier == null) {
//                log.error("code_verifier가 누락되었습니다.");
//                response.sendRedirect("/login-failure");
//                return;
//            }
//
            // URL 설정
            String url = "https://auth.atlassian.com/oauth/token";

            // 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 요청 바디 설정
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("grant_type", "authorization_code");
            requestBody.put("client_id", clientId);  // 실제 client_id로 대체
            requestBody.put("client_secret", clientSecret);  // 실제 client_secret로 대체
            requestBody.put("code", code);  // 실제 authorization code로 대체
            requestBody.put("redirect_uri", redirectUri);  // 실제 redirect URI로 대체

            HttpEntity<Map<String, String>> tokenRequest = new HttpEntity<>(requestBody, headers);

            // 요청 전송
            ResponseEntity<String> tokenResponse = restTemplate.exchange(url, HttpMethod.POST, tokenRequest, String.class);

            // 응답 출력
            System.out.println("Response: " + tokenResponse.getBody());
//
//
////            // 2. 인가 코드를 사용해 액세스 토큰 요청
////            String tokenUri = "https://auth.atlassian.com/oauth/token";
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            HttpEntity<Map<String, String>> tokenRequest = new HttpEntity<>(Map.of(
//                    "grant_type", "authorization_code",
//                    "client_id", clientId,
//                    "client_secret", clientSecret,
//                    "code", code,
//                    "redirect_uri", redirectUri,
////                    "code_verifier", codeVerifier,
//                    "scope", "read:me, read:jira-work, manage:jira-project, manage:jira-configuration, read:jira-user, manage:jira-webhook, write:jira-work, manage:jira-data-provider" // 필요에 따라 스코프 값 설정
//            ), headers);
//
//            // 로그 출력
//            log.info("Token Request Data: grant_type=authorization_code, client_id={}, client_secret={}, code={}, redirect_uri={}, scope={}",
//                    clientId, clientSecret, code, redirectUri, "read:jira-user read:jira-work manage:jira-project");

            // 3. 토큰 요청 및 응답 처리
//            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUri, tokenRequest, Map.class);
//
//            if (tokenResponse.getStatusCode() == HttpStatus.OK && tokenResponse.getBody() != null) {
//                // 응답에서 액세스 토큰 추출
//                String accessToken = (String) tokenResponse.getBody().get("access_token");
//                log.info("액세스 토큰: {}", accessToken);
//            }
//            // 3. 액세스 토큰을 사용해 사용자 정보 요청
//            String userInfoUri = "https://api.atlassian.com/me";
//            HttpHeaders userHeaders = new HttpHeaders();
//            userHeaders.add("Authorization", "Bearer " + accessToken);
//
//            HttpEntity<?> userEntity = new HttpEntity<>(userHeaders);
//            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUri, HttpMethod.GET, userEntity, Map.class);
//
//            Map<String, Object> userAttributes = userInfoResponse.getBody(); // 사용자 정보 가져오기
//
//            // JWT 생성 후 쿠키에 추가
//            String jwtAccessToken = jwtService.createAccessToken((String) userAttributes.get("email"));
//            response.addCookie(new Cookie("jwtAccessToken", jwtAccessToken));

            // 5. 성공 리다이렉트
//            response.sendRedirect("/login-success"); // 원하는 리다이렉트 URL로 설정

        } catch (Exception ex) {
            log.error("OAuth2 로그인 리다이렉트 실패 : {}", ex.getMessage());
        }
    }
}
