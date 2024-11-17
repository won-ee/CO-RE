package com.core.api.client;

import com.core.api.config.BackendFeignConfig;
import com.core.api.data.dto.EmailDto;
import com.core.api.data.dto.ProjectDto;
import com.core.api.data.dto.ProjectInfoDto;
import com.core.api.data.dto.TokenDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(name = "backend", url = "BACKEND", configuration = BackendFeignConfig.class)
public interface BackendClient {

    @GetMapping(value = "/users/search/git-token")
    TokenDto getGithubToken(@RequestHeader("Authorization") String token);

    @GetMapping("/project/search/git-set")
    ProjectInfoDto getProjectInfo(@RequestParam("owner") String owner, @RequestParam("repo") String repo);

    @GetMapping("/project-users/search/email")
    ProjectDto getProject(@RequestParam("owner") String owner, @RequestParam("repo") String repo);

    @PostMapping("/email/release")
    void sendEmail(@RequestBody EmailDto email);
}
