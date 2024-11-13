package com.core.api.service;


import com.core.api.client.GitHubClient;
import com.core.api.data.dto.review.ReviewDto;
import com.core.api.data.dto.review.ReviewInputDto;
import com.core.api.data.dto.review.ReviewSimpleDto;
import com.core.api.data.entity.Review;
import com.core.api.data.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final GitHubClient gitHubClient;
    private final ReviewRepository reviewRepository;
    private final PullRequestRepository pullRequestRepository;

    @Transactional
    public void createComment(String owner, String repo, int pullId, CommentDto comment) {
        // TODO: 토큰으로 작성자 확인
        String userId = "JEM1224";
        PullRequest pullRequest = pullRequestRepository.findByOwnerAndRepoAndPullRequestId(owner, repo, pullId)
                .orElseThrow(() -> new RuntimeException("PullRequest not found for id: " + pullId));

        Reviewer reviewer = pullRequest.getReviewers()
                .stream()
                .filter(r -> r.getReviewerId()
                        .equals(userId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Reviewer not found for user: " + userId));
        reviewer.updateReviewer(comment);
        gitHubClient.createComment(owner, repo, pullId, CommentSimpleDto.from(comment));
    }

    public void updateCommentToServer(String owner, String repo, Long commentId, ReviewSimpleDto reviewSimpleDto) {
        gitHubClient.updateComment(owner, repo, commentId, reviewSimpleDto);
    }

    public void deleteCommentToServer(String owner, String repo, Long commentId) {
        gitHubClient.deleteComment(owner, repo, commentId);
    }

    public void createReviewToServer(String owner, String repo, int pullId, ReviewInputDto reviewInputDto) {
        gitHubClient.createReview(owner, repo, pullId, reviewInputDto);
    }

    public void updateReviewToServer(String owner, String repo, Long reviewId, ReviewSimpleDto reviewSimpleDto) {
        gitHubClient.updateReview(owner, repo, reviewId, reviewSimpleDto);
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
}
