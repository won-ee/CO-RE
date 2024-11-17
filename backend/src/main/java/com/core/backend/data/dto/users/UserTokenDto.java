package com.core.backend.data.dto.users;

import lombok.Builder;

@Builder
public record UserTokenDto(
        String token
) {
}
