package com.debateproject.backend.services;

import com.debateproject.backend.classes.Topic;
import com.debateproject.backend.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    // Get all topics
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // Get a specific topic by ID
    public Topic getTopicById(String id) {
        Optional<Topic> topic = topicRepository.findById(id);
        return topic.orElse(null);
    }

    // Create a new topic
    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    // Update an existing topic
    public Topic updateTopic(String id, Topic updatedTopic) {
        Optional<Topic> existingTopic = topicRepository.findById(id);

        if (existingTopic.isPresent()) {
            Topic topic = existingTopic.get();
            topic.setTitle(updatedTopic.getTitle());
            topic.setCategory(updatedTopic.getCategory());
            topic.setViewers(updatedTopic.getViewers());
            return topicRepository.save(topic);
        }

        return null;
    }

    // Delete a topic by ID
    public void deleteTopic(String id) {
        topicRepository.deleteById(id);
    }
}
