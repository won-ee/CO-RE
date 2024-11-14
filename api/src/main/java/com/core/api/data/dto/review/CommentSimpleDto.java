package com.core.api.data.dto.review;

public record CommentSimpleDto(
        String body
) {
    public static CommentSimpleDto from(CommentDto commentDto) {
        return new CommentSimpleDto(
                commentDto.content()
        );
    }
}
