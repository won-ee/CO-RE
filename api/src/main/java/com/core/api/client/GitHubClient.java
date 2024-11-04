package com.core.api.client;

import com.core.api.data.dto.ContentDto;
import com.core.api.data.dto.FileDto;
import com.core.api.data.dto.github.CommitMessageServerDto;
import com.core.api.data.dto.github.PullRequestInputServerDto;
import com.core.api.data.dto.response.BranchResponseDto;
import com.core.api.data.dto.response.MergeResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "github", url = "https://api.github.com")
public interface GitHubClient {

    @PostMapping("/repos/{owner}/{repo}/pulls")
    void createPullRequest(
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
    ResponseEntity<ContentDto> getContents(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("path") String path,
            @RequestParam("ref") String ref
    );

    @PutMapping("/repos/{owner}/{repo}/pulls/{pullId}/merge")
    ResponseEntity<MergeResponseDto> mergePullRequest(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("pullId") int pullId,
            @RequestBody CommitMessageServerDto commitMessage
    );

    @GetMapping("/repos/{owner}/{repo}/branches")
    ResponseEntity<List<BranchResponseDto>> getBranches(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo
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
            @RequestBody ReviewSimpleDto reviewSimpleDto
    );

    @PatchMapping("/repos/{owner}/{repo}/issues/comments/{commentId}")
    void updateComment(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("commentId") Long commentId,
            @RequestBody ReviewSimpleDto reviewSimpleDto
    );

    @DeleteMapping("/repos/{owner}/{repo}/issues/comments/{commentId}")
    void deleteComment(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            @PathVariable("commentId") Long commentId
    );
}
