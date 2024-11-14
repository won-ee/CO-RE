package com.core.backend.controller;


import com.core.backend.data.dto.projectUsers.ProjectUserInfoDto;
import com.core.backend.service.ProjectUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/project-users")
public class ProjectUserController {


    private final ProjectUserService projectUserService;

    @GetMapping("/search/list/{projectId}")
    public ResponseEntity<List<ProjectUserInfoDto>> getProjectUserList(@PathVariable Long projectId) {
        List<ProjectUserInfoDto> projectUserList = projectUserService.findProjectUserList(projectId);
        return new ResponseEntity<>(projectUserList, HttpStatus.OK);
    }
}
