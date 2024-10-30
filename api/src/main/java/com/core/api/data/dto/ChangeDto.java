package com.core.api.data.dto;

public record ChangeDto(
        FileDto file,
        String content
) {
    public static ChangeDto of(FileDto file, String content) {
        return new ChangeDto(file, content);
    }
}
