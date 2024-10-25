package com.approve.cori.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Projects {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Long id;

    @Column(name = "project_name", nullable = false, length = 100)
    private String name;

    @Column(name = "project_owner", nullable = false, length = 100)
    private String owner;

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
}
