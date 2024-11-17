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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
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
                .findByOwnerAndRepoAndVersionIsNull(pullRequest.getOwner(), pullRequest.getRepo())
                .orElseGet(Collections::emptyList);

        String content = pullRequestsWithoutVersion.stream()
                .map(PullRequest::getTitle)
                .reduce("", (acc, title) -> acc + "\n" + title);

        Version version = Version.createVersion(pullRequest, isHotfix);
        version.updateContent(content);
        versionRepository.save(version);
        sendEmail(content, pullRequest.getOwner(), pullRequest.getRepo(), pullRequestsWithoutVersion);
        Consumer<Version> versionUpdater = isHotfix
                ? v -> updateSinglePullRequestVersion(pullRequest, v)
                : v -> updateAllPullRequestsVersion(pullRequest, v);

        versionUpdater.accept(version);

    }

    private void sendEmail(String content, String owner, String repo, List<PullRequest> pullRequests) {
        ProjectDto project = backendClient.getProject(owner, repo);

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

        EmailDto email = new EmailDto(
                project.projectUserEmail(),
                project.projectName(),
                content,
                totalCommits,
                totalPullRequests,
                totalReviews);

        emailClient.sendEmail(email);
    }

    private void updateSinglePullRequestVersion(PullRequestServerDto pullRequest, Version version) {
        pullRequestRepository.findByOwnerAndRepoAndPullRequestId(pullRequest.getOwner(), pullRequest.getRepo(), pullRequest.getPullRequestId())
                .ifPresent(pr -> pr.updateVersion(version));
    }

    private void updateAllPullRequestsVersion(PullRequestServerDto pullRequest, Version version) {
        pullRequestRepository.findByOwnerAndRepoAndVersionIsNull(pullRequest.getOwner(), pullRequest.getRepo())
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
