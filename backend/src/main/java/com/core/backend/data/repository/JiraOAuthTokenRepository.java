package com.core.backend.data.repository;

import com.core.backend.data.entity.JiraOAuthToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JiraOAuthTokenRepository extends CrudRepository<JiraOAuthToken, String> {

}
