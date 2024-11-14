package com.core.backend.controller;

import com.core.backend.data.dto.isssue.IssueListDto;
import com.core.backend.service.IssueService;
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
@RequestMapping("/issue")
public class IssueController {
    private final IssueService issueService;

    @GetMapping("/search/list/{projectUserId}")
    public ResponseEntity<List<IssueListDto>> searchProjectIssueList(@PathVariable Long projectUserId) {
        return new ResponseEntity<>(issueService.getIssueListToProject(projectUserId), HttpStatus.OK);
    }


}
