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
    public ResponseEntity<List<VersionSimpleDto>> getVersion(@PathVariable String owner, @PathVariable String repo) {
        List<VersionSimpleDto> versionList = versionService.getVersions(owner, repo);
        return ResponseEntity.ok(versionList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<VersionHistoryDto>> getVersionDetailById(@PathVariable Long id) {
        List<VersionHistoryDto> versionList = versionService.getVersionHistoryById(id);
        return ResponseEntity.ok(versionList);
    }

    @PatchMapping("/note/{id}")
    public ResponseEntity<Void> updateVersion(@PathVariable Long id, @RequestBody VersionDto version) {
        versionService.updateVersion(id, version);
        return ResponseEntity.ok()
                .build();
    }

}
