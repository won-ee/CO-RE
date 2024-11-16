package com.core.backend.data.dto.epics;

import lombok.Builder;

@Builder
public record EpicListDto(
        Long id,
        String key,
        String name
) {
}
