package com.core.backend.data.repository;

import com.core.backend.data.entity.Roles;
import com.core.backend.data.entity.UserRoles;
import com.core.backend.data.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRoles, Long> {

    boolean existsByRoleAndUser(Roles role, Users user);

}
