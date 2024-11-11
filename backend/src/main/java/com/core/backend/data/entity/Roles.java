package com.core.backend.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Roles")
@AllArgsConstructor
@Builder
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false)
    private long id;

    @Column(name = "role_name")
    private String name;

    @Column(name = "role_jira_id")
    private String jiraId;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Projects project;

    @OneToMany(mappedBy = "role")
    private List<UserRoles> userRolesList = new ArrayList<>();

}
