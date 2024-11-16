package com.core.backend.data.entity;

import com.core.backend.data.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "project_user_id", nullable = false)
    private ProjectUsers projectUser;

    @ManyToOne
    @JoinColumn(name = "epic_id")
    private Epics epic;

    @OneToMany(mappedBy = "issue")
    private List<Carrots> carrotsList = new ArrayList<>();
}
