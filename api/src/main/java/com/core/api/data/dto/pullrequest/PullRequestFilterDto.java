package com.core.api.data.dto.pullrequest;

public record PullRequestFilterDto(
        String writer,
        Integer month,
        Integer year
) {


}
