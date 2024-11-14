package com.core.api.controller;

import com.core.api.data.dto.StatsDto;
import com.core.api.data.dto.StatsVersionDto;
import com.core.api.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping("/{id}")
    public ResponseEntity<StatsVersionDto> getVersionStats(@PathVariable("id") Long id) {
        StatsVersionDto stats = statsService.getVersionStats(id);
        return ResponseEntity.ok(stats);
    }


}
