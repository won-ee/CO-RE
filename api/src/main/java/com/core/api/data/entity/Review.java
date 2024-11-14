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
    private Long parentId;

    @Column(name = "review_line")
    private Integer line;

    @Column(name = "review_path")
    private String path;

    @Column(name = "review_content", length = 2000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    private Reviewer reviewer;

    public static Review from(ReviewDto dto, Reviewer reviewer) {
        Review review = new Review();
        review.id = dto.getId();
        review.prId = dto.getPrId();
        review.parentId = dto.getParentId();
        review.line = dto.getLine();
        review.content = dto.getContent();
        review.path = dto.getPath();
        review.reviewer = reviewer;
        return review;
    }

    public void updateContent(ReviewDto dto) {
        this.content = dto.getContent();
    }

}
