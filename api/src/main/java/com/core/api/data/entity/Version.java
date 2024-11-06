package com.core.api.data.entity;


import com.core.api.data.dto.github.PullRequestServerDto;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "version_name")
    private String name;

    @Column(name = "version_owner", nullable = false)
    private String owner;

    @Column(name = "version_repo", nullable = false)
    private String repo;

    @Column(name = "version_content")
    private String content;

    @OneToMany(mappedBy = "version")
    private List<PullRequest> pullRequests = new ArrayList<>();

    public static Version createVersion(PullRequestServerDto pullRequest) {
        Version version = new Version();
        version.owner = pullRequest.getOwner();
        version.repo = pullRequest.getRepo();
        version.content = pullRequest.getDescription();
        return version;
    }
}
