package com.core.backend.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Epics")
@AllArgsConstructor
@Builder
public class Epics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "epic_id")
    private Long id;

    @Column(name = "epic_key")
    private String key;

    @Column(name = "epic_name")
    String name;

    @Column(name = "epic_url")
    String url;

    @Column(name = "epic_jira_id")
    String jiraId;

    @OneToMany(mappedBy = "epic")
    private List<Issues> issuesList = new ArrayList<>();
}
