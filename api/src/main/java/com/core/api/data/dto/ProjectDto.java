package com.core.api.data.dto;

import java.util.List;

public record ProjectDto(
        String projectName,
        List<String> projectUserEmail
) {
}
