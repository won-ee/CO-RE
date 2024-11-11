package com.core.backend.data.dto.users;

public record UserGroupsDto(
        String groupKey,
        String groupName,
        String groupUrl,
        String groupAvatarUrl
) {
}
