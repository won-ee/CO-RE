package com.core.api.data.dto.pullrequest;

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
        Integer priority,
        String writerId
) {


}

