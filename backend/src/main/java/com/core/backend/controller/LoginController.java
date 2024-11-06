package com.core.backend.controller;

import com.core.backend.data.dto.Users.UserLoginDto;
import com.core.backend.service.JwtService;
import com.core.backend.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final JwtService jwtService;

    public LoginController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
    }

    @GetMapping("/jira")
    public ResponseEntity<?> login(@RequestHeader(value = "Autorization", required = false) String accessToken, HttpServletRequest request) {
        UserLoginDto userLoginDto = null;


//        UserLoginDto userLoginDto = loginService.aceessCheck(accessToken, request);

        log.info("login in");
        if (userLoginDto == null) {
            return ResponseEntity.status(302)
                    .header("Location", "/oauth2/authorization/jira")
                    .build();
        } else
            return ResponseEntity.ok(userLoginDto);
    }
}
