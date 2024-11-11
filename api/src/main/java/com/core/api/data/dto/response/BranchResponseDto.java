package com.core.api.data.dto.response;

import java.util.Map;

public record BranchResponseDto(
        String name
) {

    public static BranchResponseDto from(Map<String, Object> map) {
        return new BranchResponseDto(
                (String) map.get("name")
        );
    }

}
