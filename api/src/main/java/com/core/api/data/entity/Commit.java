package com.core.api.data.entity;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Commit extends  Base {

    @Id
    @Column(name="commit_id", nullable = false)
    private String id;

    @Column(name="commit_message",length = 2000)
    private String message;

    @ManyToOne
    @JoinColumn(name="pr_id", nullable = false)
    private PullRequest pullRequest;

    @OneToMany(mappedBy = "commit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

}