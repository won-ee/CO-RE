package com.core.api.data.dto.review;

import java.util.List;

public record ReviewBaseDto(
        String body,
        String event,
        List<ReviewCommentDto> reviews
) {

}