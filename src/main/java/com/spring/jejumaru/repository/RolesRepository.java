package com.spring.jejumaru.repository;

import com.spring.jejumaru.beans.RoleType;
import com.spring.jejumaru.beans.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepository extends JpaRepository<Roles, Integer> {
    Optional<Roles> findByRolename(RoleType rolename);
}
