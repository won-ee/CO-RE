package com.core.api.data.repository;

import com.core.api.data.entity.Version;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VersionRepository extends JpaRepository<Version, Long> {

    Optional<List<Version>> findAllByOwnerAndRepo(String owner, String repo);
}
