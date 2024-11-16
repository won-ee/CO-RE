package com.core.api.data.dto.github;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;


@Builder
@Getter
public class PullRequestServerDto {
    String title;
    Integer pullRequestId;
    String writerId;
    String writerImg;
    String description;
    String head;
    String base;
    String repo;
    String owner;
    Boolean mergeStatus;

    public static PullRequestServerDto from(Map<?, ?> payload) {

        Map<?, ?> pr = (Map<?, ?>) payload.get("pull_request");
        Map<?, ?> user = (Map<?, ?>) pr.get("user");
        Map<?, ?> base = (Map<?, ?>) pr.get("base");
        Map<?, ?> head = (Map<?, ?>) pr.get("head");
        Map<?, ?> repository = (Map<?, ?>) payload.get("repository");
        Map<?, ?> owner = (Map<?, ?>) repository.get("owner");


        return PullRequestServerDto.builder()
                .title((String) pr.get("title"))
                .pullRequestId((Integer) pr.get("number"))
                .writerId((String) user.get("login"))
                .writerImg((String) user.get("avatar_url"))
                .description((String) pr.get("body"))
                .head((String) head.get("ref"))
                .base((String) base.get("ref"))
                .repo((String) repository.get("name"))
                .owner((String) owner.get("login"))
                .mergeStatus((Boolean) pr.get("merged"))
                .build();
    }
}
