package com.core.backend.controller;

import com.core.backend.data.dto.Users.UserLoginDto;
import com.core.backend.service.CallbackService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/callback/oauth2")
public class CallbackController {

    private final CallbackService callbackService;

    @GetMapping("/code/jira")
    public Mono<ResponseEntity<Map<String, String>>> callback(@RequestParam("code") String authorizationCode, HttpServletRequest request, HttpServletResponse response) {
        UserLoginDto userLoginData = (UserLoginDto) request.getSession().getAttribute("userLoginData");

        if (userLoginData != null) {
            return Mono.just(ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create("http://localhost:5173/"))
                    .build());
        } else
            return callbackService.loginCallBack(authorizationCode, request, response);
    }
}
