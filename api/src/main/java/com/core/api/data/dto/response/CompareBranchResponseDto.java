package com.core.api.data.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public record CompareBranchResponseDto(
        String message,
        String writerName,
        String date
) {
    public static List<CompareBranchResponseDto> from(Map<String, Object> map) {

        ArrayList<?> commits = (ArrayList<?>) map.get("commits");

        return commits.stream()
                .map(commitObj -> {
                    Map<?, ?> commitEntry = (Map<?, ?>) commitObj;
                    Map<?, ?> commitDetails = (Map<?, ?>) commitEntry.get("commit");
                    Map<?, ?> author = (Map<?, ?>) commitDetails.get("author");

                    return new CompareBranchResponseDto(
                            (String) commitDetails.get("message"),
                            (String) author.get("name"),
                            (String) author.get("date")
                    );
                })
                .toList();
    }
}
