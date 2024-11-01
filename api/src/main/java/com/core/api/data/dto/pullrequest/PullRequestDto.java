package com.core.api.data.dto.pullrequest;

import com.core.api.data.dto.ReviewerDto;
import com.core.api.data.dto.commit.CommitDto;
import com.core.api.data.entity.PullRequest;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public class PullRequestDto {
    Long id;
    String title;
    Long pullRequestId;
    String writerId;
    String summary;
    String head;
    String base;
    Boolean mergeStatus;
    Integer priority;
    Boolean afterReview;
    LocalDateTime deadline;
    LocalDateTime createdDate;
    List<CommitDto> commits;
    List<ReviewerDto> reviewers;

    public static PullRequestDto from(PullRequest pullRequest, List<CommitDto> commits, List<ReviewerDto> reviewers) {
        return PullRequestDto.builder()
                .id(pullRequest.getId())
                .title(pullRequest.getTitle())
                .pullRequestId(pullRequest.getPullRequestId())
                .writerId(pullRequest.getWriterId())
                .summary(pullRequest.getSummary())
                .head(pullRequest.getHead())
                .base(pullRequest.getBase())
                .mergeStatus(pullRequest.getMergeStatus())
                .priority(pullRequest.getPriority())
                .afterReview(pullRequest.getAfterReview())
                .deadline(pullRequest.getDeadline())
                .createdDate(pullRequest.getCreatedDate())
                .commits(commits)
                .reviewers(reviewers)
                .build();
    }
}
