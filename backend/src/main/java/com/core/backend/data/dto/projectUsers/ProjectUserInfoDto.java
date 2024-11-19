package com.core.backend.data.dto.projectUsers;

public record ProjectUserInfoDto(
        Long userId,
        Long projectUserId,
        Long projectId,
        String userUrl,
        String userName,
        String userNickName,
        String userEmail,
        String userGitToken,
        String userGitName) {
}
