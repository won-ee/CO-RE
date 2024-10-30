package com.core.api.data.dto.pullrequest;

import com.core.api.data.dto.CommitDto;
import com.core.api.data.dto.ReviewerDto;
import com.core.api.data.entity.PullRequest;

import java.time.LocalDateTime;
import java.util.List;

public record PullRequestDto(
        Long id,
        String title,
        Long pullRequestId,
        int writerId,
        String summary,
        String head,
        String base,
        Boolean mergeStatus,
        Integer priority,
        Boolean afterReview,
        LocalDateTime deadline,
        List<CommitDto> commits,
        List<ReviewerDto> reviewers
) {

    public static PullRequestDto from(PullRequest pullRequest, List<CommitDto> commits, List<ReviewerDto> reviewers) {
        return new PullRequestDto(
                pullRequest.getId(),
                pullRequest.getTitle(),
                pullRequest.getPullRequestId(),
                pullRequest.getWriterId(),
                pullRequest.getSummary(),
                pullRequest.getHead(),
                pullRequest.getBase(),
                pullRequest.getMergeStatus(),
                pullRequest.getPriority(),
                pullRequest.getAfterReview(),
                pullRequest.getDeadline(),
                commits,
                reviewers
        );
    }

}
