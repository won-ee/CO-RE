package com.core.api.data.dto;

import com.core.api.data.entity.Version;

public record VersionDto(
        Long id,
        String name,
        String owner,
        String repo,
        String content
) {

    public static VersionDto of(Version version) {
        return new VersionDto(
                version.getId(),
                version.getName(),
                version.getOwner(),
                version.getRepo(),
                version.getContent()
        );
    }

}
