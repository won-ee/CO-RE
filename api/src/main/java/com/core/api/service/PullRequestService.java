package com.core.api.service;

import com.core.api.client.GitHubClient;
import com.core.api.data.dto.ChangeDto;
import com.core.api.data.dto.CommentDto;
import com.core.api.data.dto.FileDto;
import com.core.api.data.dto.ReviewerDto;
import com.core.api.data.dto.commit.CommitDto;
import com.core.api.data.dto.commit.CommitMessageDto;
import com.core.api.data.dto.github.CommitMessageServerDto;
import com.core.api.data.dto.github.CommitServerDto;
import com.core.api.data.dto.github.PullRequestInputServerDto;
import com.core.api.data.dto.github.PullRequestServerDto;
import com.core.api.data.dto.pullrequest.PullRequestDateFilterDto;
import com.core.api.data.dto.pullrequest.PullRequestDto;
import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import com.core.api.data.dto.response.MergeResponseDto;
import com.core.api.data.entity.Commit;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.repository.CommitRepository;
import com.core.api.data.repository.PullRequestRepository;
import com.core.api.utils.DecodingUtils;
import com.core.api.utils.URLUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PullRequestService {

    private final GitHubClient gitHubClient;
    private final PullRequestRepository pullRequestRepository;
    private final CommitRepository commitRepository;

    @Transactional
    public void createPullRequest(PullRequestInputDto pullRequestInputDto) {
        Map<String, Object> data = gitHubClient.createPullRequest(
                pullRequestInputDto.owner(),
                pullRequestInputDto.repo(),
                PullRequestInputServerDto.from(pullRequestInputDto)
        );
        Integer number = (Integer) data.get("number");
        PullRequest pr = PullRequest.from(pullRequestInputDto, number);
        pullRequestRepository.save(pr);

        gitHubClient.getCommits(pullRequestInputDto.owner(), pullRequestInputDto.repo(), number)
                .stream()
                .map(commitData -> CommitServerDto.fromApiResponse((Map<?, ?>) commitData))
                .map(commitDto -> Commit.from(commitDto, pr))
                .forEach(commitRepository::save);

    }

    public List<PullRequestDto> getPullRequestList(String owner, String repo) {
        List<PullRequest> prList = pullRequestRepository.findAllByOwnerAndRepo(owner, repo)
                .orElseThrow(() -> new RuntimeException("Pull Request not found"));

        return prList.stream()
                .map(this::toPullRequestDto)
                .toList();
    }

    public List<PullRequestDto> getPullRequestListByFilter(PullRequestDateFilterDto filter) {
        List<PullRequest> prList = pullRequestRepository.findAllByOwnerRepoByFilter(filter)
                .orElseThrow(() -> new RuntimeException("Pull Request not found"));

        return prList.stream()
                .map(this::toPullRequestDto)
                .toList();
    }

    public List<ChangeDto> getChangeFiles(String owner, String repo, String baseHead) {
        Map<?, ?> data = gitHubClient.compareBranchHead(owner, repo, baseHead);
        List<?> changeFiles = (List<?>) data.get("files");
        return changeFiles.stream()
                .map(file -> {
                    FileDto fileDto = FileDto.of((Map<?, ?>) file);
                    String path = URLUtils.parseFileName(fileDto.contentsUrl());
                    String ref = URLUtils.parseRefValue(fileDto.contentsUrl());
                    return Optional.ofNullable(gitHubClient.getContents(owner, repo, path, ref))
                            .map(contentMap -> (String) contentMap.get("content"))
                            .map(DecodingUtils::decodeBase64)
                            .map(decodedContent -> ChangeDto.of(fileDto, decodedContent))
                            .orElseThrow(() -> new RuntimeException("Content not found for path: " + path));
                })
                .toList();
    }

    public MergeResponseDto mergePullRequest(String owner, String repo, int pullId, CommitMessageDto commitMessage) {
        return gitHubClient.mergePullRequest(owner, repo, pullId, CommitMessageServerDto.of(commitMessage));

    }

    public void closedPullRequest(PullRequestServerDto pullRequest) {
        pullRequestRepository.findByOwnerAndRepoAndBaseAndHead(pullRequest.getOwner(), pullRequest.getRepo(), pullRequest.getBase(), pullRequest.getHead())
                .ifPresent(pr -> {
                    pr.updateMergeStatus(pullRequest.getMergeStatus());
                    pullRequestRepository.save(pr);
                });
    }


    private PullRequestDto toPullRequestDto(PullRequest pr) {
        List<CommitDto> commits = pr.getCommits()
                .stream()
                .map(this::toCommitDto)
                .toList();

        List<ReviewerDto> reviewers = pr.getReviewers()
                .stream()
                .map(ReviewerDto::from)
                .toList();

        return PullRequestDto.from(pr, commits, reviewers);
    }

    private CommitDto toCommitDto(Commit commit) {
        List<CommentDto> comments = commit.getReviews()
                .stream()
                .map(CommentDto::from)
                .toList();
        return CommitDto.from(commit, comments);
    }


}
