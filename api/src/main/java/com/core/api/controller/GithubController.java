package com.core.api.controller;

import com.core.api.data.dto.github.UserDto;
import com.core.api.service.GithubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/github")
@RequiredArgsConstructor
public class GithubController {

    private final GithubService githubService;


    @GetMapping("/{owner}/{repo}")
    public ResponseEntity<Void> createWebhook(@PathVariable("owner") String repo, @PathVariable("repo") String owner) {
        githubService.createWebhooks(repo, owner);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> getUser() {
        UserDto user = githubService.getUser();
        return ResponseEntity.ok(user);
    }


}
