package com.core.api.data.dto.commit;


public record CommitMessageDto(
        String commitTitle,
        String commitMessage,
        String mergeMethod
) {
}
