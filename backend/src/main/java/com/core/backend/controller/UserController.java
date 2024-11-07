package com.core.backend.controller;

import com.core.backend.data.dto.Users.AuthenticatedUserDto;
import com.core.backend.data.dto.Users.UserLoginDto;
import com.core.backend.data.repository.UserRepository;
import com.core.backend.service.JwtTokenService;
import com.core.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;

    @GetMapping("/user-info")
    public ResponseEntity<Map<UserLoginDto, Integer>> getUserInfo(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser) {
        String id = authenticatedUser.getId();
        

    }


}
