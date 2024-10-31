package com.core.api.service;

import com.core.api.client.GitHubClient;
import com.core.api.data.dto.ChangeDto;
import com.core.api.data.dto.CommentDto;
import com.core.api.data.dto.FileDto;
import com.core.api.data.dto.ReviewerDto;
import com.core.api.data.dto.commit.CommitDto;
import com.core.api.data.dto.commit.CommitMessageDto;
import com.core.api.data.dto.github.CommitMessageServerDto;
import com.core.api.data.dto.pullrequest.PullRequestDateFilterDto;
import com.core.api.data.dto.pullrequest.PullRequestDto;
import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import com.core.api.data.dto.response.MergeResponseDto;
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
    private final PullRequestRepository pullRequestRepository;

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

    public MergeResponseDto mergePullRequest(String owner, String repo, int pullId, CommitMessageDto commitMessage) {
        return gitHubClient.mergePullRequest(owner, repo, pullId, CommitMessageServerDto.of(commitMessage))
                .getBody();
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
        List<CommentDto> comments = commit.getComments()
                .stream()
                .map(CommentDto::from)
                .toList();
        return CommitDto.from(commit, comments);
    }

}
