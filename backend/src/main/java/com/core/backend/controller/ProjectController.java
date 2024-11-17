package com.core.backend.controller;

import com.core.backend.data.dto.epics.EpicListDto;
import com.core.backend.data.dto.projects.ProjectGitSetDto;
import com.core.backend.data.dto.projects.ProjectSetDto;
import com.core.backend.data.dto.projects.UpdateGitHubRequestDto;
import com.core.backend.data.dto.users.AuthenticatedUserDto;
import com.core.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/update/set/github/{projectId}")
    public ResponseEntity<Void> updateProjectGitHub(@PathVariable Long projectId,
                                                    @RequestBody UpdateGitHubRequestDto gitHubRequestDto) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUserDto authenticatedUser)) {
            throw new IllegalStateException("No authenticated user found");
        }
        Long userId = Long.parseLong(authenticatedUser.getId());

        boolean isUpdate = projectService.updateGitHubToProject(userId, projectId, gitHubRequestDto);
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

    @GetMapping("/search/epic-list/{projectId}")
    public ResponseEntity<List<EpicListDto>> findAllEpicToProject(@PathVariable Long projectId) {
        return new ResponseEntity<>(projectService.getAllEpicToProject(projectId), HttpStatus.OK);
    }

}
