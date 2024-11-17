package com.core.backend.controller;

import com.core.backend.data.dto.projects.ProjectInfoDto;
import com.core.backend.service.GroupService;
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
@RequestMapping("/group")
public class GroupController {

    private final GroupService groupService;

    @GetMapping("/search/project-list/{groupId}")
    public ResponseEntity<List<ProjectInfoDto>> findSearchProjectList(@PathVariable Long groupId) {
        return new ResponseEntity<>(groupService.findAllProjectsByGroups(groupId), HttpStatus.OK);
    }
}
