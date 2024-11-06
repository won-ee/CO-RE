package com.core.backend.service;

import com.core.backend.data.dto.Users.UserLoginDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LoginService {

    private final JwtService jwtService;
    private final TokenService tokenService;

    public LoginService(JwtService jwtService, TokenService tokenService) {
        this.jwtService = jwtService;
        this.tokenService = tokenService;
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
//                // 연결된 jira accesstoken 유효한지 체크하기
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
