package com.core.api.controller;

import com.core.api.data.dto.VersionDto;
import com.core.api.data.dto.VersionHistoryDto;
import com.core.api.service.VersionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/version")
@RequiredArgsConstructor
public class VersionController {

    private final VersionService versionService;

    @GetMapping("/{owner}/{repo}")
    public ResponseEntity<List<VersionDto>> getVersion(@PathVariable String owner, @PathVariable String repo) {
        List<VersionDto> versionList = versionService.getVersion(owner, repo);
        return ResponseEntity.ok(versionList);
    }
}
