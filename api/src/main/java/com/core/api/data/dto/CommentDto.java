package com.core.api.data.dto;


import com.core.api.data.entity.Review;

public record CommentDto(
        Long id,
        Integer startLine,
        Integer endLine,
        String content
) {
    public static CommentDto from(Review review) {
        return new CommentDto(
                review.getId(),
                review.getStartLine(),
                review.getEndLine(),
                review.getContent()
        );
    }
}
