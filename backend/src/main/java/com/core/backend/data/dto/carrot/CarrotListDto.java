package com.core.backend.data.dto.carrot;

import java.time.LocalDateTime;

public record CarrotListDto(
        Long id,
        Long issueId,
        String name,
        String key,
        String epicName,
        LocalDateTime deadLine,
        Long senderId,
        String senderName,
        String senderUrl
) {
}
