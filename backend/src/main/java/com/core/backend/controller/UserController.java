package com.core.backend.controller;

import com.core.backend.data.dto.users.*;
import com.core.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/user-info")
    public ResponseEntity<UserLoginDto> getUserInfo() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUserDto authenticatedUser)) {
            throw new IllegalStateException("No authenticated user found");
        }
        Long id = Long.parseLong(authenticatedUser.getId());
        log.info("authenticatedUser.getId() : {}", id);
        return new ResponseEntity<>(userService.getFirstUserInfo(id), HttpStatus.OK);
    }

    @GetMapping("/search/my-info/{userId}")
    public ResponseEntity<UserAllInfoDto> getMyInfo(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getUserInfo(userId), HttpStatus.OK);
    }

    @PatchMapping("/update/my-info/{userId}")
    public ResponseEntity<UserAllInfoDto> updateMyInfo(@PathVariable Long userId, @RequestBody UserUpdateInfoDto userUpdateInfoDto) {
        return new ResponseEntity<>(userService.updateUserInfo(userId, userUpdateInfoDto), HttpStatus.OK);
    }

    @GetMapping("/search/git-token")
    public ResponseEntity<UserTokenDto> getGitToken() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUserDto authenticatedUser)) {
            throw new IllegalStateException("No authenticated user found");
        }
        Long id = Long.parseLong(authenticatedUser.getId());
        return new ResponseEntity<>(userService.getGitTokenToUser(id), HttpStatus.OK);
    }
}
