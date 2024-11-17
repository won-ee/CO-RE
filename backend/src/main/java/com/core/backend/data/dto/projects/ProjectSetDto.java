package com.core.backend.data.dto.projects;

import lombok.Builder;

@Builder
public record ProjectSetDto(
        int targetScore,
        int reviewerCount,
        String template
) {
}
