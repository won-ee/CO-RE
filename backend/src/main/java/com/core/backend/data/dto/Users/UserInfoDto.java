package com.core.backend.data.dto.Users;

import lombok.Builder;

@Builder
public record UserInfoDto(
        String accountId,
        String email,
        String name,
        String picture,
        String nickname
) {

}
