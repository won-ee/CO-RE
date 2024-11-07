package com.core.backend.data.repository;

import com.core.backend.data.entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Groups, Long> {
    Optional<Groups> findByGroupKey(String groupKey);
    
}
