package com.core.api.controller;

import com.core.api.data.dto.commit.CommitMessageDto;
import com.core.api.data.dto.github.PullRequestServerDto;
import com.core.api.data.dto.pullrequest.*;
import com.core.api.data.dto.response.MergeResponseDto;
import com.core.api.enums.EventEnum;
import com.core.api.service.PullRequestService;
import com.core.api.service.VersionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pull-request")
@RequiredArgsConstructor
public class PullRequestController {

    private final PullRequestService pullRequestService;
    private final ObjectMapper objectMapper;
    private final VersionService versionService;

    @PostMapping
    public ResponseEntity<Void> createPullRequest(@RequestBody PullRequestInputDto pullRequestDto) {
        pullRequestService.createPullRequest(pullRequestDto);
        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/{owner}/{repo}")
    public ResponseEntity<List<PullRequestSimpleDto>> getPullRequestList(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam String state
    ) {

        List<PullRequestSimpleDto> pullRequestList = switch (state) {
            case "sent" -> pullRequestService.getPullRequestListByWriter(owner, repo);
            case "received" -> pullRequestService.getPullRequestListByReviewer(owner, repo);
            default -> List.of();
        };

        return ResponseEntity.ok(pullRequestList);
    }

    @GetMapping("/{owner}/{repo}/{pullId}")
    public ResponseEntity<PullRequestDto> getPullRequest(@PathVariable String owner, @PathVariable String repo, @PathVariable Integer pullId) {
        PullRequestDto pullRequest = pullRequestService.getPullRequest(owner, repo, pullId);
        return ResponseEntity.ok(pullRequest);
    }

    @GetMapping("/{owner}/{repo}/user")
    public ResponseEntity<List<PullRequestSimpleDto>> getPullRequestListByFilter(
            @PathVariable String owner,
            @PathVariable String repo,
            @ModelAttribute PullRequestFilterDto filter
    ) {
        List<PullRequestSimpleDto> pullRequestList = pullRequestService.getPullRequestListByFilter(
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

    @PostMapping(value = "/webhook", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<String> handlePullRequestWebhook(
            @RequestHeader("X-GitHub-Event") String event,
            @RequestHeader("X-GitHub-Delivery") String deliveryId,
            @RequestHeader("X-GitHub-Hook-ID") String hookId,
            @RequestParam String payload) throws JsonProcessingException {

        Map<?, ?> data = objectMapper.readValue(payload, Map.class);

        PullRequestServerDto pullRequest = PullRequestServerDto.from(data);
        String action = (String) data.get("action");
        EventEnum eventEnum = EventEnum.valueOf(action.toUpperCase());

        return switch (eventEnum) {
            case OPENED -> {
                pullRequestService.openedPullRequest(pullRequest);
                yield new ResponseEntity<>(HttpStatus.OK);
            }
            case CLOSED -> {
                if (Boolean.FALSE.equals(pullRequest.getMergeStatus())) {
                    yield new ResponseEntity<>(HttpStatus.OK);
                }
                pullRequestService.closedPullRequest(pullRequest);
                versionService.createVersion(pullRequest);
                yield new ResponseEntity<>(HttpStatus.OK);
            }
            default -> new ResponseEntity<>(HttpStatus.OK);
        };
    }


}
