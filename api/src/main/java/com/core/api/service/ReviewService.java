package com.core.api.service;


import com.core.api.client.BackendClient;
import com.core.api.client.GitHubClient;
import com.core.api.data.dto.ProjectInfoDto;
import com.core.api.data.dto.review.CommentDto;
import com.core.api.data.dto.review.CommentSimpleDto;
import com.core.api.data.dto.review.ReviewBaseDto;
import com.core.api.data.dto.review.ReviewDto;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Review;
import com.core.api.data.entity.Reviewer;
import com.core.api.data.repository.PullRequestRepository;
import com.core.api.data.repository.ReviewRepository;
import com.core.api.data.repository.ReviewerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final GitHubClient gitHubClient;
    private final BackendClient backendClient;
    private final ReviewRepository reviewRepository;
    private final PullRequestRepository pullRequestRepository;
    private final ReviewerRepository reviewerRepository;

    @Transactional
    public void createComment(String owner, String repo, int pullId, CommentDto comment) {

        String userId = getUser();
        PullRequest pullRequest = pullRequestRepository.findByOwnerAndRepoAndPullRequestId(owner, repo, pullId)
                .orElseThrow(() -> new RuntimeException("PullRequest not found for id: " + pullId));
        List<Reviewer> reviewers = pullRequest.getReviewers();
        Reviewer reviewer = findReviewer(reviewers, userId);

        int totalScore = calculateTotalScore(reviewers, comment.score());
        int totalReviewerCount = calculateReviewerCount(reviewers) + 1;

        ProjectInfoDto projectInfo = backendClient.getProjectInfo(owner, repo);

        String status = determineStatus(totalScore, totalReviewerCount, projectInfo.score(), reviewers.size());

        pullRequest.updateStatus(status);
        reviewer.updateReviewer(comment);
        gitHubClient.createComment(owner, repo, pullId, CommentSimpleDto.from(comment));
    }

    private Reviewer findReviewer(List<Reviewer> reviewers, String userId) {
        return reviewers.stream()
                .filter(reviewer -> reviewer.getReviewerId()
                        .equals(userId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Reviewer not found for user: " + userId));
    }

    private int calculateTotalScore(List<Reviewer> reviewers, int newScore) {
        return reviewers.stream()
                .filter(reviewer -> reviewer != null && reviewer.getScore() != null)
                .mapToInt(Reviewer::getScore)
                .sum() + newScore;
    }

    private int calculateReviewerCount(List<Reviewer> reviewers) {
        return (int) reviewers.stream()
                .filter(reviewer -> reviewer.getContent() != null)
                .count();
    }

    private String determineStatus(int totalScore, int reviewerCount, int requiredScore, int totalReviewers) {
        Map<Boolean, String> statusMap = Map.of(
                totalScore >= requiredScore, "approve",
                totalScore < requiredScore, "rejected"
        );

        return (reviewerCount == totalReviewers)
                ? statusMap.get(true)
                : "processing";
    }

    public void updateComment(Long commentId, CommentDto commentDto) {
        Reviewer reviewer = reviewerRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Reviewer not found with comment id: " + commentId));
        reviewer.updateReviewer(commentDto);
    }

    public void deleteComment(Long commentId) {
        reviewerRepository.deleteById(commentId);
    }

    public void updateCommentToServer(String owner, String repo, Long commentId, CommentSimpleDto commentSimpleDto) {
        gitHubClient.updateComment(owner, repo, commentId, commentSimpleDto);
    }

    public void deleteCommentToServer(String owner, String repo, Long commentId) {
        gitHubClient.deleteComment(owner, repo, commentId);
    }

    public void createReviewToServer(String owner, String repo, int pullId, ReviewBaseDto reviewBaseDto) {
        gitHubClient.createReview(owner, repo, pullId, reviewBaseDto);
    }

    public void updateReviewToServer(String owner, String repo, Long reviewId, CommentSimpleDto commentSimpleDto) {
        gitHubClient.updateReview(owner, repo, reviewId, commentSimpleDto);
    }

    public void deleteReviewToServer(String owner, String repo, Long reviewId) {
        gitHubClient.deleteReview(owner, repo, reviewId);
    }

    @Transactional
    public void saveReview(ReviewDto reviewDto) {
        PullRequest pr = pullRequestRepository.findByOwnerAndRepoAndPullRequestId(reviewDto.getOwner(), reviewDto.getRepo(), reviewDto.getPrId())
                .orElseThrow(() -> new RuntimeException("Reviewer not found with id: " + reviewDto.getWriterId()));
        List<Reviewer> reviewers = pr.getReviewers();

        Reviewer reviewer = reviewers.stream()
                .filter(re -> re.getReviewerId()
                        .equals(reviewDto.getWriterId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Reviewer not found with id: " + reviewDto.getWriterId()));

        Review review = Review.from(reviewDto, reviewer);
        reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public void updateReview(ReviewDto reviewDto) {
        Review review = reviewRepository.findById(reviewDto.getId())
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewDto.getId()));

        review.updateContent(reviewDto);
        reviewRepository.save(review);
    }

    private String getUser() {
        Map<?, ?> user = gitHubClient.getUser();
        return user.get("login")
                .toString();
    }
}
