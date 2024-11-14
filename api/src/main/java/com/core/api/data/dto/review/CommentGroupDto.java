package com.core.api.data.dto.review;

import com.core.api.data.dto.WriterDto;

public record CommentGroupDto(
        WriterDto writer,
        CommentDto comment
) {

    public static CommentGroupDto from(WriterDto writer, CommentDto comment) {
        return new CommentGroupDto(writer, comment);
    }
}
