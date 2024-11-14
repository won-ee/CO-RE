package com.core.api.data.dto.review;

import com.core.api.data.entity.Reviewer;

public record CommentDto(
        String content,
        Integer score,
        Boolean status
) {

    public static CommentDto from(Reviewer reviewer) {
        return new CommentDto(
                reviewer.getContent(),
                reviewer.getScore(),
                reviewer.getStatus()
        );
    }
}
