package com.core.api.data.dto.chatgpt;

public record ChatGptMessageDto(
        String role,
        String content
) {
}
