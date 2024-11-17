package com.core.backend.controller;

import com.core.backend.data.dto.users.*;
import com.core.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/user-info")
    public ResponseEntity<UserLoginDto> getUserInfo(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser) {
        Long id = Long.parseLong(authenticatedUser.getId());
        return new ResponseEntity<>(userService.getFirstUserInfo(id), HttpStatus.OK);
    }

    @GetMapping("/search/my-info")
    public ResponseEntity<UserAllInfoDto> getMyInfo(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser) {
        Long id = Long.parseLong(authenticatedUser.getId());
        return new ResponseEntity<>(userService.getUserInfo(id), HttpStatus.OK);
    }

    @PatchMapping("/update/my-info")
    public ResponseEntity<UserAllInfoDto> updateMyInfo(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser,
                                                       @RequestBody UserUpdateInfoDto userUpdateInfoDto) {
        Long id = Long.parseLong(authenticatedUser.getId());
        return new ResponseEntity<>(userService.updateUserInfo(id, userUpdateInfoDto), HttpStatus.OK);
    }

    @GetMapping("/search/git-token")
    public ResponseEntity<UserTokenDto> getGitToken(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser) {
        Long id = Long.parseLong(authenticatedUser.getId());
        return new ResponseEntity<>(userService.getGitTokenToUser(id), HttpStatus.OK);
    }
}
