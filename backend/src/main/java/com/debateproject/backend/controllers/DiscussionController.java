package com.debateproject.backend.controllers;

import com.debateproject.backend.classes.Discussion;
import com.debateproject.backend.repository.DiscussionRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepository;

    // Get all discussions
    @GetMapping
    public List<Discussion> getDiscussions() {
        return discussionRepository.findAll();
    }

    // Get a specific discussion by ID
    @GetMapping("/{discussionId}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable String discussionId) {
        System.out.println("Fetching discussion with ID: " + discussionId);
        Optional<Discussion> discussion = discussionRepository.findById(discussionId);
        if (discussion.isPresent()) {
            return ResponseEntity.ok(discussion.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add a chat message to a specific discussion
    @PostMapping("/{discussionId}/chat")
    public ResponseEntity<?> addChatMessage(@PathVariable String discussionId, @RequestBody Map<String, String> payload, HttpServletRequest request) {
        // Retrieve the actual logged-in username from the session (or security context)
        String loggedInUser = (String) request.getSession().getAttribute("username");

        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
        }

        String message = payload.get("message");
        Optional<Discussion> discussion = discussionRepository.findById(discussionId);

        if (discussion.isPresent()) {
            Discussion existingDiscussion = discussion.get();
            Map<String, String> chatMessage = new HashMap<>();
            chatMessage.put("username", loggedInUser); // Use the session username
            chatMessage.put("message", message);
            existingDiscussion.getChat().add(chatMessage);
            discussionRepository.save(existingDiscussion);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    // Create a new discussion
    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(@RequestBody Discussion discussion) {
        Discussion savedDiscussion = discussionRepository.save(discussion);
        return ResponseEntity.ok(savedDiscussion);
    }

    // Update a specific discussion
    @PutMapping("/{discussionId}")
    public ResponseEntity<Discussion> updateDiscussion(@PathVariable String discussionId, @RequestBody Discussion updatedDiscussion) {
        Optional<Discussion> existingDiscussion = discussionRepository.findById(discussionId);
        if (existingDiscussion.isPresent()) {
            Discussion discussion = existingDiscussion.get();
            discussion.setTopic(updatedDiscussion.getTopic());
            discussion.setCategory(updatedDiscussion.getCategory());
            discussion.setLeftAgreeRatio(updatedDiscussion.getLeftAgreeRatio());
            discussion.setRightAgreeRatio(updatedDiscussion.getRightAgreeRatio());
            discussion.setChat(updatedDiscussion.getChat());
            discussionRepository.save(discussion);
            return ResponseEntity.ok(discussion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a specific discussion
    @DeleteMapping("/{discussionId}")
    public ResponseEntity<?> deleteDiscussion(@PathVariable String discussionId) {
        if (discussionRepository.existsById(discussionId)) {
            discussionRepository.deleteById(discussionId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
