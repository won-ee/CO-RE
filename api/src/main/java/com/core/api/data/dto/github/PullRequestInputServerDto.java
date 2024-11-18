package com.core.api.data.dto.github;

import com.core.api.data.dto.pullrequest.PullRequestInputDto;

public record PullRequestInputServerDto(
        String title,
        String body,
        String head,
        String base
) {
    public static PullRequestInputServerDto from(PullRequestInputDto pullRequestInputDto) {
        return new PullRequestInputServerDto(
                pullRequestInputDto.title(),
                pullRequestInputDto.description(),
                pullRequestInputDto.head(),
                pullRequestInputDto.base()
        );
    }
}
