package com.core.api.data.dto.pullrequest;

import java.util.List;

public record PullRequestInputDto(
        String title,
        String body,
        String base,
        String head,
        String owner,
        String repo,
        String description,
        Boolean afterReview,
        String deadline,
        String priority,
        String writerId,
        List<String> reviewers
) {


}

