package com.core.backend.service;

import com.core.backend.data.dto.Users.UserLoginDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LoginService {

    private final JwtTokenService jwtTokenService;
    private final JiraOAuthTokenService JiraOAuthTokenService;

    public LoginService(JwtTokenService jwtTokenService, JiraOAuthTokenService JiraOAuthTokenService) {
        this.jwtTokenService = jwtTokenService;
        this.JiraOAuthTokenService = JiraOAuthTokenService;
    }

    public UserLoginDto aceessCheck(String accessToken) {

        return null;

//        if (accessToken != null && accessToken.startsWith("Bearer ")) {
//            accessToken = accessToken.replace("Bearer ", "");
//
//            Optional<String> emailOpt = jwtService.extractEmail(accessToken);
//            if (emailOpt.isPresent()) {
//                String email = emailOpt.get();
//                log.info("Access Token is valid. User email: {}", email);
//
//                // 연결된 jira accesstoken 유효여부는 체크하지 않음.
//                // 그건 api 요청하다가 기간 지났다는 명령어 오면 refreshtoken으로 access 재
//                OAuthToken getOAuthToken = tokenService.getOAuthToken(email);
//
//                String oauthAccessToken
//                if (getOAuthToken.getAccessToken() == null) {
//
//                }
//
//
//                // 만약 유효하지않다면 refreshToken으로 accesstoken 재발급받기
//                // 그 이후에 project, userinfo 데이터 받아와서 사용자에게 돌려주기
//
//
//            } else {
//                log.info("Invalid Access Token");
//            }
//        }
//        return null;
    }


}
