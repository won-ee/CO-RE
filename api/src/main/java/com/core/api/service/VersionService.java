package com.core.api.service;

import com.core.api.data.dto.VersionDto;
import com.core.api.data.dto.VersionHistoryDto;
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
import java.util.List;

@Service
@RequiredArgsConstructor
public class VersionService {

    private final VersionRepository versionRepository;
    private final PullRequestRepository pullRequestRepository;

    @Transactional
    public void createVersion(PullRequestServerDto pullRequest) {

        if (!pullRequest.getBase()
                .equals("master")) {
            return;
        }
        Version version = Version.createVersion(pullRequest);
        versionRepository.save(version);

        pullRequestRepository.findAllByOwnerAndRepo(pullRequest.getOwner(), pullRequest.getRepo())
                .ifPresent(pullRequests -> pullRequests.stream()
                        .filter(pr -> pr.getOwner()
                                .equals(pullRequest.getOwner()) && pr.getRepo()
                                .equals(pullRequest.getRepo()))
                        .forEach(pr -> pr.updateVersion(version))
                );

    }

    public List<VersionDto> getVersion(String owner, String repo) {
        return versionRepository.findAllByOwnerAndRepo(owner, repo)
                .map(list -> list.stream()
                        .map(VersionDto::of)
                        .toList())
                .orElseGet(Collections::emptyList);
    }

    public List<VersionHistoryDto> getVersionHistoryById(Long id) {
        Version version = versionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Version with ID " + id + " not found"));

        return version.getPullRequests()
                .stream()
                .map(this::convertToVersionHistoryDto)
                .toList();
    }

    private VersionHistoryDto convertToVersionHistoryDto(PullRequest pullRequest) {
        List<CommitServerDto> commitList = pullRequest.getCommits()
                .stream()
                .map(CommitServerDto::from)
                .toList();
        return VersionHistoryDto.from(pullRequest, commitList);
    }
}
