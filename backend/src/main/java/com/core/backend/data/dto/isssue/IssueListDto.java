package com.core.backend.data.dto.isssue;

import com.core.backend.data.entity.Epics;
import com.core.backend.data.entity.Issues;
import com.core.backend.data.enums.StatusEnum;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Optional;

@Builder
public record IssueListDto(
        Long issueId,
        String issueTitle,
        String issueContent,
        String issueKey,
        int issuePriority,
        LocalDateTime issueDeadLine,
        StatusEnum issueStatus,
        Long managerUserId,
        String managerUserImage,
        String managerUserName,
        String epicName,
        String epicKey
) {

    public static IssueListDto fromEntity(Issues issue) {
        return IssueListDto.builder()
                .issueId(issue.getId())
                .issueTitle(issue.getTitle())
                .issueContent(issue.getContent())
                .issueKey(issue.getIssueNumber())
                .issuePriority(issue.getIssuePriority())
                .issueDeadLine(issue.getDeadLine())
                .issueStatus(issue.getStatus())
                .managerUserId(issue.getProjectUser().getId())
                .managerUserImage(issue.getProjectUser().getUser().getProfile())
                .managerUserName(issue.getProjectUser().getUser().getName())
                .epicName(Optional.ofNullable(issue.getEpic())
                        .map(Epics::getName)
                        .orElse(""))
                .epicKey(Optional.ofNullable(issue.getEpic())
                        .map(Epics::getKey)
                        .orElse(""))
                .build();
    }
}
