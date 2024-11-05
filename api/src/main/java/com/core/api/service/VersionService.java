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
    public List<VersionDto> getVersion(String owner, String repo) {
        return versionRepository.findAllByOwnerAndRepo(owner, repo)
                .map(list -> list.stream()
                        .map(VersionDto::of)
                        .toList())
                .orElseGet(Collections::emptyList);
    }

}
