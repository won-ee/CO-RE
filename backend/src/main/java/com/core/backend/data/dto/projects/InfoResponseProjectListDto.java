package com.core.backend.data.dto.projects;

import lombok.Builder;

@Builder
public record InfoResponseProjectListDto(
        Long id,
        String name,
        String image,
        String ownerId,
        String ownerName,
        Long groupId,
        String groupName,
        String githunOwner,
        String githubRepo
) {

}
