package com.core.backend.data.repository;

import com.core.backend.data.entity.Carrots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrotRepository extends JpaRepository<Carrots, Long> {
}
