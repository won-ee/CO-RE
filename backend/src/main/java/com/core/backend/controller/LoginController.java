package com.core.backend.controller;

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

    //    TODO: AccessToken 남아있으면 유저체크해서 유효하면 자동 리다이렉트
    @GetMapping("/jira")
    public void login(@RequestHeader(value = "Authorization", required = false) String accessToken, HttpServletRequest request, HttpServletResponse response) throws IOException {


        response.sendRedirect("/oauth2/authorization/jira");
    }
}
