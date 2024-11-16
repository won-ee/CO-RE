package com.core.api.data.entity;

import com.core.api.data.dto.review.CommentDto;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Reviewer extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewer_id", nullable = false)
    private Long id;

    @Column(name = "reviewer_user_id", nullable = false)
    private String reviewerId;

    @Column(name = "reviewer_user_img")
    private String reviewerImg;

    @Column(name = "reviewer_score")
    private Integer score;

    @Column(name = "reviewer_content")
    private String content;

    @Column(name = "reviewer_status", nullable = false)
    private Boolean status;

    @OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "pr_id", nullable = false)
    private PullRequest pullRequest;


    public static Reviewer createReviewer(String reviewerId, PullRequest pullRequest, String reviewerImg) {
        Reviewer reviewer = new Reviewer();
        reviewer.reviewerId = reviewerId;
        reviewer.pullRequest = pullRequest;
        reviewer.reviewerImg = reviewerImg;
        reviewer.status = false;
        return reviewer;
    }


    public void updateReviewer(CommentDto comment) {
        this.score = comment.score();
        this.content = comment.content();
        this.status = comment.status();
    }


}
