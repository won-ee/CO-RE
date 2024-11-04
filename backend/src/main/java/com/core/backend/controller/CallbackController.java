package com.core.backend.controller;

import com.core.backend.service.JiraService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/callback/oauth2")
public class CallbackController {

    private final JiraService jiraService;

    @GetMapping("/code/jira")
    public Mono<ResponseEntity<Void>> callback(@RequestParam("code") String authorizationCode, HttpServletRequest request) {

        log.info("Authorization code received: {}", authorizationCode);

        Mono<String> accessTokenMono = jiraService.exchangeAuthorizationCode(authorizationCode, request.getSession())
                .doOnNext(token -> log.info("Access Token: {}", token))
                .doOnError(error -> log.info("Error in accessTokenMono: {}", error.getMessage()));

        return accessTokenMono.flatMap(accessToken -> {
            Mono<Map<String, Object>> userInfoMono = jiraService.getUserInfo(accessToken, request.getSession())
                    .doOnNext(userInfo -> log.info("User Info: {}", userInfo))
                    .doOnError(error -> log.info("Error while retrieving User Info: {}", error.getMessage()));

            Mono<List<Map<String, Object>>> projectsMono = jiraService.getProjects(accessToken, request.getSession())
                    .doOnNext(projects -> log.info("Projects: {}", projects))
                    .doOnError(error -> log.info("Error while retrieving Projects: {}", error.getMessage()));

            return Mono.zip(userInfoMono, projectsMono)
                    .flatMap(tuple -> {
                        request.getSession().setAttribute("user", tuple.getT1());
                        request.getSession().setAttribute("projects", tuple.getT2());
                        log.info("User and projects stored in session.");

                        // 프론트엔드 URL로 리다이렉트
                        return Mono.just(ResponseEntity.status(HttpStatus.FOUND)
                                .location(URI.create("http://localhost:5173/")) // 프론트엔드 URL 설정
                                .build());
                    });
        });
    }
}
