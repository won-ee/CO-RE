package com.core.backend.data.dto.projects;

import lombok.Builder;

@Builder
public record ProjectGitSetDto(
        String template,
        int score
) {
}
