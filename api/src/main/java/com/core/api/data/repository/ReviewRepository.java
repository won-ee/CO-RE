package com.core.api.data.repository;

import com.core.api.data.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {


}
