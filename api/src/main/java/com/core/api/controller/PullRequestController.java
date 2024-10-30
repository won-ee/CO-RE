package com.core.api.controller;

import com.core.api.data.dto.ChangeDto;
import com.core.api.data.dto.pullrequest.PullRequestDto;
import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import com.core.api.service.PullRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pull-request")
@RequiredArgsConstructor
public class PullRequestController {

    private final PullRequestService pullRequestService;

    @GetMapping("/{owner}/{repo}/{pullId}/files")
    public ResponseEntity<List<ChangeDto>> getChangeFiles(@PathVariable String owner, @PathVariable String repo, @PathVariable int pullId) {
        List<ChangeDto> changeFiles = pullRequestService.getChangeFiles(owner, repo, pullId);
        return ResponseEntity.ok(changeFiles);
    }

    @GetMapping("/{owner}/{repo}")
    public ResponseEntity<List<PullRequestDto>> getPullRequestList(@PathVariable String owner, @PathVariable String repo) {
        List<PullRequestDto> pullRequestList = pullRequestService.getPullRequestList(owner, repo);
        return ResponseEntity.ok(pullRequestList);
    }

}
