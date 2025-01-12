package com.debateproject.backend.repository;

import com.debateproject.backend.classes.Discussion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DiscussionRepository extends MongoRepository<Discussion, String> {
}
