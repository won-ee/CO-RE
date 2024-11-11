package com.core.backend.data.repository;

import com.core.backend.data.entity.JiraGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<JiraGroups, Long> {
    Optional<JiraGroups> findByGroupKey(String groupKey);

    JiraGroups findByGroupUrl(String groupUrl);

}
