package com.core.api.data.dto.pullrequest;

import java.time.LocalDateTime;

public record PullRequestInputDto(
        String title,
        String body,
        String base,
        String head,
        String owner,
        String repo,
        String description,
        Boolean afterReview,
        LocalDateTime deadline,
        Integer priority,
        String writerId
) {


}

