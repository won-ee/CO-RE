package com.core.backend.controller;

import com.core.backend.data.repository.UserRepository;
import com.core.backend.service.JwtService;
import com.core.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

//    @PostMapping("/sign-up")
//    public String signup(@RequestBody )


}
