package com.core.backend.data.entity;

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

    @Column(name = "project_category_name", length = 1000)
    private String categoryName;

    @Column(name = "project_category_id", length = 1000)
    private String categoryId;

    @Column(name = "project_owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "project_owner_id", nullable = false, length = 1000)
    private String ownerId;

    @Column(name = "project_target_score", nullable = false)
    private int targetScore = 0;

    @Column(name = "project_reviewer_auto", nullable = false)
    private boolean reviewerAuto = true;

    @Column(name = "project_review_template")
    private String reviewTemplate;

    @Column(name = "project_pr_template")
    private String prTemplate;

    @OneToMany(mappedBy = "project")
    private List<ProjectUsers> projectUsersList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "jira_group_id", nullable = false)
    private JiraGroups jiraGroup;

    @OneToMany(mappedBy = "project")
    private List<Roles> rolesList = new ArrayList<>();

}
