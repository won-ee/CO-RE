package com.core.api.data.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ContentDto(
        String name,
        String path,
        String sha,
        long size,
        String url,
        String html_url,
        String git_url,
        String download_url,
        String type,
        String content,
        String encoding
) {
}
