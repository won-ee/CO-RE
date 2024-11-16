package com.core.api.data.dto;

import java.util.List;

public record StatsVersionDto(
        List<DayDto> commits,
        List<DayDto> pullRequests,
        List<DayDto> reviews
) {

}
