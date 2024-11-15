package com.core.backend.data.repository;

import com.core.backend.data.entity.Projects;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Projects, Long> {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Projects p " +
            "WHERE p.jiraGroup.groupUrl = :groupUrl AND p.jiraId = :jiraId")
    boolean existsByGroupUrlAndJiraId(@Param("groupUrl") String groupUrl, @Param("jiraId") String jiraId);

    Optional<Projects> findByGithubOwnerAndGithubRepository(String githubOwner, String githubRepository);
}
