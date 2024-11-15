package com.core.email.service;

import com.core.email.exception.EmailSendFailedException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmailNotice(String email, String subject, String title, List<String> contents) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
            mimeMessageHelper.setTo(email);

            // 메일 제목 & 본문
            mimeMessageHelper.setSubject("[CO:RE] " + subject);
            mimeMessageHelper.setText(setContext(title,
                    contents), true);

            mailSender.send(mimeMessage);

            log.info("Successfully sent email to {}", email);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}", email, e);
            throw new EmailSendFailedException(e.getMessage());
        }
    }

    public String setContext(String title, List<String> contents) {
        Context context = new Context();
        context.setVariable("title", title);
        context.setVariable("contents", contents);
        return templateEngine.process("release-info", context);
    }
}
