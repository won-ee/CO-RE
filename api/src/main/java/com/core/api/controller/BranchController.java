package com.core.api.controller;


import com.core.api.data.dto.ChangeDto;
import com.core.api.data.dto.response.BranchResponseDto;
import com.core.api.data.dto.response.CompareBranchResponseDto;
import com.core.api.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/branch")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @GetMapping("/{owner}/{repo}")
    public ResponseEntity<List<BranchResponseDto>> getBranches(@PathVariable String owner, @PathVariable String repo) {
        List<BranchResponseDto> branchList = branchService.getBranches(owner, repo);
        return ResponseEntity.ok(branchList);
    }

    @GetMapping("/{owner}/{repo}/{baseHead}")
    public ResponseEntity<List<CompareBranchResponseDto>> compareBranchHead(@PathVariable String owner, @PathVariable String repo, @PathVariable String baseHead) {
        List<CompareBranchResponseDto> branchList = branchService.compareBranchHead(owner, repo, baseHead);
        return ResponseEntity.ok(branchList);
    }

    @GetMapping("/{owner}/{repo}/{baseHead}/files")
    public ResponseEntity<List<ChangeDto>> getChangeFiles(@PathVariable String owner, @PathVariable String repo, @PathVariable String baseHead) {
        List<ChangeDto> changeFiles = branchService.getChangeFiles(owner, repo, baseHead);
        return ResponseEntity.ok(changeFiles);
    }
}
