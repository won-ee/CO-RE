package com.core.backend.controller;

import com.core.backend.service.CallbackService;
import com.core.backend.service.JwtTokenService;
import jakarta.servlet.http.Cookie;
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

import java.io.IOException;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/callback/oauth2")
public class CallbackController {

    private final CallbackService callbackService;
    private final JwtTokenService jwtTokenService;

    @GetMapping("/code/jira")
    public void callback(@RequestParam("code") String authorizationCode, HttpServletRequest request, HttpServletResponse response) {
        try {
            Map<String, Object> loginData = callbackService.loginAccessCallBack(authorizationCode);
            Long userId = (Long) loginData.get("userId");
            String userEmail = (String) loginData.get("userEmail");

            Cookie cookie = jwtTokenService.createAllTokenCookie(userId, userEmail);

            log.info("Cookie Name: {}, Cookie Value: {}", cookie.getName(), cookie.getValue());
            response.addCookie(cookie);
            response.sendRedirect("https://k11s106.p.ssafy.io/dashboard");

        } catch (IOException e) {
            log.error("Error during callback processing: {}", e.getMessage());
        }
    }

    @GetMapping("/code/update")
    public ResponseEntity<Void> updateJira() {
        try {
//            callbackService.

        } catch (Exception e) {
            log.error("Error updateJira: {}", e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
