package com.core.backend.data.repository;

import com.core.backend.data.entity.Issues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends JpaRepository<Issues, Long> {

    boolean existsByIssueNumber(String issueNumber);
}
