package com.core.backend.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "JiraGroups")
@AllArgsConstructor
@Builder
public class JiraGroups {

    @Id
    @Column(name = "jira_group_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jira_group_key", nullable = false)
    private String groupKey;

    @Column(name = "jira_group_name", nullable = false)
    private String groupName;

    @Column(name = "jira_group_image", nullable = false)
    private String groupImage;

    @Column(name = "jira_group_url", nullable = false)
    private String groupUrl;

    @OneToMany(mappedBy = "jiraGroup")
    private List<Projects> groupProjectsList = new ArrayList<>();

}
