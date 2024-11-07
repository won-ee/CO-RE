package com.core.api.data.dto.github;

import com.core.api.data.entity.Commit;

import java.util.List;
import java.util.Map;

public record CommitServerDto(
        String sha,
        String message,
        String date,
        String parent,
        String secondParent

) {
    public static CommitServerDto from(Commit commit) {
        return new CommitServerDto(
                commit.getId(),
                commit.getMessage(),
                commit.getCreatedDate()
                        .toString(),
                commit.getParent(),
                commit.getSecondParent()
        );
    }

    public static CommitServerDto fromApiResponse(Map<?, ?> map) {
        Map<?, ?> commit = (Map<?, ?>) map.get("commit");
        Map<?, ?> author = (Map<?, ?>) commit.get("author");
        List<?> parents = (List<?>) map.get("parents");

        String parent = (parents != null && !parents.isEmpty())
                ? (String) ((Map<?, ?>) parents.get(0)).get("sha")
                : null;
        String secondParent = (parents != null && parents.size() > 1)
                ? (String) ((Map<?, ?>) parents.get(1)).get("sha")
                : null;
        return new CommitServerDto(
                (String) map.get("sha"),
                (String) commit.get("message"),
                (String) author.get("date"),
                parent,
                secondParent
        );
    }
}
