package com.core.api.data.dto.review;

import com.core.api.data.entity.Review;

public record ReviewCommentDto(
        String body,
        String path,
        Integer line

) {

    public static ReviewCommentDto from(Review review) {
        return new ReviewCommentDto(
                review.getContent(),
                review.getPath(),
                review.getLine()
        );
    }

}
