package com.core.api.controller;


import com.core.api.data.dto.review.ReviewInputDto;
import com.core.api.data.dto.review.ReviewSimpleDto;
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
            @RequestBody ReviewSimpleDto reviewSimpleDto
    ) {
        reviewService.createCommentToServer(owner, repo, pullId, reviewSimpleDto);
        return ResponseEntity.ok()
                .build();
    }

    @PatchMapping("/{owner}/{repo}/comment")
    public ResponseEntity<Void> updateComment(
            @PathVariable String owner,
            @PathVariable String repo,
            @RequestParam Long id,
            @RequestBody ReviewSimpleDto reviewSimpleDto
    ) {
        reviewService.updateCommentToServer(owner, repo, id, reviewSimpleDto);
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
}

