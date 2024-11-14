package com.core.api.data.dto;

import java.util.Map;

public record FileDto(
        String filename,
        String fileSha,
        String status,
        String contentsUrl,
        int additions,
        int deletions,
        int changes,
        String patch
) {
    public static FileDto of(Map<?, ?> file) {
        return new FileDto(
                (String) file.get("filename"),
                (String) file.get("sha"),
                (String) file.get("status"),
                (String) file.get("contents_url"),
                (int) file.get("additions"),
                (int) file.get("deletions"),
                (int) file.get("changes"),
                (String) file.get("patch")
        );
    }

}
