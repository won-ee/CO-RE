package com.core.api.data.dto;

import com.core.api.data.entity.Reviewer;

public record ReviewerDto(
        Long id,
        String reviewerId,
        int score
) {
    public static ReviewerDto from(Reviewer reviewer) {
        return new ReviewerDto(
                reviewer.getId(),
                reviewer.getReviewerId(),
                reviewer.getScore()
        );
    }
}
