package com.core.backend.data.dto.users;

import lombok.Builder;

@Builder
public record InfoResponseUserDto(
        Long id,
        String accountId,
        String email,
        String name,
        String nickName,
        String image
) {
}
