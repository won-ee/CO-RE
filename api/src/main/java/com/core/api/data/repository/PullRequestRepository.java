package com.core.api.data.repository;

import com.core.api.data.dto.pullrequest.PullRequestDateFilterDto;
import com.core.api.data.entity.PullRequest;
import com.core.api.data.entity.Version;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PullRequestRepository extends JpaRepository<PullRequest, Long> {


    Optional<List<PullRequest>> findAllByVersion(Version version);


    Optional<List<PullRequest>> findAllByOwnerAndRepo(String owner, String repo);

    Optional<List<PullRequest>> findByOwnerAndRepoAndVersionIsNullAndMergeStatusIsTrue(String owner, String repo);


    Optional<List<PullRequest>> findByOwnerAndRepoAndBaseAndHeadAndVersionIsNull(String owner, String repo, String base, String head);

    Optional<PullRequest> findByOwnerAndRepoAndPullRequestId(String owner, String repo, Integer pullRequestId);

    @Query("SELECT pr FROM PullRequest pr " +
            "LEFT JOIN pr.reviewers r " +
            "WHERE (pr.writerId = :#{#param.writer()} OR r.reviewerId = :#{#param.writer()}) " +
            "AND pr.owner = :#{#param.owner()} " +
            "AND pr.repo = :#{#param.repo()} " +
            "AND pr.createdDate BETWEEN :#{#param.startDate()} AND :#{#param.endDate()}")
    Optional<List<PullRequest>> findAllByOwnerRepoByFilter(@Param("param") PullRequestDateFilterDto param);

    @Query("SELECT pr FROM PullRequest pr " +
            "LEFT JOIN pr.reviewers r " +
            "WHERE pr.owner = :owner " +
            "AND pr.repo = :repo " +
            "AND r.reviewerId = :reviewerId " +
            "AND (pr.mergeStatus = false OR pr.afterReview = true)")
    Optional<List<PullRequest>> findAllByOwnerAndRepoWhereReviewerIs(
            @Param("owner") String owner,
            @Param("repo") String repo,
            @Param("reviewerId") String reviewerId);

    @Query("SELECT pr FROM PullRequest pr " +
            "WHERE pr.owner = :owner " +
            "AND pr.repo = :repo " +
            "AND pr.writerId = :writerId " +
            "AND (pr.mergeStatus = false OR pr.afterReview = true)")
    Optional<List<PullRequest>> findAllByOwnerAndRepoWhereWriterIs(
            @Param("owner") String owner,
            @Param("repo") String repo,
            @Param("writerId") String writerId);

    @Query("SELECT pr FROM PullRequest pr " +
            "WHERE pr.owner = :owner " +
            "AND pr.repo = :repo " +
            "AND pr.createdDate BETWEEN :startDate AND :endDate")
    Optional<List<PullRequest>> findAllByOwnerRepoByDay(
            @Param("owner") String owner,
            @Param("repo") String repo,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);


}
