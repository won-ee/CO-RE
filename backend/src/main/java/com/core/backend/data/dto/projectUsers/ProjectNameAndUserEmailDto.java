package com.core.backend.data.dto.projectUsers;

import java.util.List;

public record ProjectNameAndUserEmailDto(
        String projectName,
        List<String> projectUserEmail
) {
}
