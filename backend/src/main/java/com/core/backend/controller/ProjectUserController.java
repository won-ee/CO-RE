package com.core.backend.controller;


import com.core.backend.data.dto.projectUsers.ProjectNameAndUserEmailDto;
import com.core.backend.data.dto.projectUsers.ProjectUserInfoDto;
import com.core.backend.data.entity.Projects;
import com.core.backend.service.ProjectService;
import com.core.backend.service.ProjectUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/project-users")
public class ProjectUserController {


    private final ProjectUserService projectUserService;
    private final ProjectService projectService;

    @GetMapping("/search/list/{projectId}")
    public ResponseEntity<List<ProjectUserInfoDto>> getProjectUserList(@PathVariable Long projectId) {
        List<ProjectUserInfoDto> projectUserList = projectUserService.findProjectUserList(projectId);
        return new ResponseEntity<>(projectUserList, HttpStatus.OK);
    }

    @GetMapping("/search/email")
    public ResponseEntity<ProjectNameAndUserEmailDto> getProjectUsersAndName(@RequestParam("repo") String repo, @RequestParam("owner") String owner) {
        Projects project = projectService.getProjectGit(repo, owner);
        if (project == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(projectUserService.getProjectNameAndUsersEmail(project), HttpStatus.OK);
    }

}
