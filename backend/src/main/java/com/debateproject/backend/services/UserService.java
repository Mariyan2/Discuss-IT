package com.debateproject.backend.services;

import com.debateproject.backend.classes.User;
import com.debateproject.backend.repository.UserRepository;
import com.debateproject.backend.repository.DiscussionRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final DiscussionRepository discussionRepository;

    public UserService(UserRepository userRepository, DiscussionRepository discussionRepository) {
        this.userRepository = userRepository;
        this.discussionRepository = discussionRepository;
    }

    // Register a new user
    public ResponseEntity<?> registerUser(User user) {
        if (userRepository.existsByUserName(user.getUserName())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Login user
    public ResponseEntity<?> loginUser(Map<String, String> credentials, HttpServletRequest request) {
        String userName = credentials.get("userName");
        String userPassword = credentials.get("userPassword");

        Optional<User> user = userRepository.findByUserName(userName);

        if (user.isPresent() && user.get().getUserPassword().equals(userPassword)) {
            request.getSession().setAttribute("username", userName);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("userName", userName);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // Get user profile
    public ResponseEntity<?> getUserProfile(String username) {
        Optional<User> user = userRepository.findByUserName(username);
        if (user.isPresent()) {
            System.out.println("User found: " + user.get());
            return ResponseEntity.ok(user.get());
        } else {
            System.out.println("User not found for username: " + username);
            return ResponseEntity.notFound().build();
        }
    }
}
