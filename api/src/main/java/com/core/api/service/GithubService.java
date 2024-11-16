package com.core.api.service;

import com.core.api.client.GitHubClient;
import com.core.api.data.dto.github.UserDto;
import com.core.api.data.dto.github.WebhookDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GithubService {

    private final GitHubClient gitHubClient;
    private static final String BASE_URL = "https://k11s106.p.ssafy.io/api/github";
    private static final String PULL_REQUEST_WEBHOOK = BASE_URL + "/pull-request/webhook";
    private static final String REVIEW_WEBHOOK = BASE_URL + "/review/webhook";
    private static final List<String> PULL_REQUEST_EVENTS = List.of("pull_request");
    private static final List<String> REVIEW_EVENTS = List.of("pull_request_review", "pull_request_review_comment");

    public void createWebhooks(String owner, String repo) {
        System.out.println("createWebhooks" + owner + repo);
        createWebhook(owner, repo, PULL_REQUEST_EVENTS, PULL_REQUEST_WEBHOOK);
        createWebhook(owner, repo, REVIEW_EVENTS, REVIEW_WEBHOOK);
    }

    public UserDto getUser() {
        Map<?, ?> user = gitHubClient.getUser();
        return new UserDto(user.get("login")
                .toString());
    }

    private void createWebhook(String owner, String repo, List<String> events, String url) {
        WebhookDto webhookDto = WebhookDto.createWebhookDto(events, url);
        gitHubClient.createWebhook(owner, repo, webhookDto);
    }
}
