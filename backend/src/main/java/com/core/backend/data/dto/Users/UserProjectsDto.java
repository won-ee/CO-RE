package com.core.backend.data.dto.Users;

public record UserProjectsDto(
        String projectId,
        String ProjectName,
        String projectUrl,
        String projectAvatarUrl
) {
}
