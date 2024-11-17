package com.core.backend.data.repository;

import com.core.backend.data.dto.api.GitHubNameDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "APIFeignClient", url = "http://api:8081")
public interface ApiFeignClient {

    @GetMapping("/github/user")
    GitHubNameDto getGitHubName(@RequestHeader("gitToken") String gitToken);

    @GetMapping("/github/{owner}/{repo}")
    Void addGitHubHookEvent(@PathVariable("owner") String owner, @PathVariable("repo") String repo);

}
