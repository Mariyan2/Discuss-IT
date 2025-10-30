package com.debateproject.backend.services;

import com.debateproject.backend.classes.Discussion;
import com.debateproject.backend.repository.DiscussionRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    // Constructor injection for repository
    public DiscussionService(DiscussionRepository discussionRepository) {
        this.discussionRepository = discussionRepository;
    }
    //all discussions retrieved
    public List<Discussion> getDiscussions() {
        return discussionRepository.findAll();
    }
    //Gets specific discussion by it's ID
    public ResponseEntity<Discussion> getDiscussionById(String discussionId) {
        Optional<Discussion> discussion = discussionRepository.findById(discussionId);
        return discussion.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    //Adds a chat message to a discussion
    public ResponseEntity<?> addChatMessage(String discussionId, Map<String, String> payload, HttpServletRequest request) {
        String loggedInUser = (String) request.getSession().getAttribute("username");
    //checks if user is logged in
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User is not logged in"));
        }
        //gets message and finds the discussion
        String message = payload.get("message");
        Optional<Discussion> discussionOpt = discussionRepository.findById(discussionId);

        if (discussionOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Discussion not found"));
        }
        //Appends the chat message to the discussion
        Discussion discussion = discussionOpt.get();
        Map<String, String> chatMessage = new HashMap<>();
        chatMessage.put("username", loggedInUser);
        chatMessage.put("message", message);

        discussion.getChat().add(chatMessage);
        discussionRepository.save(discussion);

        return ResponseEntity.ok(Map.of("status", "success", "message", "Chat message added"));
    }
    //creates new discussion
    public ResponseEntity<Discussion> createDiscussion(Map<String, String> payload, HttpServletRequest request) {
        String loggedInUser = (String) request.getSession().getAttribute("username");

        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        //builds discussion entity
        Discussion discussion = new Discussion(
                payload.get("topic"),
                payload.get("category"),
                loggedInUser
        );

        Discussion saved = discussionRepository.save(discussion);
        return ResponseEntity.ok(saved);
    }
    //updates discussion fields,selected by its ID
    public ResponseEntity<Discussion> updateDiscussion(String discussionId, Discussion updatedDiscussion) {
        Optional<Discussion> existingDiscussion = discussionRepository.findById(discussionId);
        if (existingDiscussion.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Discussion discussion = existingDiscussion.get();
        discussion.setTopic(updatedDiscussion.getTopic());
        discussion.setCategory(updatedDiscussion.getCategory());
        discussion.setLeftAgreeRatio(updatedDiscussion.getLeftAgreeRatio());
        discussion.setRightAgreeRatio(updatedDiscussion.getRightAgreeRatio());
        discussion.setChat(updatedDiscussion.getChat());

        discussionRepository.save(discussion);
        return ResponseEntity.ok(discussion);
    }
 //deletes discussion
    public ResponseEntity<?> deleteDiscussion(String discussionId) {
        if (!discussionRepository.existsById(discussionId)) {
            return ResponseEntity.notFound().build();
        }
        discussionRepository.deleteById(discussionId);
        return ResponseEntity.ok().build();
    }
//Join a discussion as an opponent to the initial speaker
    public ResponseEntity<?> joinDiscussion(String discussionId, Map<String, String> payload) {
        Optional<Discussion> discussionOpt = discussionRepository.findById(discussionId);

        if (discussionOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Discussion not found");
        }

        Discussion discussion = discussionOpt.get();

        if (discussion.getOpponent() != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This discussion already has an opponent.");
        }

        discussion.setOpponent(payload.get("opponent"));
        discussionRepository.save(discussion);

        return ResponseEntity.ok(discussion);
    }
    //likes a discussion and calculates the agree ratios
    public ResponseEntity<?> likeDiscussion(String discussionId, Map<String, String> payload, HttpServletRequest request) {
        String loggedInUser = (String) request.getSession().getAttribute("username");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
        }

        String target = payload.get("target");
        Optional<Discussion> discussionOpt = discussionRepository.findById(discussionId);

        if (discussionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Discussion discussion = discussionOpt.get();

        if ("creator".equals(target)) {
            if (!discussion.getCreatorLikes().contains(loggedInUser)) {
                discussion.getCreatorLikes().add(loggedInUser);
                discussion.getOpponentLikes().remove(loggedInUser);
            }
        } else if ("opponent".equals(target)) {
            if (!discussion.getOpponentLikes().contains(loggedInUser)) {
                discussion.getOpponentLikes().add(loggedInUser);
                discussion.getCreatorLikes().remove(loggedInUser);
            }
        }

        int totalLikes = discussion.getCreatorLikes().size() + discussion.getOpponentLikes().size();
        if (totalLikes > 0) {
            int creatorPercentage = (int) ((double) discussion.getCreatorLikes().size() / totalLikes * 100);
            int opponentPercentage = 100 - creatorPercentage;
            discussion.setLeftAgreeRatio(creatorPercentage);
            discussion.setRightAgreeRatio(opponentPercentage);
        } else {
            discussion.setLeftAgreeRatio(50);
            discussion.setRightAgreeRatio(50);
        }

        Discussion updated = discussionRepository.save(discussion);
        return ResponseEntity.ok(updated);
    }
}
