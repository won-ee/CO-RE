package com.core.backend.data.repository;

import com.core.backend.data.entity.Carrots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarrotRepository extends JpaRepository<Carrots, Long> {

    List<Carrots> findByProjectUserWriter_Project_Id(Long projectId);

    boolean existsByIssue_IdAndStateTrue(Long issueId);
}
