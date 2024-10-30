package com.core.backend.data.dto.Users;

import lombok.Getter;

@Getter
public record UserSignDto(
        String email,
        String name,
        String picture,
        String nickname
) {

}
