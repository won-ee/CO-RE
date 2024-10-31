package com.core.backend.service;

import com.core.backend.data.dto.Users.UserSignDto;
import com.core.backend.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void signUp(UserSignDto userSignDto) throws Exception {
        // 로그인시에 회원정보 받아오면서
    }
    

}
