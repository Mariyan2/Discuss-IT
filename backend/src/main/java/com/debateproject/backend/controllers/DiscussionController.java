package com.debateproject.backend.controllers;

import com.debateproject.backend.classes.Discussion;
import com.debateproject.backend.services.DiscussionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping
    public List<Discussion> getDiscussions() {
        return discussionService.getDiscussions();
    }

    @GetMapping("/{discussionId}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable String discussionId) {
        return discussionService.getDiscussionById(discussionId);
    }

    @PostMapping("/{discussionId}/chat")
    public ResponseEntity<?> addChatMessage(@PathVariable String discussionId, @RequestBody Map<String, String> payload, HttpServletRequest request) {
        return discussionService.addChatMessage(discussionId, payload, request);
    }

    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(@RequestBody Map<String, String> payload, HttpServletRequest request) {
        return discussionService.createDiscussion(payload, request);
    }

    @PutMapping("/{discussionId}")
    public ResponseEntity<Discussion> updateDiscussion(@PathVariable String discussionId, @RequestBody Discussion updatedDiscussion) {
        return discussionService.updateDiscussion(discussionId, updatedDiscussion);
    }

    @DeleteMapping("/{discussionId}")
    public ResponseEntity<?> deleteDiscussion(@PathVariable String discussionId) {
        return discussionService.deleteDiscussion(discussionId);
    }

    @PutMapping("/{discussionId}/join")
    public ResponseEntity<?> joinDiscussion(@PathVariable String discussionId, @RequestBody Map<String, String> payload) {
        return discussionService.joinDiscussion(discussionId, payload);
    }

    @PutMapping("/{discussionId}/like")
    public ResponseEntity<?> likeDiscussion(@PathVariable String discussionId, @RequestBody Map<String, String> payload, HttpServletRequest request) {
        return discussionService.likeDiscussion(discussionId, payload, request);
    }
}
