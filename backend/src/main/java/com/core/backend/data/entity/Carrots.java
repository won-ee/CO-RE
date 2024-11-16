package com.core.backend.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "Carrots")
@AllArgsConstructor
@Builder
public class Carrots extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carrot_id")
    private Long id;

    @Column(name = "carrot_state", nullable = false)
    private boolean state = true;

    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    private Issues issue;

    @ManyToOne
    @JoinColumn(name = "project_user_writer_id", nullable = false)
    private ProjectUsers projectUserWriter;

    @ManyToOne
    @JoinColumn(name = "project_user_approver_id")
    private ProjectUsers projectUserApprover;

}
