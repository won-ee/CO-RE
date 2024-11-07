package com.core.backend.service;

import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final JiraService jiraService;
    private final UserRepository userRepository;

    public boolean findUserEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }


    public void signUp(UserInfoDto userInfoDto) {
        // 로그인시에 회원정보 받아오면서
    }

    public Long saveUser(UserInfoDto userInfo) {
        Users newUser = Users.builder()
                .name(userInfo.name())
                .nickname(userInfo.nickname())
                .profile(userInfo.picture())
                .accountId(userInfo.accountId())
                .email(userInfo.email())
                .build();

        return userRepository.save(newUser).getId();
    }

}
