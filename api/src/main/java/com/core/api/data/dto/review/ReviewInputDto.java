package com.core.api.data.dto.review;

import lombok.Getter;

import java.util.List;

@Getter
public record ReviewInputDto(
        String commitId,
        String body,
        String event,
        List<ReviewCommentDto> comments
) {
}