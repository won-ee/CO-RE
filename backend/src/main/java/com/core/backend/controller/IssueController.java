package com.core.backend.controller;

import com.core.backend.data.dto.isssue.IssueCreateDto;
import com.core.backend.data.dto.isssue.IssueCreateEpicDto;
import com.core.backend.data.dto.isssue.IssueListDto;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.service.IssueService;
import com.core.backend.service.ProjectUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {
    private final IssueService issueService;
    private final ProjectUserService projectUserService;

    @GetMapping("/search/list/{projectUserId}")
    public ResponseEntity<List<IssueListDto>> searchProjectIssueList(@PathVariable Long projectUserId) {
        return new ResponseEntity<>(issueService.getIssueListToProject(projectUserId), HttpStatus.OK);
    }

    @PostMapping("/create/no-epic/{projectUserId}")
    public ResponseEntity<IssueListDto> createProjectIssue(@PathVariable Long projectUserId,
                                                           @RequestBody IssueCreateDto issueCreateDto,
                                                           @RequestParam("deadline") String deadline) throws IOException {
        return new ResponseEntity<>(issueService.createIssueToJira(false, issueCreateDto, deadline), HttpStatus.OK);
    }

    @PostMapping("/create/epic/{projectUserId}")
    public ResponseEntity<IssueListDto> createProjectIssueWithEpic(@PathVariable Long projectUserId,
                                                                   @RequestBody IssueCreateEpicDto issueCreateEpicDto,
                                                                   @RequestParam("deadline") String deadline) throws IOException {
        return new ResponseEntity<>(issueService.createIssueToJira(true, issueCreateEpicDto, deadline), HttpStatus.OK);
    }

}
