package com.core.backend.service;

import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.dto.Users.UserProjectsDto;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean findUserEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

//    public UserLoginDto userInfo(String accessToken) {
//
//    }

    public void signUp(UserInfoDto userInfoDto) throws Exception {
        // 로그인시에 회원정보 받아오면서
    }


    public void saveUserAndProjects(UserInfoDto userInfo, List<UserProjectsDto> projectList) {
        userRepository.findByEmail(userInfo.email()).orElseGet(() ->
                userRepository.save(Users.createUser(userInfo)));
    }

}
