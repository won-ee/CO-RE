package com.core.api.data.entity;

import jakarta.persistence.*;

@Entity
public class Image {

    @Id
    @Column(name = "image_id", nullable = false)
    private Long id;

    @Column(name = "image_url", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "pr_id")
    private PullRequest pullRequest;
}
