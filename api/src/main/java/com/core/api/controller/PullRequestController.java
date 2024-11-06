package com.core.api.controller;

import com.core.api.data.dto.ChangeDto;
import com.core.api.data.dto.commit.CommitMessageDto;
import com.core.api.data.dto.pullrequest.PullRequestDateFilterDto;
import com.core.api.data.dto.pullrequest.PullRequestDto;
import com.core.api.data.dto.pullrequest.PullRequestFilterDto;
import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import com.core.api.data.dto.response.MergeResponseDto;
import com.core.api.service.PullRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pull-request")
@RequiredArgsConstructor
public class PullRequestController {

    private final PullRequestService pullRequestService;

    @GetMapping("/{owner}/{repo}/files/{baseHead}")
    public ResponseEntity<List<ChangeDto>> getChangeFiles(@PathVariable String owner, @PathVariable String repo, @PathVariable String baseHead) {
        List<ChangeDto> changeFiles = pullRequestService.getChangeFiles(owner, repo, baseHead);
        return ResponseEntity.ok(changeFiles);
    }

    @PostMapping
    public ResponseEntity<Void> createPullRequest(@RequestBody PullRequestInputDto pullRequestDto) {
        pullRequestService.createPullRequest(pullRequestDto);
        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/{owner}/{repo}")
    public ResponseEntity<List<PullRequestDto>> getPullRequestList(Pageable pageable, @PathVariable String owner, @PathVariable String repo) {
        List<PullRequestDto> pullRequestList = pullRequestService.getPullRequestList(owner, repo);
        return ResponseEntity.ok(pullRequestList);
    }

    @GetMapping("/{owner}/{repo}/user")
    public ResponseEntity<List<PullRequestDto>> getPullRequestListByFilter(
            @PathVariable String owner,
            @PathVariable String repo,
            @ModelAttribute PullRequestFilterDto filter
    ) {
        List<PullRequestDto> pullRequestList = pullRequestService.getPullRequestListByFilter(
                PullRequestDateFilterDto.of(owner, repo, filter)
        );
        return ResponseEntity.ok(pullRequestList);
    }


    @PutMapping("/{owner}/{repo}/{pullId}/merge")
    public ResponseEntity<MergeResponseDto> mergePullRequest(
            @PathVariable String owner,
            @PathVariable String repo,
            @PathVariable int pullId,
            @RequestBody CommitMessageDto commitMessage
    ) {
        MergeResponseDto message = pullRequestService.mergePullRequest(owner, repo, pullId, commitMessage);
        return ResponseEntity.ok(message);
    }


}
