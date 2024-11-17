package com.core.api.data.entity;

import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private Integer pullRequestId;

    @Column(name = "pr_owner", nullable = false)
    private String owner;


    @Column(name = "pr_repo", nullable = false)
    private String repo;

    @Column(name = "pr_writer_id", nullable = false)
    private String writerId;

    @Column(name = "pr_writer_img")
    private String writerImg;

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

    @Column(name = "pr_status")
    private String status;

    @Column(name = "pr_priority")
    private String priority;

    @Column(name = "pr_after_review", nullable = false)
    @ColumnDefault("false")
    private Boolean afterReview;

    @Column(name = "pr_deadline")
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "version_id")
    private Version version;

    @OneToMany(mappedBy = "pullRequest", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commit> commits = new ArrayList<>();

    @OneToMany(mappedBy = "pullRequest", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reviewer> reviewers = new ArrayList<>();

    @OneToMany(mappedBy = "pullRequest", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    public static PullRequest from(PullRequestInputDto pullRequestInputDto, Integer pullRequestId, String writerId) {
        PullRequest pullRequest = new PullRequest();
        pullRequest.title = pullRequestInputDto.title();
        pullRequest.head = pullRequestInputDto.head();
        pullRequest.base = pullRequestInputDto.base();
        pullRequest.pullRequestId = pullRequestId;
        pullRequest.afterReview = pullRequestInputDto.afterReview();
        pullRequest.mergeStatus = false;
        pullRequest.status = "processing";
        pullRequest.deadline = LocalDate.parse(pullRequestInputDto.deadline(), DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                .atStartOfDay();
        pullRequest.priority = pullRequestInputDto.priority();
        pullRequest.description = pullRequestInputDto.body();
        pullRequest.writerId = writerId;
        pullRequest.owner = pullRequestInputDto.owner();
        pullRequest.repo = pullRequestInputDto.repo();
        return pullRequest;
    }

    public void updateWriterImg(String writerImg) {
        this.writerImg = writerImg;
    }

    public void updateMergeStatus(Boolean mergeStatus) {
        this.mergeStatus = mergeStatus;
    }

    public void updateVersion(Version version) {
        this.version = version;
    }

    public void updateStatus(String status) {
        this.status = status;
    }


}
