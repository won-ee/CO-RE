package com.core.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequestMapping("/login")
public class LoginController {

    @GetMapping("/jira")
    public String login() {
        log.info("login");

        return "redirect:/oauth2/authorization/jira";
    }
}
