package com.dxc.forum.repository;


import com.dxc.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	//findBy + fieldName
    Optional<User> findByUsername(String username);
}
