package com.core.api.data.dto.review;

public record ReviewCommentDto(
        String body,
        String path,
        String commitId,
        Integer startLine,
        Integer endLine
) {
}
