package com.core.api.controller;


import com.core.api.data.dto.review.CommentDto;
import com.core.api.data.dto.review.CommentSimpleDto;
import com.core.api.data.dto.review.ReviewBaseDto;
import com.core.api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

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
            @RequestBody CommentSimpleDto commentSimpleDto
    ) {
        reviewService.updateCommentToServer(owner, repo, id, commentSimpleDto);
        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/{owner}/{repo}/comment")
    public ResponseEntity<Void> deleteComment(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam Long id
    ) {
        reviewService.deleteCommentToServer(owner, repo, id);
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
}

