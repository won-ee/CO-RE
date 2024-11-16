package com.core.api.data.dto.github;

public record WebhookConfigDto(
        String url,
        String contentType
) {
}
