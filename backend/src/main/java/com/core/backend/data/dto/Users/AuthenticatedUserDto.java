package com.core.backend.data.dto.Users;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AuthenticatedUserDto {
    private final String id;
    private final String email;

}
