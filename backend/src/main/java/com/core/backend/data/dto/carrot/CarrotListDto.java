package com.core.backend.data.dto.carrot;

import com.core.backend.data.entity.Carrots;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CarrotListDto(
        Long id,
        Long issueId,
        String name,
        String key,
        String epicName,
        LocalDateTime deadLine,
        Long senderId,
        String senderName,
        String senderImage
) {

    public static CarrotListDto fromEntity(Carrots carrot) {
        return CarrotListDto.builder()
                .id(carrot.getId())
                .issueId(carrot.getIssue().getId())
                .name(carrot.getIssue().getTitle())
                .key(carrot.getIssue().getIssueNumber())
                .epicName(carrot.getIssue().getEpic() != null ? carrot.getIssue().getEpic().getName() : "")
                .deadLine(carrot.getIssue().getDeadLine())
                .senderId(carrot.getProjectUserWriter().getUser().getId())
                .senderName(carrot.getProjectUserWriter().getUser().getName())
                .senderImage(carrot.getProjectUserWriter().getUser().getProfile())
                .build();
    }
}
