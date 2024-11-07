package com.core.api.data.repository;

import com.core.api.data.dto.pullrequest.PullRequestDateFilterDto;
import com.core.api.data.entity.PullRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PullRequestRepository extends JpaRepository<PullRequest, Long> {


    @Query("SELECT p FROM PullRequest p WHERE p.owner = :owner AND p.repo = :repo AND (p.mergeStatus = false OR p.afterReview = true)")
    Optional<List<PullRequest>> findOpenPullRequestsByOwnerAndRepo(String owner, String repo);

    @Query("SELECT p FROM PullRequest p WHERE p.owner = :owner AND p.repo = :repo AND (p.mergeStatus = true OR p.afterReview = true)")
    Optional<List<PullRequest>> findClosedPullRequestsByOwnerAndRepo(String owner, String repo);

    Optional<List<PullRequest>> findAllByOwnerAndRepo(String owner, String repo);

    Optional<PullRequest> findByOwnerAndRepoAndBaseAndHead(String owner, String repo, String base, String head);

    Optional<PullRequest> findByOwnerAndRepoAndPullRequestId(String owner, String repo, Integer pullRequestId);

    @Query("SELECT pr FROM PullRequest pr " +
            "LEFT JOIN pr.reviewers r " +
            "WHERE (pr.writerId = :#{#param.writer()} OR r.reviewerId = :#{#param.writer()}) " +
            "AND pr.owner = :#{#param.owner()} " +
            "AND pr.repo = :#{#param.repo()} " +
            "AND pr.createdDate BETWEEN :#{#param.startDate()} AND :#{#param.endDate()}")
    Optional<List<PullRequest>> findAllByOwnerRepoByFilter(@Param("param") PullRequestDateFilterDto param);

}
