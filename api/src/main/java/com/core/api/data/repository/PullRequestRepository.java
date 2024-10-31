package com.core.api.data.repository;

import com.core.api.data.entity.PullRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PullRequestRepository extends JpaRepository<PullRequest, Long> {


    Optional<List<PullRequest>> findAllByOwnerAndRepo(String owner, String repo);
}
