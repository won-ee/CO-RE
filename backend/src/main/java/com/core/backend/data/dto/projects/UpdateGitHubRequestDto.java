package com.core.backend.data.dto.projects;

import lombok.Builder;

@Builder
public record UpdateGitHubRequestDto(
        Long projectId,
        String githubOwner,
        String githubRepository
) {
}
