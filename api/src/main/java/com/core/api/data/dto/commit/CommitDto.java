package com.core.api.data.dto.commit;


import com.core.api.data.dto.CommentDto;
import com.core.api.data.entity.Commit;

import java.util.List;

public record CommitDto(
        String id,
        String message,
        String writerId,
        String writerImg,
        String date,
        List<CommentDto> comments
) {
    public static CommitDto from(Commit commit, List<CommentDto> comments) {
        return new CommitDto(
                commit.getSha(),
                commit.getMessage(),
                commit.getWriterId(),
                commit.getWriterImg(),
                commit.getCreatedDate()
                        .toString(),
                comments
        );
    }
}
