package com.core.api.service;

import com.core.api.data.dto.DayDto;
import com.core.api.data.dto.StatsDto;
import com.core.api.data.dto.StatsVersionDto;
import com.core.api.data.entity.Commit;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Review;
import com.core.api.data.entity.Version;
import com.core.api.data.repository.PullRequestRepository;
import com.core.api.data.repository.VersionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final PullRequestRepository pullRequestRepository;
    private final VersionRepository versionRepository;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yy-MM-dd");
    public StatsVersionDto getVersionStats(Long id) {
        Version version = versionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Version not found"));
        List<PullRequest> pullRequests = pullRequestRepository.findAllByVersion(version)
                .orElse(List.of());

        List<DayDto> prCounts = getCountsByDate(pullRequests, PullRequest::getCreatedDate);
        List<DayDto> reviewCounts = getCountsByDate(
                pullRequests.stream()
                        .flatMap(pr -> pr.getReviewers()
                                .stream())
                        .flatMap(reviewer -> reviewer.getReviews()
                                .stream())
                        .toList(),
                Review::getCreatedDate
        );
        List<DayDto> commitCounts = getCountsByDate(
                pullRequests.stream()
                        .flatMap(pr -> pr.getCommits()
                                .stream())
                        .toList(),
                Commit::getCreatedDate
        );

        return new StatsVersionDto(commitCounts, prCounts, reviewCounts);
    }

    private <T> List<DayDto> getCountsByDate(List<T> items, Function<T, LocalDateTime> dateExtractor) {
        Map<String, Integer> countMap = items.stream()
                .collect(Collectors.groupingBy(
                        item -> dateExtractor.apply(item)
                                .format(DATE_FORMATTER),
                        Collectors.summingInt(i -> 1)
                ));

        return countMap.entrySet()
                .stream()
                .map(entry -> new DayDto(entry.getKey(), entry.getValue()))
                .toList();
    }
}

