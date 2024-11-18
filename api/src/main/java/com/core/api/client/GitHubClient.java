package com.core.api.client;

import com.core.api.config.GithubFeignConfig;
import com.core.api.data.dto.FileDto;
import com.core.api.data.dto.github.CommitMessageServerDto;
import com.core.api.data.dto.github.PullRequestInputServerDto;
import com.core.api.data.dto.github.ReviewGithubDto;
import com.core.api.data.dto.github.WebhookDto;
import com.core.api.data.dto.response.MergeResponseDto;
import com.core.api.data.dto.review.CommentSimpleDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "github", url = "https://api.github.com", configuration = GithubFeignConfig.class)
public interface GitHubClient {

    @PostMapping("/repos/{owner}/{repo}/pulls")
    Map<String, Object> createPullRequest(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @RequestBody PullRequestInputServerDto pullRequestInputServerDto
    );

    @GetMapping("/repos/{owner}/{repo}/pulls/{pullId}/files")
    List<FileDto> getChangeFiles(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") int pullId
    );

    @GetMapping("/repos/{owner}/{repo}/contents/{path}")
    Map<String, Object> getContents(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("path") String path,
            @RequestParam("ref") String ref
    );

    @PutMapping("/repos/{owner}/{repo}/pulls/{pullId}/merge")
    MergeResponseDto mergePullRequest(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") int pullId,
            @RequestBody CommitMessageServerDto commitMessage
    );

    @GetMapping("/repos/{owner}/{repo}/branches")
    List<Map<String, Object>> getBranches(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo
    );


    @GetMapping("/repos/{owner}/{repo}/commits/{sha}")
    Map<String, Object> getCommit(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("sha") String sha
    );

    @GetMapping("/repos/{owner}/{repo}/compare/{baseHead}")
    Map<String, Object> compareBranchHead(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("baseHead") String baseHead
    );

    @PostMapping("/repos/{owner}/{repo}/issues/{pullId}/comments")
    void createComment(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") int pullId,
            @RequestBody CommentSimpleDto commentSimpleDto
    );

    @PatchMapping("/repos/{owner}/{repo}/issues/comments/{commentId}")
    void updateComment(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentSimpleDto commentSimpleDto
    );

    @DeleteMapping("/repos/{owner}/{repo}/issues/comments/{commentId}")
    void deleteComment(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("commentId") Long commentId
    );

    @PostMapping("/repos/{owner}/{repo}/pulls/{pullId}/reviews")
    void createReview(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") int pullId,
            @RequestBody ReviewGithubDto reviewBaseDto
    );

    @PatchMapping("/repos/{owner}/{repo}/pulls/comments/{commentId}")
    void updateReview(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentSimpleDto commentSimpleDto
    );

    @DeleteMapping("/repos/{owner}/{repo}/pulls/comments/{commentId}")
    void deleteReview(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("commentId") Long commentId
    );

    @GetMapping("/repos/{owner}/{repo}/pulls/{pullId}/commits")
    List<Object> getCommits(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") Integer pullId
    );

    @GetMapping("/repos/{owner}/{repo}/pulls/{pullId}")
    Map<String, Object> getPullRequest(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") Integer pullId
    );

    @GetMapping("/repos/{owner}/{repo}/pulls/{pullId}/comments")
    List<Map<String, Object>> getReviews(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") Integer pullId
    );

    @PostMapping("/repos/{owner}/{repo}/hooks")
    void createWebhook(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @RequestBody WebhookDto webhookDto
    );

    @GetMapping("/user")
    Map<String, Object> getUser();

    @GetMapping("/users/{username}")
    Map<String, Object> getUserByUsername(@PathVariable("username") String username);
}
