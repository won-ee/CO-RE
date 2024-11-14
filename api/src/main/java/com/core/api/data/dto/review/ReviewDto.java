package com.core.api.data.dto.review;

import com.core.api.data.entity.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class ReviewDto {
    private Long id;
    private Integer prId;
    private String path;
    private Long parentId;
    private Integer line;
    private String content;
    private String writerId;

    @JsonIgnore
    private String owner;

    @JsonIgnore
    private String repo;

    public static ReviewDto from(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .prId(review.getPrId())
                .path(review.getPath())
                .parentId(review.getParentId())
                .line(review.getLine())
                .content(review.getContent())
                .writerId(review.getReviewer()
                        .getReviewerId())
                .build();
    }

    public static ReviewDto fromApiResponse(Map<?, ?> map) {
        Map<?, ?> review = getReview(map);
        Map<?, ?> repo = (Map<?, ?>) map.get("repository");
        Map<?, ?> owner = (Map<?, ?>) repo.get("owner");
        Map<?, ?> writer = (Map<?, ?>) review.get("user");
        Map<?, ?> pullRequest = (Map<?, ?>) map.get("pull_request");
        Long parentId = getParentId(map, review);

        return ReviewDto.builder()
                .id(((Number) review.get("id")).longValue())
                .prId(((Number) pullRequest.get("number")).intValue())
                .path((String) review.get("path"))
                .parentId(parentId)
                .line((Integer) review.get("line"))
                .content((String) review.get("body"))
                .writerId((String) writer.get("login"))
                .owner((String) owner.get("login"))
                .repo((String) repo.get("name"))
                .build();
    }

    private static boolean isChild(Map<?, ?> map) {
        return map.get("comment") != null;
    }

    private static Map<?, ?> getReview(Map<?, ?> map) {
        return isChild(map) ? (Map<?, ?>) map.get("comment") : (Map<?, ?>) map.get("review");
    }

    private static Long getParentId(Map<?, ?> map, Map<?, ?> comment) {
        return isChild(map) ? (Long) comment.get("pull_request_review_id") : null;
    }


}
