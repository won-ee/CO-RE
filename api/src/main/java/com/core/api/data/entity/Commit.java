package com.core.api.data.entity;


import com.core.api.data.dto.github.CommitServerDto;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Entity
@Getter
public class Commit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commit_id", nullable = false)
    private Long id;

    @Column(name = "commit_sha", nullable = false)
    private String sha;

    @Column(name = "commit_message", length = 2000)
    private String message;

    @Column(name = "commit_writer_id", length = 2000)
    private String writerId;

    @Column(name = "commit_writer_img", length = 2000)
    private String writerImg;

    @ManyToOne
    @JoinColumn(name = "pr_id", nullable = false)
    private PullRequest pullRequest;

    @Column(name = "commit_parent")
    private String parent;

    @Column(name = "commit_second_parent")
    private String secondParent;

    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    public static Commit from(CommitServerDto commitServerDto, PullRequest pullRequest) {
        Commit commit = new Commit();
        commit.sha = commitServerDto.sha();
        commit.message = commitServerDto.message();
        commit.pullRequest = pullRequest;
        commit.parent = commitServerDto.parent();
        commit.secondParent = commitServerDto.secondParent();
        commit.createdDate = OffsetDateTime.parse(commitServerDto.date())
                .toLocalDateTime();
        commit.writerId = commitServerDto.writerId();
        commit.writerImg = commitServerDto.writerImg();
        return commit;
    }

}
