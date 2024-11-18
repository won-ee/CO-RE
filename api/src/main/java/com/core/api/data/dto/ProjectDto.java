package com.core.api.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ProjectDto(
        @JsonProperty("projectName") String projectName,
        @JsonProperty("projectUserEmail") List<String> projectUserEmail
) {
}
