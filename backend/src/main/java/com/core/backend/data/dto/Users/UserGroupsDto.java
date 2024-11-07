package com.core.backend.data.dto.Users;

public record UserGroupsDto(
        String groupKey,
        String groupName,
        String groupUrl,
        String groupAvatarUrl
) {
}
