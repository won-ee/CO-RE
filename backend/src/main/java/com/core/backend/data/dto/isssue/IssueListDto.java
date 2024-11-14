package com.core.backend.data.dto.isssue;

import com.core.backend.data.enums.StatusEnum;

import java.time.LocalDateTime;

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
        String managerUserName

) {
}
