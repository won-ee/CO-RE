package com.core.backend.service;

import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.dto.Users.UserProjectsDto;
import com.core.backend.data.entity.OAuthToken;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CallbackService {

    private final TokenService tokenService;
    private final JiraService jiraService;
    private final JwtService jwtService;
    private final UserService userService;

    public CallbackService(TokenService tokenService, JiraService jiraService, JwtService jwtService, UserService userService) {
        this.tokenService = tokenService;
        this.jiraService = jiraService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public Mono<ResponseEntity<Map<String, String>>> loginCallBack(String authorizationCode, HttpServletRequest request, HttpServletResponse response) {
        log.info("Authorization code received: {}", authorizationCode);

        Mono<OAuthToken> accessTokenMono = jiraService.exchangeAuthorizationCode(authorizationCode, request.getSession())
                .doOnNext(token -> log.info("OAuthToken : {}", token))
                .doOnError(error -> log.info("Error in accessTokenMono: {}", error.getMessage()));

        return accessTokenMono.flatMap(oAuthToken -> {
            String accessToken = oAuthToken.getAccessToken();

            Mono<UserInfoDto> userInfoMono = jiraService.getUserInfo(accessToken, request.getSession())
                    .doOnNext(
                            userInfo -> {
                                log.info("User Info: {}", userInfo);
                                OAuthToken newOAuthToken = new OAuthToken(userInfo.email(), oAuthToken.getAccessToken(), oAuthToken.getRefreshToken());
                                tokenService.saveOAuthToken(newOAuthToken);
                            })
                    .doOnError(error -> log.info("Error while retrieving User Info: {}", error.getMessage()));

            return userInfoMono.flatMap(userInfo -> {
                if (userService.findUserEmail(userInfo.email())) {
                    Mono<List<UserProjectsDto>> projectsMono = jiraService.getProjects(accessToken, request.getSession())
                            .doOnNext(projects -> log.info("Projects: {}", projects))
                            .doOnError(error -> log.info("Error while retrieving Projects: {}", error.getMessage()));

                    return projectsMono.flatMap(projectList -> {
                        log.info("Saving user and projects to database.");
                        userService.saveUserAndProjects(userInfo, projectList);

                        return createRedirectResponseWithJWT(userInfo.email(), response);
                    });
                } else {
                    return createRedirectResponseWithJWT(userInfo.email(), response);
                }
            });
        });
    }

    public Mono<ResponseEntity<Map<String, String>>> createRedirectResponseWithJWT(String email, HttpServletResponse response) {
        String jwt = jwtService.createAccessToken(email);
        log.info("jwt token : {}", jwt);

//        Cookie jwtCookie = new Cookie("jwtToken", jwt);
//        jwtCookie.setHttpOnly(true);
//        jwtCookie.setSecure(false);  // 로컬 개발 환경에서는 false로 설정
//        jwtCookie.setPath("/");
//        jwtCookie.setMaxAge(1800);  // 30분
//        jwtCookie.setDomain("localhost"); // 도메인을 명확히 설정
//
//        response.addCookie(jwtCookie); // HttpServletResponse로 쿠키 추가
//
//        Map<String, String> responseBody = new HashMap<>();
//        responseBody.put("redirectUrl", "http://localhost:5173");
//
//        return Mono.just(ResponseEntity.ok(responseBody));

//        return Mono.just(ResponseEntity.status(HttpStatus.FOUND)
//                .location(URI.create("http://localhost:5173"))
//                .build());


        ResponseCookie jwtCookie = ResponseCookie.from("jwtToken", jwt)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(1800)
                .sameSite("None")
                .build();

        // 프론트엔드 URL로 리다이렉트
        return Mono.just(ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("http://localhost:5173/"))
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build());
    }

}
