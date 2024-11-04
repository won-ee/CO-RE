package com.core.api.data.dto.review;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class ReviewDto {
    private Long id;
    private Integer prId;
    private Boolean isIssue;
    private Integer parentId;
    private Integer startLine;
    private Integer endLine;
    private String content;
    private String commitId;
    private String writer;
    private String ownerName;
    private String repoName;

    public static ReviewDto from(Map<?, ?> map) {
        Map<?, ?> comment = getComment(map);
        Integer parentId = getParentId(map, comment);

        Map<?, ?> repo = (Map<?, ?>) map.get("repository");
        String ownerName = getOwnerName(repo);
        String repoName = getRepoName(repo);

        Map<?, ?> pullRequest = getPullRequest(map);
        Integer prId = getPrId(pullRequest);
        Long id = getId(comment);
        String commitId = getCommitId(comment);
        String writer = getWriter(comment);
        String content = getContent(comment);
        Integer startLine = getStartLine(comment);
        Integer endLine = getEndLine(comment);

        Boolean isIssue = isIssue(map);
        return ReviewDto.builder()
                .id(id)
                .prId(prId)
                .isIssue(isIssue)
                .parentId(parentId)
                .startLine(startLine)
                .endLine(endLine)
                .content(content)
                .commitId(commitId)
                .writer(writer)
                .ownerName(ownerName)
                .repoName(repoName)
                .build();
    }

    // Private helper methods to handle data extraction

    private static boolean isComment(Map<?, ?> map) {
        return map.get("comment") != null;
    }

    private static boolean isIssue(Map<?, ?> map) {
        return map.get("issue") != null;
    }

    private static Map<?, ?> getComment(Map<?, ?> map) {
        return isComment(map) ? (Map<?, ?>) map.get("comment") : (Map<?, ?>) map.get("review");
    }

    private static Integer getParentId(Map<?, ?> map, Map<?, ?> comment) {
        return isComment(map) ? (Integer) comment.get("pull_request_review_id") : null;
    }

    private static String getOwnerName(Map<?, ?> repo) {
        Map<?, ?> owner = (Map<?, ?>) repo.get("owner");
        return (String) owner.get("login");
    }

    private static String getRepoName(Map<?, ?> repo) {
        return (String) repo.get("name");
    }

    private static Map<?, ?> getPullRequest(Map<?, ?> map) {
        return isIssue(map) ? (Map<?, ?>) map.get("issue") : (Map<?, ?>) map.get("pull_request");
    }

    private static Integer getPrId(Map<?, ?> pullRequest) {
        return (Integer) pullRequest.get("number");
    }

    private static Long getId(Map<?, ?> comment) {
        return comment != null && comment.get("id") instanceof Number
                ? ((Number) comment.get("id")).longValue()
                : null;
    }

    private static String getCommitId(Map<?, ?> comment) {
        return (String) comment.get("commit_id");
    }

    private static String getWriter(Map<?, ?> comment) {
        Map<?, ?> user = (Map<?, ?>) comment.get("user");
        return (String) user.get("login");
    }

    private static String getContent(Map<?, ?> comment) {
        return (String) comment.get("body");
    }

    private static Integer getStartLine(Map<?, ?> comment) {
        return (Integer) comment.get("start_line");
    }

    private static Integer getEndLine(Map<?, ?> comment) {
        return (Integer) comment.get("line");
    }

}
