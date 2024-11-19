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
            GitHubNameDto dto = apiFeignClient.getGitHubName(user.getGitToken());
            log.info("getGitHubName init!");
            log.info(dto.toString());
            userRepository.save(
                    Users.builder()
                            .id(user.getId())
                            .name(user.getName())
                            .nickname(user.getNickname())
                            .profile(user.getProfile())
                            .accountId(user.getAccountId())
                            .email(user.getEmail())
                            .gitToken(user.getGitToken())
                            .gitName(dto.getGithubId())
                            .build());
        } catch (Exception ex) {
            log.error("getGitHubName Error : {}", ex.getMessage());
        }
    }

    public void addGitHubHookEvents(String owner, String repo, String gitToken) {
        try {
            apiFeignClient.addGitHubHookEvent(owner, repo, gitToken);
            log.info("GitHub Webhook 이벤트 추가 성공");
        } catch (Exception ex) {
            log.error("GitHub Webhook 이벤트 추가 실패: {}", ex.getMessage());
        }
    }
}
