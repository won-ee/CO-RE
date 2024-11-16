package com.core.api.data.dto.github;

import java.util.List;

public record WebhookDto(
        List<String> events,
        WebhookConfigDto config

) {
    public static WebhookDto createWebhookDto(List<String> event, String url) {
        return new WebhookDto(event, new WebhookConfigDto(
                url,
                "json"
        ));
    }
}
