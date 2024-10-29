package com.core.api.data.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pr")
public class PullRequest extends  Base{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pr_id", nullable = false)
    private Long id;

    @Column(name = "pr_github_id", nullable = false)
    private Long pullRequestId;

    @Column(name="pr_repository_id",nullable = false)
    private Long repositoryId;

    @Column(name="pr_writer_id",nullable = false)
    private int writerId;

    @Column(name="pr_summary",length = 2000)
    private String summary;

    @Column(name="pr_description",length = 2000)
    private String description;

    @Column(name="pr_merge_status",nullable = false)
    @ColumnDefault("false")
    private Boolean mergeStatus;

    @Column(name="pr_priority")
    private Integer priority;

    @Column(name="pr_after_review",nullable = false)
    @ColumnDefault("false")
    private Boolean afterReview;

    @Column(name="pr_deadline")
    private LocalDateTime deadline;

    @OneToMany(mappedBy = "pullRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commit> commits = new ArrayList<>();

    @OneToMany(mappedBy = "pullRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reviewer> reviewers = new ArrayList<>();

    @OneToMany(mappedBy = "pullRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

}
