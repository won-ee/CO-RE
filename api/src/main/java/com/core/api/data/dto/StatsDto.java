package com.core.api.data.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StatsDto {
    int totalCommit;
    int currentWeekCommit;
    int lastWeekCommit;
    double commitGrowthRate;

    int totalPullRequest;
    int currentWeekPullRequest;
    int lastWeekPullRequest;
    double pullRequestGrowthRate;

    int totalReview;
    int currentWeekReview;
    int lastWeekReview;
    double reviewGrowthRate;

    int totalHotfix;
    int currentWeekHotfix;
    int lastWeekHotfix;
    double hotfixGrowthRate;


}
