package com.core.backend.data.dto.users;

import com.core.backend.data.dto.projects.InfoResponseProjectListDto;
import lombok.Builder;

import java.util.ArrayList;

@Builder
public record UserLoginDto(
        InfoResponseUserDto userInfo,
        ArrayList<InfoResponseProjectListDto> groupList
) {
}
