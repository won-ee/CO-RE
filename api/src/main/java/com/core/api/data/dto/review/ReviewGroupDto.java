package com.core.api.data.dto.review;

import com.core.api.data.dto.WriterDto;
import com.core.api.data.entity.Review;
import com.core.api.data.entity.Reviewer;

import java.util.List;

public record ReviewGroupDto(
        WriterDto writer,
        String content,
        List<ReviewCommentDto> reviews
) {
    public static ReviewGroupDto from(List<Review> child, Review parent) {
        Reviewer reviewer = parent.getReviewer();
        WriterDto writer = WriterDto.from(reviewer.getReviewerId(), "");
        List<ReviewCommentDto> reviews = child.stream()
                .map(ReviewCommentDto::from)
                .toList();
        return new ReviewGroupDto(writer, parent.getContent(), reviews);
    }

}
