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

        String prompt = template + " 다음 커밋 메시지를 분석하여 템플릿 양식을 한글로 작성해 주세요. 마크 다운 형식으로 작성해주세요" + commitsSummary;

        ChatGptMessageDto system = new ChatGptMessageDto("system", prompt);
        ChatGptMessageDto user = new ChatGptMessageDto("user", commitsSummary);
        List<ChatGptMessageDto> messages = List.of(system, user);

        return new ChatGptDto("gpt-4o-mini", messages, 0.5);
    }

}
