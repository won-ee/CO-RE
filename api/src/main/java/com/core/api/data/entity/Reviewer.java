package com.core.api.data.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Reviewer extends  Base{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewer_id", nullable = false)
    private Long id;

    @Column(name="reviewer_user_id", nullable = false)
    private String reviewerId;

    @Column(name="reviewer_score")
    private int  score;

    @ManyToOne
    @JoinColumn(name="pr_id", nullable = false)
    private PullRequest pullRequest;

}
