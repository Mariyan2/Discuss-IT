package com.debateproject.backend.repository;

import com.debateproject.backend.classes.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
}
