package com.core.api.data.entity;

import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "pr")
public class PullRequest extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pr_id", nullable = false)
    private Long id;

    @Column(name = "pr_title", nullable = false, length = 100)
    private String title;

    @Column(name = "pr_github_id")
    private Long pullRequestId;

    @Column(name = "pr_owner", nullable = false)
    private String owner;

    @Column(name = "pr_repo", nullable = false)
    private String repo;

    @Column(name = "pr_writer_id", nullable = false)
    private int writerId;

    @Column(name = "pr_summary", length = 2000)
    private String summary;

    @Column(name = "pr_head", nullable = false, length = 100)
    private String head;

    @Column(name = "pr_base", nullable = false, length = 100)
    private String base;

    @Column(name = "pr_description", length = 2000)
    private String description;

    @Column(name = "pr_merge_status", nullable = false)
    @ColumnDefault("false")
    private Boolean mergeStatus;

    @Column(name = "pr_priority")
    private Integer priority;

    @Column(name = "pr_after_review", nullable = false)
    @ColumnDefault("false")
    private Boolean afterReview;

    @Column(name = "pr_deadline")
    private LocalDateTime deadline;

    @OneToMany(mappedBy = "pullRequest", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commit> commits = new ArrayList<>();

    @OneToMany(mappedBy = "pullRequest", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reviewer> reviewers = new ArrayList<>();

    @OneToMany(mappedBy = "pullRequest", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    public static PullRequest from(PullRequestInputDto pullRequestInputDto) {
        PullRequest pullRequest = new PullRequest();
        pullRequest.title = pullRequestInputDto.title();
        pullRequest.description = pullRequestInputDto.body();
        pullRequest.head = pullRequestInputDto.head();
        pullRequest.base = pullRequestInputDto.base();
        pullRequest.afterReview = false;
        pullRequest.mergeStatus = false;
        pullRequest.deadline = pullRequestInputDto.deadline();
        pullRequest.priority = pullRequestInputDto.priority();
        pullRequest.writerId = pullRequestInputDto.writerId();
        pullRequest.owner = pullRequestInputDto.owner();
        pullRequest.repo = pullRequestInputDto.repo();
        return pullRequest;
    }


}
