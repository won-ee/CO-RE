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

    public void createCommentToServer(String owner, String repo, int pullId, ReviewSimpleDto reviewSimpleDto) {
        gitHubClient.createComment(owner, repo, pullId, reviewSimpleDto);
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

    public void saveReview(ReviewDto reviewDto) {
        Review review = Review.from(reviewDto);
        reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public void updateReview(ReviewDto reviewDto) {
        Review review = reviewRepository.findById(reviewDto.id())
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewDto.id()));

        review.updateContent(reviewDto);
        reviewRepository.save(review);
    }
}
