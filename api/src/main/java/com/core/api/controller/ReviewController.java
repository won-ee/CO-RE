package com.core.api.controller;


import com.core.api.data.dto.review.CommentDto;
import com.core.api.data.dto.review.CommentSimpleDto;
import com.core.api.data.dto.review.ReviewBaseDto;
import com.core.api.data.dto.review.ReviewDto;
import com.core.api.enums.EventEnum;
import com.core.api.service.ReviewService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ObjectMapper objectMapper;

    @PostMapping("/{owner}/{repo}/{pullId}/comment")
    public ResponseEntity<Void> createComment(
            @PathVariable String owner,
            @PathVariable String repo,
            @PathVariable int pullId,
            @RequestBody CommentDto comment
    ) {
        reviewService.createComment(owner, repo, pullId, comment);
        return ResponseEntity.ok()
                .build();
    }

    @PatchMapping("/{owner}/{repo}/comment")
    public ResponseEntity<Void> updateComment(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam Long id,
            @RequestBody CommentDto commentDto
    ) {
        reviewService.updateComment(id, commentDto);
        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/{owner}/{repo}/comment")
    public ResponseEntity<Void> deleteComment(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam Long id
    ) {
        reviewService.deleteComment(id);
        return ResponseEntity.ok()
                .build();
    }


    @PostMapping("/{owner}/{repo}/{pullId}")
    public ResponseEntity<Void> createReview(
            @PathVariable String owner,
            @PathVariable String repo,
            @PathVariable int pullId,
            @RequestBody ReviewBaseDto reviewBaseDto
    ) {
        reviewService.createReviewToServer(owner, repo, pullId, reviewBaseDto);
        return ResponseEntity.ok()
                .build();
    }

    @PatchMapping("/{owner}/{repo}")
    public ResponseEntity<Void> updateReview(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam Long id,
            @RequestBody CommentSimpleDto commentSimpleDto
    ) {
        reviewService.updateReviewToServer(owner, repo, id, commentSimpleDto);
        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/{owner}/{repo}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam Long id
    ) {
        reviewService.deleteReviewToServer(owner, repo, id);
        return ResponseEntity.ok()
                .build();
    }


    @PostMapping(value = "/webhook", consumes = "application/x-www-form-urlencoded")
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

