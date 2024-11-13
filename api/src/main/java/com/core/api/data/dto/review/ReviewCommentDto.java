package com.core.api.data.dto.review;

import com.core.api.data.entity.Review;
import com.fasterxml.jackson.annotation.JsonAlias;

public record ReviewCommentDto(
        String body,
        String path,

        @JsonAlias({"endLine", "line"})
        Integer endLine,

        @JsonAlias({"startLine", "start_line"})
        Integer startLine
) {

    public static ReviewCommentDto from(Review review) {
        return new ReviewCommentDto(
                review.getContent(),
                review.getPath(),
                review.getEndLine(),
                review.getStartLine()
        );
    }

}
