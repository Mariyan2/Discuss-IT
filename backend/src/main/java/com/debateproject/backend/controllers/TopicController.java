package com.debateproject.backend.controllers;

import com.debateproject.backend.classes.Topic;
import com.debateproject.backend.services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    @GetMapping("/{id}")
    public Topic getTopicById(@PathVariable String id) {
        return topicService.getTopicById(id);
    }

    @PostMapping
    public Topic createTopic(@RequestBody Topic topic) {
        return topicService.createTopic(topic);
    }

    @PutMapping("/{id}")
    public Topic updateTopic(@PathVariable String id, @RequestBody Topic topic) {
        return topicService.updateTopic(id, topic);
    }

    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable String id) {
        topicService.deleteTopic(id);
    }
}
