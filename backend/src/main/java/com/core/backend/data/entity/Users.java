package com.core.backend.data.entity;

import com.core.backend.data.dto.Users.UserInfoDto;
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

    @Column(name = "user_git_check", nullable = false)
    private Boolean gitCheck = false;

    @OneToMany(mappedBy = "user")
    private List<ProjectUsers> projectUsersList = new ArrayList<>();

    public static Users createUser(UserInfoDto userInfo) {
        return Users.builder()
                .accountId(userInfo.account_id())
                .email(userInfo.email())
                .name(userInfo.name())
                .profile(userInfo.picture())
                .nickname(userInfo.nickname())
                .build();
    }

}
