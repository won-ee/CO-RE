package com.core.backend.controller;

import com.core.backend.data.dto.projects.UpdateGitHubRequestDto;
import com.core.backend.data.dto.users.AuthenticatedUserDto;
import com.core.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/set/github")
    public ResponseEntity<Void> updateProjectGitHub(@AuthenticationPrincipal AuthenticatedUserDto authenticatedUser,
                                                    @RequestBody UpdateGitHubRequestDto gitHubRequestDto) {
        boolean isUpdate = projectService.updateGitHubToProject(Long.parseLong(authenticatedUser.getId()), gitHubRequestDto);
        return isUpdate ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
