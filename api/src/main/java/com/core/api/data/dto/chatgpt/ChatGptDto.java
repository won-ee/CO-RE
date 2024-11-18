package com.core.api.data.dto.chatgpt;

import com.core.api.data.dto.response.CompareBranchResponseDto;

import java.util.List;
import java.util.stream.Collectors;

public record ChatGptDto(
        String model,
        List<ChatGptMessageDto> messages,
        Double temperature
) {

    public static ChatGptDto from(String template, List<CompareBranchResponseDto> commits) {
        String commitsSummary = commits.stream()
                .map(CompareBranchResponseDto::message)
                .collect(Collectors.joining("\n"));

        String prompt = "다음 커밋 메시지를 분석하여 아래 템플릿 양식에 맞게 작성해 주세요. " +
                "아래 템플릿에 대한 수정 없이, 그대로 따라 작성하세요. " +
                "템플릿 외의 설명이나 안내 문구는 포함하지 마세요.\n\n" + template;

        ChatGptMessageDto system = new ChatGptMessageDto("system", prompt);
        ChatGptMessageDto user = new ChatGptMessageDto("user", commitsSummary);
        List<ChatGptMessageDto> messages = List.of(system, user);

        return new ChatGptDto("gpt-4o-mini", messages, 0.5);
    }

}
