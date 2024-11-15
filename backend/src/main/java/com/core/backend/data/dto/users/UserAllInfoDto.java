package com.core.backend.data.dto.users;

public record UserAllInfoDto(
        Long id,
        String name,
        String nickName,
        String image,
        String email,
        String gitToken,
        Boolean gitCheck
) {

}
