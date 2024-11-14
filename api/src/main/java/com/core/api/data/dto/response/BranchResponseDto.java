package com.core.api.data.dto.response;

import com.core.api.data.dto.github.CommitServerDto;

public record BranchResponseDto(
        String name,
        CommitServerDto lastCommit
) {

    public static BranchResponseDto from(String name, CommitServerDto commit) {
        return new BranchResponseDto(
                name,
                commit
        );
    }

}
