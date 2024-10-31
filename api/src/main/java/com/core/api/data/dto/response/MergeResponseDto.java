package com.core.api.data.dto.response;

public record MergeResponseDto(
        String sha,
        String merged,
        String message
) {
}
