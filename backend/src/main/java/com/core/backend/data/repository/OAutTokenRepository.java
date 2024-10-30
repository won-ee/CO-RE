package com.core.backend.data.repository;

import com.core.backend.data.entity.OAuthToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OAutTokenRepository extends CrudRepository<OAuthToken, String> {
}
