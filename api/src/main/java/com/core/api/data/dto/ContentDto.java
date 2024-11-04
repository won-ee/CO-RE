package com.core.api.data.dto;

public record ContentDto(
        String name,
        String path,
        String sha,
        int size,
        String url,
        String html_url,
        String git_url,
        String download_url,
        String type,
        String content,
        String encoding
) {
}
