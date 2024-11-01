package com.core.api.data.dto.pullrequest;

import java.time.LocalDateTime;
import java.time.YearMonth;

public record PullRequestDateFilterDto(
        String owner,
        String repo,
        String writer,
        LocalDateTime startDate,
        LocalDateTime endDate
) {

    public static PullRequestDateFilterDto of(String owner, String repo, PullRequestFilterDto filter) {

        YearMonth targetMonth = YearMonth.of(filter.year(), filter.month());

        return new PullRequestDateFilterDto(
                owner,
                repo,
                filter.writer(),
                targetMonth.minusMonths(1)
                        .atDay(1)
                        .atStartOfDay(),
                targetMonth.plusMonths(1)
                        .atEndOfMonth()
                        .atTime(23, 59, 59)
        );
    }

}
