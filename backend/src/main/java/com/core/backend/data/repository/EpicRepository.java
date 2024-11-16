package com.core.backend.data.repository;

import com.core.backend.data.entity.Epics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EpicRepository extends JpaRepository<Epics, Long> {

    Epics findByKey(String key);

    List<Epics> findByProjectId(Long projectId);
}
