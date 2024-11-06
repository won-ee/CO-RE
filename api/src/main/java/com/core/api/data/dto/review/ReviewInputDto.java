package com.core.api.data.dto.review;

import java.util.List;

public record ReviewInputDto(
        String commitId,
        String body,
        String event,
        List<ReviewCommentDto> comments
) {
}