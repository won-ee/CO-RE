package com.core.email.controller;

import com.core.email.data.dto.EmailRequestDto;
import com.core.email.exception.EmailSendFailedException;
import com.core.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/email")
public class MailController {
    private final EmailService emailService;

    @PostMapping("/release")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequestDto emailRequest) {
        String subject = "";

        List<String> contents = emailRequest.contents();

        Map<String, String> failedEmail = new HashMap<>();
        for (String email : emailRequest.to()) {
            try {
                emailService.sendEmailNotice(email, emailRequest);
            } catch (EmailSendFailedException e) {
                failedEmail.put(email, e.getMessage());
            }
        }
        return failedEmail.isEmpty() ? ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(failedEmail);
    }

}
