package com.core.backend.data.entity;

import com.core.backend.data.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Issues")
@AllArgsConstructor
@Builder
public class Issues extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issue_id")
    private Long id;

    @Column(name = "issue_title", nullable = false)
    private String title;

    @Column(name = "issue_content", nullable = false)
    private String content;

    @Column(name = "issue_number", nullable = false)
    private String issueNumber;

    @Column(name = "issue_priority", nullable = false)
    private int issuePriority;

    @Column(name = "issue_deadline")
    private LocalDateTime deadLine;

    @Column(name = "issue_status")
    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @Column(name = "issue_jira_id")
    private String jiraId;

    @Column(name = "issue_jira_url")
    private String jiraUrl;

    @Column(name = "issue_epic_name")
    private String epicName;

    @Column(name = "issue_epic_key")
    private String epicKey;

    @Column(name = "issue_epic_url")
    private String epicUrl;

    @ManyToOne
    @JoinColumn(name = "project_user_id", nullable = false)
    private ProjectUsers projectUser;

}
