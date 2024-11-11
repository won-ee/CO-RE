package com.core.backend.controller;

import com.core.backend.data.dto.users.AuthenticatedUserDto;
import com.core.backend.data.dto.users.UserLoginDto;
import com.core.backend.data.repository.UserRepository;
import com.core.backend.service.JwtTokenService;
import com.core.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;

    @GetMapping("/user-info")
    public ResponseEntity<UserLoginDto> getUserInfo(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser) {
        Long id = Long.parseLong(authenticatedUser.getId());

        return new ResponseEntity<>(userService.getUserInfo(id), HttpStatus.OK);
    }


}
