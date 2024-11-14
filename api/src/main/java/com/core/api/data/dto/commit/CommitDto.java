package com.core.api.data.dto.commit;


import com.core.api.data.entity.Commit;

public record CommitDto(
        String id,
        String message,
        String writerId,
        String writerImg,
        String date
) {
    public static CommitDto from(Commit commit) {
        return new CommitDto(
                commit.getSha(),
                commit.getMessage(),
                commit.getWriterId(),
                commit.getWriterImg(),
                commit.getCreatedDate()
                        .toString()
        );
    }

}
