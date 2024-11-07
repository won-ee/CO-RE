package com.core.backend.data.dto.Users;

import java.util.ArrayList;

public record UserLoginDto(
        UserInfoDto userInfo,
        ArrayList<UserGroupsDto> groupList
) {
}
