package com.debateproject.backend.controllers;
import com.debateproject.backend.classes.Discussion;
import com.debateproject.backend.repository.DiscussionRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepository;

    @GetMapping
    public List<Discussion> getDiscussions() {
        return discussionRepository.findAll();
    }
}

