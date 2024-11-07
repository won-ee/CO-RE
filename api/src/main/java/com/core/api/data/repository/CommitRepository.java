package com.core.api.data.repository;

import com.core.api.data.entity.Commit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommitRepository extends JpaRepository<Commit, Long> {
}
