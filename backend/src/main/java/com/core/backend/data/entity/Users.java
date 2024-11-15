package com.core.backend.data.entity;

import com.core.backend.data.dto.users.UserUpdateInfoDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Users")
@AllArgsConstructor
@Builder
public class Users extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private long id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_profile")
    private String profile;

    @Column(name = "user_account_id")
    private String accountId;

    @Column(name = "user_email", nullable = false, length = 100)
    private String email;

    @Column(name = "user_git_token")
    private String gitToken;

    @OneToMany(mappedBy = "user")
    private List<ProjectUsers> projectUsersList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserRoles> userRolesList = new ArrayList<>();


    public void updateInfo(String name, String email, String profile) {
        this.name = name;
        this.email = email;
        this.profile = profile;
    }

    public void createUserInfo(UserUpdateInfoDto userUpdateInfoDto) {
        this.nickname = userUpdateInfoDto.nickName();
        this.gitToken = userUpdateInfoDto.gitToken();
    }
}
