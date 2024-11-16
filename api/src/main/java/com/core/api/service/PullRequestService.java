package com.core.api.service;

import com.core.api.client.GitHubClient;
import com.core.api.data.dto.commit.CommitDto;
import com.core.api.data.dto.commit.CommitMessageDto;
import com.core.api.data.dto.github.CommitMessageServerDto;
import com.core.api.data.dto.github.CommitServerDto;
import com.core.api.data.dto.github.PullRequestInputServerDto;
import com.core.api.data.dto.github.PullRequestServerDto;
import com.core.api.data.dto.pullrequest.PullRequestDateFilterDto;
import com.core.api.data.dto.pullrequest.PullRequestDto;
import com.core.api.data.dto.pullrequest.PullRequestInputDto;
import com.core.api.data.dto.pullrequest.PullRequestSimpleDto;
import com.core.api.data.dto.response.MergeResponseDto;
import com.core.api.data.entity.Commit;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Reviewer;
import com.core.api.data.repository.CommitRepository;
import com.core.api.data.repository.PullRequestRepository;
import com.core.api.data.repository.ReviewerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PullRequestService {

    private final GitHubClient gitHubClient;
    private final PullRequestRepository pullRequestRepository;
    private final ReviewerRepository reviewerRepository;
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

        List<Reviewer> reviewers = pullRequestInputDto.reviewers()
                .stream()
                .map(username -> {
                    String avatarUrl = gitHubClient.getUserByUsername(username)
                            .get("avatar_url")
                            .toString();
                    return Reviewer.createReviewer(username, pr, avatarUrl);
                })
                .toList();
        reviewerRepository.saveAll(reviewers);

        gitHubClient.getCommits(pullRequestInputDto.owner(), pullRequestInputDto.repo(), number)
                .stream()
                .map(commitData -> CommitServerDto.fromApiResponse((Map<?, ?>) commitData))
                .map(commitDto -> Commit.from(commitDto, pr))
                .filter(commit -> !commitRepository.existsBySha(commit.getSha()))
                .forEach(commitRepository::save);
    }


    public List<PullRequestSimpleDto> getPullRequestListByReviewer(String owner, String repo) {

        String userId = getUser();
        List<PullRequest> prList = pullRequestRepository.findAllByOwnerAndRepoWhereReviewerIs(owner, repo, userId)
                .orElse(List.of());

        return prList.stream()
                .map(pr -> PullRequestSimpleDto.from(pr, pr.getReviewers()))
                .toList();

    }

    public List<PullRequestSimpleDto> getPullRequestListByWriter(String owner, String repo) {

        String userId = getUser();
        List<PullRequest> prList = pullRequestRepository.findAllByOwnerAndRepoWhereWriterIs(owner, repo, userId)
                .orElse(List.of());

        return prList.stream()
                .map(pr -> PullRequestSimpleDto.from(pr, pr.getReviewers()))
                .toList();

    }

    public PullRequestDto getPullRequest(String owner, String repo, Integer pullId) {
        PullRequest pr = pullRequestRepository.findByOwnerAndRepoAndPullRequestId(owner, repo, pullId)
                .orElseThrow(() -> new RuntimeException("Pull Request not found"));

        return toPullRequestDto(pr);
    }

    public List<PullRequestSimpleDto> getPullRequestListByFilter(PullRequestDateFilterDto filter) {
        List<PullRequest> prList = pullRequestRepository.findAllByOwnerRepoByFilter(filter)
                .orElseThrow(() -> new RuntimeException("Pull Request not found"));

        return prList.stream()
                .map(pr -> PullRequestSimpleDto.from(pr, pr.getReviewers()))
                .toList();
    }


    public MergeResponseDto mergePullRequest(String owner, String repo, int pullId, CommitMessageDto commitMessage) {
        return gitHubClient.mergePullRequest(owner, repo, pullId, CommitMessageServerDto.of(commitMessage));

    }

    public void openedPullRequest(PullRequestServerDto pullRequest) {

        PullRequest pr = pullRequestRepository.findByOwnerAndRepoAndPullRequestId(pullRequest.getOwner(), pullRequest.getRepo(), pullRequest.getPullRequestId())
                .orElseThrow(
                        () -> new RuntimeException("Pull Request not found")
                );
        pr.updateWriterImg(pullRequest.getWriterImg());
    }

    public void closedPullRequest(PullRequestServerDto pullRequest) {
        pullRequestRepository.findByOwnerAndRepoAndBaseAndHeadAndVersionIsNull(pullRequest.getOwner(), pullRequest.getRepo(), pullRequest.getBase(), pullRequest.getHead())
                .ifPresent(pr -> {
                    pr.updateMergeStatus(pullRequest.getMergeStatus());
                    pullRequestRepository.save(pr);
                });
    }


    private PullRequestDto toPullRequestDto(PullRequest pr) {
        List<CommitDto> commits = pr.getCommits()
                .stream()
                .map(CommitDto::from)
                .toList();
        return PullRequestDto.from(pr, commits, pr.getReviewers());
    }

    private String getUser() {
        Map<?, ?> user = gitHubClient.getUser();
        return user.get("login")
                .toString();
    }


}
