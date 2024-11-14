package com.core.api.data.dto.review;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.List;

public record ReviewBaseDto(
        String body,
        String event,
        @JsonSetter("reviews")
        List<ReviewCommentDto> comments
) {
        
}