package com.core.backend.controller;

import com.core.backend.service.JwtTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@Slf4j
@RequestMapping("/login")
public class LoginController {

    private final JwtTokenService jwtTokenService;

    public LoginController(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    @GetMapping("/jira")
    public void login(@RequestHeader(value = "Authorization", required = false) String accessToken, HttpServletRequest request, HttpServletResponse response) throws IOException {

        if (accessToken != null && jwtTokenService.isJwtTokenValid(accessToken)) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.sendRedirect("http://localhost:5173");
            return;
        }

        response.sendRedirect("/oauth2/authorization/jira");
    }
}
