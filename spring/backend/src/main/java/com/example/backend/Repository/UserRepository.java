package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.Entity.User;

@Component
@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
