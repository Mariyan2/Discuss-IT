package com.debateproject.backend.repositories;

import com.debateproject.backend.classes.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
}
