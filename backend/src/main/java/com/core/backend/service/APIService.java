package com.core.backend.service;

import com.core.backend.data.dto.api.GitHubNameDto;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.ApiFeignClient;
import com.core.backend.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class APIService {

    private final UserRepository userRepository;
    private final ApiFeignClient apiFeignClient;

    public void getGitHubName(Users user) {
        try {
            String bearerToken = "Bearer " + user.getGitToken();
            GitHubNameDto dto = apiFeignClient.getGitHubName(bearerToken);

            userRepository.save(
                    Users.builder()
                            .id(user.getId())
                            .name(user.getName())
                            .nickname(user.getNickname())
                            .profile(user.getProfile())
                            .accountId(user.getAccountId())
                            .email(user.getEmail())
                            .gitToken(user.getGitToken())
                            .gitName(dto.getGithubName())
                            .build());
        } catch (Exception ex) {
            log.error("getGitHubName Error : {}", ex.getMessage());
        }


    }
}
