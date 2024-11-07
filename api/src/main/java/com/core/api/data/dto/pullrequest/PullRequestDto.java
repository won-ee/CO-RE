package com.core.api.data.dto.pullrequest;

import com.core.api.data.dto.ReviewerDto;
import com.core.api.data.dto.commit.CommitDto;
import com.core.api.data.entity.PullRequest;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Builder
@Getter
public class PullRequestDto {
    Long id;
    String title;
    Integer pullRequestId;
    String writerId;
    String writerImg;
    String summary;
    String description;
    String head;
    String base;
    Boolean mergeStatus;
    Integer priority;
    Boolean afterReview;
    String deadline;
    LocalDateTime createdDate;
    List<CommitDto> commits;
    List<ReviewerDto> reviewers;

    public static PullRequestDto from(PullRequest pullRequest, List<CommitDto> commits, List<ReviewerDto> reviewers) {

        //TODO : 유저 정보에서 writerImg 받아오기
        return PullRequestDto.builder()
                .writerImg("https://i.namu.wiki/i/-eAh3vYcyIrcsJuRa27seExMXV5xAz6q58Tjspbgyv99by_od90qDZVqwZRkpx4eyh43u1P8aKCh1XL652gd0kkfPyYac0oiGWKItHx0ZhODdD3QqZsRmdfwaeYslKrnSak_76X4OZ6FndPEHJUd9g.webp")
                .id(pullRequest.getId())
                .title(pullRequest.getTitle())
                .pullRequestId(pullRequest.getPullRequestId())
                .writerId(pullRequest.getWriterId())
                .summary(pullRequest.getSummary())
                .head(pullRequest.getHead())
                .description(pullRequest.getDescription())
                .base(pullRequest.getBase())
                .mergeStatus(pullRequest.getMergeStatus())
                .priority(pullRequest.getPriority())
                .afterReview(pullRequest.getAfterReview())
                .deadline(pullRequest.getDeadline()
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .createdDate(pullRequest.getCreatedDate())
                .commits(commits)
                .reviewers(reviewers)
                .build();
    }
}
