package com.core.api.data.dto.review;

import com.core.api.data.entity.Reviewer;

import java.time.format.DateTimeFormatter;

public record CommentDto(
        String content,
        Integer score,
        Boolean status,
        String date
) {

    public static CommentDto from(Reviewer reviewer) {
        return new CommentDto(
                reviewer.getContent(),
                reviewer.getScore(),
                reviewer.getStatus(),
                reviewer.getModifiedDate()
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    }
}
