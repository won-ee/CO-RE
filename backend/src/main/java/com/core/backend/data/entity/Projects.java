package com.core.backend.data.entity;

import com.core.backend.data.dto.projects.ProjectSetDto;
import com.core.backend.data.dto.projects.UpdateGitHubRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Projects")
@Builder
public class Projects {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Long id;

    @Column(name = "project_jira_id", nullable = false)
    private String jiraId;

    @Column(name = "project_name", nullable = false, length = 100)
    private String name;

    @Column(name = "project_key", nullable = false, length = 1000)
    private String key;

    @Column(name = "project_image", nullable = false, length = 1000)
    private String image;

    @Column(name = "project_self_url", nullable = false, length = 1000)
    private String selfUrl;

    @Column(name = "project_owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "project_owner_id", nullable = false, length = 1000)
    private String ownerId;

    @Column(name = "project_git_owner", length = 1000)
    private String githubOwner;

    @Column(name = "project_git_repository", length = 1000)
    private String githubRepository;

    @Column(name = "project_target_score", nullable = false)
    private int targetScore = 0;

    @Column(name = "project_reviewer_count", nullable = false)
    private int reviewerCount = 1;

    @Column(name = "project_review_template", columnDefinition = "TEXT")
    private String reviewTemplate;

    @OneToMany(mappedBy = "project")
    private List<ProjectUsers> projectUsersList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "jira_group_id", nullable = false)
    private JiraGroups jiraGroup;

    @OneToMany(mappedBy = "project")
    private List<Roles> rolesList = new ArrayList<>();

    @OneToMany(mappedBy = "project")
    private List<Epics> epicsList = new ArrayList<>();

    public Projects updateGitHub(UpdateGitHubRequestDto updateGitHubRequestDto) {
        return Projects.builder()
                .id(this.id)
                .jiraId(this.jiraId)
                .name(this.name)
                .key(this.key)
                .image(this.image)
                .selfUrl(this.selfUrl)
                .ownerName(this.ownerName)
                .ownerId(this.ownerId)
                .githubOwner(updateGitHubRequestDto.githubOwner())
                .githubRepository(updateGitHubRequestDto.githubRepository())
                .targetScore(this.targetScore)
                .reviewerCount(this.reviewerCount)
                .reviewTemplate(this.reviewTemplate)
                .jiraGroup(this.jiraGroup)
                .build();
    }

    public Projects updateSet(ProjectSetDto projectSetDto) {
        return Projects.builder()
                .id(this.id)
                .jiraId(this.jiraId)
                .name(this.name)
                .key(this.key)
                .image(this.image)
                .selfUrl(this.selfUrl)
                .ownerName(this.ownerName)
                .ownerId(this.ownerId)
                .githubOwner(this.githubOwner)
                .githubRepository(this.githubRepository)
                .targetScore(projectSetDto.targetScore())
                .reviewerCount(projectSetDto.reviewerCount())
                .reviewTemplate(projectSetDto.template())
                .jiraGroup(this.jiraGroup)
                .build();
    }


}
