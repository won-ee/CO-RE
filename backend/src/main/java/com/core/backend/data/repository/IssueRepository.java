package com.core.backend.data.repository;

import com.core.backend.data.entity.Issues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issues, Long> {

    List<Issues> findByProjectUserId(Long projectUserId);

    boolean existsByIssueNumber(String issueNumber);
}
