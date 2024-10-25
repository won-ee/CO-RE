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
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private long id;

    @Column(name = "user_email", nullable = false, length = 100)
    private String email;

    @Column(name = "user_git_check", nullable = false)
    private Boolean gitCheck = false;

    @OneToMany(mappedBy = "user")
    private List<ProjectUsers> projectUsersList = new ArrayList<>();

}
