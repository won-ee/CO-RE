package com.core.api.data.repository;

import com.core.api.data.entity.Reviewer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewerRepository extends JpaRepository<Reviewer, Long> {
}
