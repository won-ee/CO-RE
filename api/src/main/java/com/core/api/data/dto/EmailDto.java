package com.core.api.data.dto;

import java.util.List;

public record EmailDto(
        List<String> to,
        String projectName,
        List<String> contents,
        Integer totalCommit,
        Integer totalPullRequest,
        Integer totalReview
) {

}
