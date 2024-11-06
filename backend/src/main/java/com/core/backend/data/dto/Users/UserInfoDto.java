package com.core.backend.data.dto.Users;

public record UserInfoDto(
        String account_id,
        String email,
        String name,
        String picture,
        String nickname
) {

}
