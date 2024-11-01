package com.core.api.data.dto.github;

import com.core.api.data.dto.commit.CommitMessageDto;

public record CommitMessageServerDto(
        String commit_title,
        String commit_message,
        String merge_method
) {
    public static CommitMessageServerDto of(CommitMessageDto commitMessageDto) {
        return new CommitMessageServerDto(
                commitMessageDto.commitTitle(),
                commitMessageDto.commitMessage(),
                commitMessageDto.mergeMethod()
        );
    }
}
