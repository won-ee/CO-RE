package com.core.backend.controller;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogoutController {

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie cookie = ResponseCookie.from("accesToken", "")
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .secure(true)
                .build();
        return ResponseEntity.noContent()
                .header("Set-Cookie", cookie.toString())
                .build();
    }

}
