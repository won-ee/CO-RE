package com.core.api.data.dto;

import com.core.api.data.entity.Version;

public record VersionSimpleDto(
        Long id,
        String name,
        String owner,
        String repo,
        String content
) {

    public static VersionSimpleDto of(Version version) {
        return new VersionSimpleDto(
                version.getId(),
                version.getName(),
                version.getOwner(),
                version.getRepo(),
                version.getContent()
        );
    }

}
