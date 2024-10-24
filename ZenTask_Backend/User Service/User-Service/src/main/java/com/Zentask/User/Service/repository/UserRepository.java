package com.Zentask.User.Service.repository;

import com.Zentask.User.Service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    public User findByEmail(String email);
    boolean existsByEmail(String email);
}
