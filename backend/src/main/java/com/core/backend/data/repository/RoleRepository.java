package com.core.backend.data.repository;

import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Roles, Long> {

    Optional<Roles> findByNameAndJiraIdAndProject(String name, String jiraId, Projects project);
}
