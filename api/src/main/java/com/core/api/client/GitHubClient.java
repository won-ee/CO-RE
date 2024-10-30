package com.core.api.client;

import com.core.api.data.dto.ContentDto;
import com.core.api.data.dto.FileDto;
import com.core.api.data.dto.pullrequest.PullRequestInputServerDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "github", url = "https://api.github.com")
public interface GitHubClient {

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
}
