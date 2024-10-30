package com.core.api.data.dto;

public record FileDto(
        String filename,
        String status,
        String contents_url,
        int additions,
        int deletions,
        int changes,
        String patch
) {
}
