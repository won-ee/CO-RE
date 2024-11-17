package com.core.backend.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ProjectUsers")
@Builder
public class ProjectUsers extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_user_id", nullable = false)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Projects project;

    @OneToMany(mappedBy = "projectUser")
    private List<Issues> issueList = new ArrayList<>();

    @OneToMany(mappedBy = "projectUserWriter")
    private List<Carrots> writerCarrots = new ArrayList<>();

    @OneToMany(mappedBy = "projectUserApprover")
    private List<Carrots> approverCarrots = new ArrayList<>();


}
