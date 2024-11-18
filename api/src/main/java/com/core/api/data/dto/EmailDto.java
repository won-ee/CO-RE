package com.core.api.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record EmailDto(
        @JsonProperty("to") List<String> to,
        @JsonProperty("projectName") String projectName,
        @JsonProperty("contents") List<String> contents,
        @JsonProperty("totalCommit") Integer totalCommit,
        @JsonProperty("totalPullRequest") Integer totalPullRequest,
        @JsonProperty("totalReview") Integer totalReview
) {
}