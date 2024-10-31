package com.core.backend.data.entity;

import com.core.backend.data.enums.ProjectRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectUsers extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_user_id", nullable = false)
    private Long id;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "project_user_role", nullable = false)
    private ProjectRole role;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Projects project;


}
