package com.debateproject.backend.controllers;

import com.debateproject.backend.classes.User;
import com.debateproject.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByUserName(user.getUserName())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
    // Login a user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials, HttpServletRequest request) {
        String userName = credentials.get("userName");
        String userPassword = credentials.get("userPassword");

        Optional<User> user = userRepository.findByUserName(userName);

        if (user.isPresent() && user.get().getUserPassword().equals(userPassword)) {
            request.getSession().setAttribute("username", userName); // ✅ Store user in session
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("userName", userName);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    //gets the username so that we can direct to a specific profile page
    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable String username) {
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
