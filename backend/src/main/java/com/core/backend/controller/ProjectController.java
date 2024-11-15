package com.core.backend.controller;

import com.core.backend.data.dto.projects.ProjectGitSetDto;
import com.core.backend.data.dto.projects.ProjectSetDto;
import com.core.backend.data.dto.projects.UpdateGitHubRequestDto;
import com.core.backend.data.dto.users.AuthenticatedUserDto;
import com.core.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/search/set/{projectId}")
    public ResponseEntity<ProjectSetDto> findProjectSet(@PathVariable Long projectId) {
        return new ResponseEntity<>(projectService.findSetToProject(projectId), HttpStatus.OK);
    }

    @PatchMapping("/update/set/{projectId}")
    public ResponseEntity<ProjectSetDto> updateProjectSet(@PathVariable Long projectId, @RequestBody ProjectSetDto projectSetDto) {
        return new ResponseEntity<>(projectService.updateSetToProject(projectId, projectSetDto), HttpStatus.OK);
    }

    @GetMapping("/search/git-set")
    public ResponseEntity<ProjectGitSetDto> findProjectSetGit(@RequestParam("repo") String repo, @RequestParam("owner") String owner) {
        return new ResponseEntity<>(projectService.findGitSetToProject(repo, owner), HttpStatus.OK);
    }

}