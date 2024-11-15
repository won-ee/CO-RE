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
        String subject = "🚀 새로운 버전이 배포되었어요.";
        String title = "📢 코리가 새로운 배포 내용을 알려드려요";

        List<String> contents = emailRequest.contents();
        addPrefix("💙 ", contents);

//        contents.add("");
//        contents.add("<p style=\"font-weight: 440; font-size: 24px\">버전 배포 결과를 알려드려요.</p>");
//        contents.add("");

        Map<String, String> failedEmail = new HashMap<>();
        for (String email : emailRequest.to()) {
            try {
                emailService.sendEmailNotice(email, subject, title, contents);
            } catch (EmailSendFailedException e) {
                failedEmail.put(email, e.getMessage());
            }
        }
        return failedEmail.isEmpty() ? ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(failedEmail);
    }

    private void addPrefix(String prefix, List<String> texts) {
        int size = texts.size();
        for (int i = 0; i < size; i++) {
            texts.set(i, prefix + texts.get(i));
        }
    }

}
