package com.core.api.data.dto.pullrequest;

import com.core.api.data.dto.WriterDto;
import com.core.api.data.dto.commit.CommitDto;
import com.core.api.data.dto.review.CommentDto;
import com.core.api.data.dto.review.CommentGroupDto;
import com.core.api.data.dto.review.ReviewGroupDto;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Review;
import com.core.api.data.entity.Reviewer;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@SuperBuilder
@Getter
public class PullRequestDto extends PullRequestSimpleDto {
    Long id;
    String summary;
    String description;
    Boolean mergeStatus;
    List<CommitDto> commits;
    List<ReviewGroupDto> reviews;
    List<CommentGroupDto> comments;

    public static PullRequestDto from(PullRequest pullRequest, List<CommitDto> commits, List<Reviewer> reviewers) {
        List<WriterDto> reviewerInfo = mapToReviewerInfo(reviewers);
        Integer commentCount = calculateCommentCount(reviewers);
        List<ReviewGroupDto> reviews = convertReview(reviewers);
        List<CommentGroupDto> comments = convertComment(reviewers);
        return PullRequestDto.builder()
                .id(pullRequest.getId())
                .title(pullRequest.getTitle())
                .pullRequestId(pullRequest.getPullRequestId())
                .writer(WriterDto.from(pullRequest.getWriterId(), pullRequest.getWriterImg()))
                .head(pullRequest.getHead())
                .base(pullRequest.getBase())
                .status(pullRequest.getStatus())
                .priority(pullRequest.getPriority())
                .afterReview(pullRequest.getAfterReview())
                .deadline(formatTime(pullRequest.getDeadline()))
                .reviewers(reviewerInfo)
                .commentCount(commentCount)
                .summary(pullRequest.getSummary())
                .description(pullRequest.getDescription())
                .mergeStatus(pullRequest.getMergeStatus())
                .createdDate(formatTime(pullRequest.getCreatedDate()))
                .commits(commits)
                .comments(comments)
                .reviews(reviews)
                .build();
    }

    private static List<CommentGroupDto> convertComment(List<Reviewer> reviewers) {
        return reviewers.stream()
                .filter(reviewer -> reviewer.getContent() != null)
                .map(reviewer -> CommentGroupDto.from(
                        WriterDto.fromReviewers(reviewer),
                        CommentDto.from(reviewer)
                ))
                .toList();
    }

    private static List<ReviewGroupDto> convertReview(List<Reviewer> reviewers) {
        List<Review> allReviews = reviewers.stream()
                .flatMap(reviewer -> reviewer.getReviews()
                        .stream())
                .toList();

        Map<Long, List<Review>> reviewsGroupedByParentId = allReviews.stream()
                .collect(Collectors.groupingBy(review ->
                        review.getParentId() != null ? review.getParentId() : -1L
                ));

        return Optional.ofNullable(reviewsGroupedByParentId.get(-1L))
                .map(parents -> parents.stream()
                        .map(parent -> ReviewGroupDto.from(reviewsGroupedByParentId.getOrDefault(parent.getId(), List.of()), parent))
                        .toList())
                .orElse(List.of());
    }
}
