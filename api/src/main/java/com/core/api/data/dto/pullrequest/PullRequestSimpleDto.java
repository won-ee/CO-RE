package com.core.api.data.dto.pullrequest;

import com.core.api.data.dto.WriterDto;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Reviewer;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Getter
@SuperBuilder
public class PullRequestSimpleDto {
    Integer pullRequestId;
    String title;
    WriterDto writer;
    String head;
    String base;
    String status;
    String priority;
    Boolean afterReview;
    String createdDate;
    String deadline;
    Integer commentCount;
    List<WriterDto> reviewers;

    public static PullRequestSimpleDto from(PullRequest pullRequest, List<Reviewer> reviewers) {
        WriterDto writer = WriterDto.from(pullRequest.getWriterId(), "");
        List<WriterDto> reviewerInfo = mapToReviewerInfo(reviewers);
        Integer commentCount = calculateCommentCount(reviewers);


        return PullRequestSimpleDto.builder()
                .pullRequestId(pullRequest.getPullRequestId())
                .title(pullRequest.getTitle())
                .writer(writer)
                .head(pullRequest.getHead())
                .base(pullRequest.getBase())
                .createdDate(formatTime(pullRequest.getCreatedDate()))
                .status(pullRequest.getStatus())
                .priority(pullRequest.getPriority())
                .afterReview(pullRequest.getAfterReview())
                .deadline(formatTime(pullRequest.getDeadline()))
                .commentCount(commentCount)
                .reviewers(reviewerInfo)
                .build();
    }

    protected static List<WriterDto> mapToReviewerInfo(List<Reviewer> reviewers) {
        return reviewers.stream()
                .map(WriterDto::fromReviewers)
                .toList();
    }

    protected static Integer calculateCommentCount(List<Reviewer> reviewers) {
        return (int) reviewers.stream()
                .map(Reviewer::getContent)
                .filter(Objects::nonNull)
                .count();
    }

    protected static String formatTime(LocalDateTime time) {
        return time != null ? time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null;
    }
}
