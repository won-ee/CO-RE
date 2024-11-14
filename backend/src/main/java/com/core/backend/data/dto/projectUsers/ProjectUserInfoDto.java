package com.core.backend.data.dto.projectUsers;

public record ProjectUserInfoDto(
        Long userId,
        Long projectUserId,
        Long projectId,
        String userUrl,
        String userName) {
}
