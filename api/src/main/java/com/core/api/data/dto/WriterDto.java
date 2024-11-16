package com.core.api.data.dto;

import com.core.api.data.entity.Reviewer;

public record WriterDto(
        String writerId,
        String writerImg
) {

    public static WriterDto from(String writerId, String writerImg) {
        return new WriterDto(writerId, writerImg);
    }

    public static WriterDto fromReviewers(Reviewer reviewer) {
        return new WriterDto(reviewer.getReviewerId(), reviewer.getReviewerImg());
    }


}
