package com.core.backend.controller;

import com.core.backend.service.AccountReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountReportController {

    private final AccountReportService accountReportService;

    @PostMapping("/report")
    public ResponseEntity<String> reportAccounts(@RequestBody List<String> accountIds) {
        accountReportService.reportAccountsToAtlassian();
        return ResponseEntity.ok("Report sent successfully");
    }

}
