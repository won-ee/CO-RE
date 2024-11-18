package com.core.api.service;

import com.core.api.client.BackendClient;
import com.core.api.client.EmailClient;
import com.core.api.data.dto.*;
import com.core.api.data.dto.github.CommitServerDto;
import com.core.api.data.dto.github.PullRequestServerDto;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Version;
import com.core.api.data.repository.PullRequestRepository;
import com.core.api.data.repository.VersionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class VersionService {

    private final VersionRepository versionRepository;
    private final PullRequestRepository pullRequestRepository;
    private final EmailClient emailClient;
    private final BackendClient backendClient;

    @Transactional
    public void createVersion(PullRequestServerDto pullRequest) {


        if (!"master".equals(pullRequest.getBase())) {
            return;
        }

        boolean isHotfix = pullRequest.getHead() != null && pullRequest.getHead()
                .contains("hotfix");

        List<PullRequest> pullRequestsWithoutVersion = pullRequestRepository
                .findByOwnerAndRepoAndVersionIsNullAndMergeStatusIsTrue(pullRequest.getOwner(), pullRequest.getRepo())
                .orElseGet(Collections::emptyList);

        List<String> content = pullRequestsWithoutVersion.stream()
                .map(PullRequest::getTitle)
                .filter(Objects::nonNull)
                .toList();

        String formattedContent = content.stream()
                .collect(Collectors.joining(System.lineSeparator()));

        Version version = Version.createVersion(pullRequest, isHotfix);
        version.updateContent(formattedContent);
        versionRepository.save(version);
        sendEmail(content, pullRequest.getOwner(), pullRequest.getRepo(), pullRequestsWithoutVersion);

        Consumer<Version> versionUpdater = isHotfix
                ? v -> updateSinglePullRequestVersion(pullRequest, v)
                : v -> updateAllPullRequestsVersion(pullRequest, v);

        versionUpdater.accept(version);

    }

    private void sendEmail(List<String> content, String owner, String repo, List<PullRequest> pullRequests) {
        log.info("content owner repo {} {} {}", content, owner, repo);
        ProjectDto project = backendClient.getProject(owner, repo);
        log.info("Sending email to {} {}", project.projectUserEmail(), project.projectName());
        int totalCommits = pullRequests.stream()
                .mapToInt(pr -> pr.getCommits()
                        .size())
                .sum();
        int totalPullRequests = pullRequests.size();
        int totalReviews = pullRequests.stream()
                .flatMap(pr -> pr.getReviewers()
                        .stream())
                .mapToInt(reviewer -> reviewer.getReviews()
                        .size())
                .sum();

        log.info("totalCommits totalPullRequests totalReviews {} {} {}", totalCommits, totalPullRequests, totalReviews);

        EmailDto email = new EmailDto(
                project.projectUserEmail(),
                project.projectName(),
                content,
                totalCommits,
                totalPullRequests,
                totalReviews);

        log.info("Sending email {}", email);
        emailClient.sendEmail("application/json", email);
    }

    private void updateSinglePullRequestVersion(PullRequestServerDto pullRequest, Version version) {
        log.info("Updating single pull request version {}", pullRequest.getPullRequestId());
        pullRequestRepository.findByOwnerAndRepoAndPullRequestId(pullRequest.getOwner(), pullRequest.getRepo(), pullRequest.getPullRequestId())
                .ifPresent(pr -> pr.updateVersion(version));
    }

    private void updateAllPullRequestsVersion(PullRequestServerDto pullRequest, Version version) {
        log.info("Updating ALL pull request version {}", pullRequest.getPullRequestId());
        pullRequestRepository.findByOwnerAndRepoAndVersionIsNullAndMergeStatusIsTrue(pullRequest.getOwner(), pullRequest.getRepo())
                .ifPresent(pullRequests -> pullRequests.forEach(pr -> pr.updateVersion(version)));
    }

    public List<VersionSimpleDto> getVersions(String owner, String repo) {
        return versionRepository.findAllByOwnerAndRepo(owner, repo)
                .map(list -> list.stream()
                        .map(VersionSimpleDto::of)
                        .toList())
                .orElseGet(Collections::emptyList);
    }

    @Transactional
    public void updateVersion(Long id, VersionDto versionDto) {
        Version version = versionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Version with ID " + id + " not found"));
        version.updateVersion(versionDto);
    }

    public List<VersionHistoryDto> getVersionHistoryById(Long id) {
        Version version = versionRepository.findById(id)

                .orElseThrow(() -> new RuntimeException("Version with ID " + id + " not found"));
        Set<String> uniqueCommitShas = new HashSet<>();

        return version.getPullRequests()
                .stream()
                .map(pullRequest -> convertToVersionHistoryDto(pullRequest, uniqueCommitShas))
                .toList();
    }

    private VersionHistoryDto convertToVersionHistoryDto(PullRequest pullRequest, Set<String> uniqueCommitShas) {
        List<CommitServerDto> commitList = pullRequest.getCommits()
                .stream()
                .filter(commit -> uniqueCommitShas.add(commit.getSha()))
                .map(CommitServerDto::from)
                .toList();
        return VersionHistoryDto.from(pullRequest, commitList);
    }

    public VersionDto getVersion(Long id) {
        Version version = versionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Version with ID " + id + " not found"));
        return VersionDto.from(version);
    }

}
