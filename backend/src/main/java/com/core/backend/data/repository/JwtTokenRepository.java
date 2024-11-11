package com.core.backend.data.repository;

import com.core.backend.data.entity.JwtToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRepository extends CrudRepository<JwtToken, String> {

}
