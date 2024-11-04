package com.core.api.controller;

import com.core.api.data.dto.review.ReviewDto;
import com.core.api.service.ReviewService;
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
    private final ObjectMapper objectMapper;

    @PostMapping(value = "/github/review", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<Void> handleReviewWebhook(
            @RequestHeader("X-GitHub-Event") String event,
            @RequestHeader("X-GitHub-Delivery") String deliveryId,
            @RequestHeader("X-GitHub-Hook-ID") String hookId,
            @RequestParam String payload) throws JsonProcessingException {


        Map<?, ?> data = objectMapper.readValue(payload, Map.class);
        ReviewDto review = ReviewDto.from(data);

        String action = (String) data.get("action");

        switch (action) {
            case "created", "submitted":
                reviewService.saveReview(review);
                break;
            case "edited":
                reviewService.updateReview(review);
                break;
            case "deleted":
                reviewService.deleteReview(review.getId());
                break;
            default:
                throw new IllegalArgumentException("Unexpected action: " + action);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
