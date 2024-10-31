package com.core.api.data.dto;


import com.core.api.data.entity.Comment;

public record CommentDto(
        Long id,
        Long commentId,
        Integer startLine,
        Integer endLine,
        String content
) {
    public static CommentDto from(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getCommentId(),
                comment.getStartLine(),
                comment.getEndLine(),
                comment.getContent()
        );
    }
}
