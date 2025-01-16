package com.debateproject.backend.repository;

import com.debateproject.backend.classes.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByUserName(String userName);
}
