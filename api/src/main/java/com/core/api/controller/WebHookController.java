package com.core.api.controller;

import com.core.api.data.dto.github.PullRequestServerDto;
import com.core.api.data.dto.review.ReviewDto;
import com.core.api.enums.EventEnum;
import com.core.api.service.PullRequestService;
import com.core.api.service.ReviewService;
import com.core.api.service.VersionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/webhook")
@RequiredArgsConstructor
public class WebHookController {

    private final ReviewService reviewService;
    private final PullRequestService pullRequestService;
    private final VersionService versionService;
    private final ObjectMapper objectMapper;

    @PostMapping(value = "/github/pull-request", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<String> handlePullRequestWebhook(
            @RequestHeader("X-GitHub-Event") String event,
            @RequestHeader("X-GitHub-Delivery") String deliveryId,
            @RequestHeader("X-GitHub-Hook-ID") String hookId,
            @RequestParam String payload) throws JsonProcessingException {

        Map<?, ?> data = objectMapper.readValue(payload, Map.class);

        PullRequestServerDto pullRequest = PullRequestServerDto.from(data);
        String action = (String) data.get("action");
        EventEnum eventEnum = EventEnum.valueOf(action.toUpperCase());

        switch (eventEnum) {
            case EDITED:
                pullRequestService.updatePullRequest(pullRequest);
                break;
            case CLOSED:
                if (Boolean.FALSE.equals(pullRequest.getMergeStatus())) {
                    return new ResponseEntity<>(HttpStatus.OK);
                }
                pullRequestService.closedPullRequest(pullRequest);
                versionService.createVersion(pullRequest);
                break;
            default:
                return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/github/review", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<Void> handleReviewWebhook(
            @RequestHeader("X-GitHub-Event") String event,
            @RequestHeader("X-GitHub-Delivery") String deliveryId,
            @RequestHeader("X-GitHub-Hook-ID") String hookId,
            @RequestParam String payload) throws JsonProcessingException {


        Map<?, ?> data = objectMapper.readValue(payload, Map.class);
        ReviewDto review = ReviewDto.fromApiResponse(data);

        String action = (String) data.get("action");
        EventEnum eventEnum = EventEnum.valueOf(action.toUpperCase());
        switch (eventEnum) {
            case CREATED, SUBMITTED:
                reviewService.saveReview(review);
                break;
            case EDITED:
                reviewService.updateReview(review);
                break;
            case DELETED:
                reviewService.deleteReview(review.getId());
                break;
            default:
                return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
