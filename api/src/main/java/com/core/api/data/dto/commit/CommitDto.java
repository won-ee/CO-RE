package com.core.api.data.dto.commit;


import com.core.api.data.dto.CommentDto;
import com.core.api.data.entity.Commit;
import com.core.api.data.entity.PullRequest;

import java.util.List;

public record CommitDto(
        String id,
        String message,
        PullRequest pullRequest,
        List<CommentDto> comments
) {

    public static CommitDto from(Commit commit, List<CommentDto> comments) {
        return new CommitDto(
                commit.getId(),
                commit.getMessage(),
                commit.getPullRequest(),
                comments
        );
    }
}
