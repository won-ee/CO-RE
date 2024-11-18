package com.core.api.data.dto.github;

import com.core.api.data.dto.review.ReviewCommentDto;

import java.util.List;

public record ReviewGithubDto(
        String body,
        String event,
        List<ReviewCommentDto> comments
) {
}
