package com.core.api.service;

import com.core.api.client.GitHubClient;
import com.core.api.data.dto.*;
import com.core.api.data.dto.pullrequest.PullRequestDto;
import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import com.core.api.data.entity.Commit;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.repository.PullRequestRepository;
import com.core.api.utils.DecodingUtils;
import com.core.api.utils.URLUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PullRequestService {

    private final GitHubClient gitHubClient;

    public List<ChangeDto> getChangeFiles(String owner, String repo, int pullId) {
        List<FileDto> changeFiles = gitHubClient.getChangeFiles(owner, repo, pullId);

        return changeFiles.stream()
                .map(file -> {
                    String path = URLUtils.parseFileName(file.contents_url());
                    String ref = URLUtils.parseRefValue(file.contents_url());

                    return Optional.ofNullable(gitHubClient.getContents(owner, repo, path, ref)
                                    .getBody())
                            .map(content -> ChangeDto.of(file, DecodingUtils.decodeBase64(content.content())))
                            .orElseThrow(() -> new RuntimeException("Content not found for path: " + path));
                })
                .toList();
    }


}
