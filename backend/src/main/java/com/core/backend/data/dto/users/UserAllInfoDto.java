package com.core.backend.data.dto.users;

import com.core.backend.data.entity.Users;
import lombok.Builder;

@Builder
public record UserAllInfoDto(
        Long id,
        String name,
        String nickName,
        String image,
        String email,
        String gitToken
) {
    public static UserAllInfoDto toUserAllInfoDto(Users user) {
        return UserAllInfoDto.builder()
                .id(user.getId())
                .name(user.getName())
                .nickName(user.getNickname())
                .image(user.getProfile())
                .email(user.getEmail())
                .gitToken(user.getGitToken())
                .build();
    }
}
