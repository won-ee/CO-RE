package com.core.api.data.entity;


import com.core.api.data.dto.review.ReviewDto;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Review extends Base {

    @Id
    @Column(name = "review_id", nullable = false)
    private Long id;

    @Column(name = "review_pull_request_id", nullable = false)
    private Integer prId;

    @Column(name = "review_parent_id")
    private Integer parentId;

    @Column(name = "review_is_Issue", nullable = false)
    private Boolean isIssue;

    @Column(name = "review_start_line")
    private Integer startLine;

    @Column(name = "review_end_line")
    private Integer endLine;

    @Column(name = "review_content", length = 2000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "commit_id", nullable = false)
    private Commit commit;

    @ManyToOne
    @JoinColumn(name = "reviewer_user_id", nullable = false)
    private Reviewer reviewer;

    public static Review from(ReviewDto dto) {
        Review review = new Review();
        review.id = dto.id();
        review.parentId = dto.parentId();
        review.startLine = dto.startLine();
        review.isIssue = dto.isIssue();
        review.endLine = dto.endLine();
        review.content = dto.content();
        return review;
    }

    public void updateContent(ReviewDto dto) {
        this.content = dto.content();
    }

}
