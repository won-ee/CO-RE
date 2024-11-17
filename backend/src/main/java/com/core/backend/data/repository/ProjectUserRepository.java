package com.core.backend.data.repository;

import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectUserRepository extends JpaRepository<ProjectUsers, Long> {

    boolean existsByUserAndProjectJiraId(Users user, String projectJiraId);

    ProjectUsers findByUserAndProjectJiraId(Users user, String projectJiraId);

    @Query("SELECT pu.project FROM ProjectUsers pu WHERE pu.user.id = :userId")
    List<Projects> findProjectsByUserId(@Param("userId") Long userId);

    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    ProjectUsers findByUserIdAndProjectId(Long userId, Long projectId);

    List<ProjectUsers> findAllByProjectId(Long projectId);
}
