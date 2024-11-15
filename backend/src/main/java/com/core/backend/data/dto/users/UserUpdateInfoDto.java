package com.core.backend.data.dto.users;

public record UserUpdateInfoDto(
        String name,
        String nickName,
        String email,
        String gitToken
) {
}
