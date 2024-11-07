package com.core.backend.data.repository;

import com.core.backend.data.entity.Groups;
import com.core.backend.data.entity.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Projects, Long> {

    boolean existsByGroupAndJiraId(Groups group, String jiraId);

}
