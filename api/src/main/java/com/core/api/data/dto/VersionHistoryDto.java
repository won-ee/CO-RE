package com.core.api.data.dto;

import com.core.api.data.dto.github.CommitServerDto;
import com.core.api.data.entity.PullRequest;

import java.util.List;

public record VersionHistoryDto(
        Integer prId,
        String title,
        String content,
        String base,
        String head,
        List<CommitServerDto> commits
) {

    public static VersionHistoryDto from(PullRequest pullRequest, List<CommitServerDto> commits) {
        return new VersionHistoryDto(
                pullRequest.getPullRequestId(),
                pullRequest.getTitle(),
                pullRequest.getDescription(),
                pullRequest.getBase(),
                pullRequest.getHead(),
                commits
        );
    }
}
